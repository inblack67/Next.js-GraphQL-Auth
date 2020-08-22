import { mutationType, stringArg, idArg } from '@nexus/schema';
import UserModel from '../../models/User';
import StoryModel from '../../models/Story';
import { User } from './User';
import { Story } from './Story';
import { serialize } from 'cookie';
import asyncHandler from '../../middlewares/asyncHandler'
import ErrorResponse from '../errorResponse';
import { isProtected } from '../../src/isAuthenticated'

export const Mutation = mutationType({
    definition(t) {
        t.typeName = 'Mutations';

        t.field('addStory', {
            type: Story,
            description: 'Add Story',
            args: { title: stringArg(), description: stringArg() },
            resolve: asyncHandler(
                async (_, { title, description }, ctx) => {
                    const isAuthenticated = await isProtected(ctx);
                    if (!isAuthenticated) {
                        throw new ErrorResponse('Not Auth!!', 401);
                    }
                    const newStory = await StoryModel.create({ title, description, user: ctx.req.user._id });
                    return newStory;
                }
            )
        });

        t.field('updateStory', {
            type: Story,
            description: 'Update Story',
            nullable: true,
            args: { id: idArg(), title: stringArg({ nullable: true }), description: stringArg({ nullable: true }) },
            resolve: async (parent, args, ctx) => {

                const isAuthenticated = await isProtected(ctx);
                if (!isAuthenticated) {
                    throw new ErrorResponse('Not Auth!!', 401);
                }

                const story = await StoryModel.findById(args.id);

                if (story.user.toString() !== ctx.req.user._id.toString()) {
                    throw new ErrorResponse('Not Auth!!', 401);
                }

                let body = {};

                if (args.title) {
                    body.title = args.title;
                }

                if (args.description) {
                    body.description = args.description;
                }
                const updatedStory = await StoryModel.findByIdAndUpdate(args.id, body, { new: true });
                return updatedStory;
            }
        });


        t.field('deleteStory', {
            type: Story,
            description: 'Delete Story',
            nullable: true,
            args: { id: idArg() },
            resolve: async (parent, { id }, ctx) => {

                const isAuthenticated = await isProtected(ctx);
                if (!isAuthenticated) {
                    throw new ErrorResponse('Not Auth!!', 401);
                }

                const story = await StoryModel.findById(id);

                if (story.user.toString() !== ctx.req.user._id.toString()) {
                    throw new ErrorResponse('Not Auth!!', 401);
                }

                return await StoryModel.findByIdAndDelete(id)
            }
        });

        t.field('login', {
            type: User,
            description: 'Login',
            args: {
                email: stringArg(),
                password: stringArg(),
            },
            resolve: async (parent, { email, password }, ctx) => {

                const user = await UserModel.findOne({ email }).select('+password');

                if (!user) {
                    throw new ErrorResponse('Invalid Credentials', 403);
                }

                const isMatch = await user.matchPassword(password);

                if (!isMatch) {
                    throw new ErrorResponse('Invalid Credentials', 403);
                }

                const token = user.getSignedJwtToken();

                ctx.res.setHeader('Set-Cookie', serialize('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    sameSite: 'strict',
                    maxAge: 3600,   // 1 hr
                    path: '/'   // root of out domain, not /api
                }))

                return { name: user.name, email: user.email, createdAt: user.createdAt, _id: user._id };
            }
        });

        t.field('logout', {
            type: User,
            description: 'Logout',
            nullable: true,
            resolve: asyncHandler(
                async (parent, args, ctx) => {

                    const isAuthenticated = await isProtected(ctx);

                    if(!isAuthenticated){
                        throw new ErrorResponse('Not Authorized', 400);
                    }

                    ctx.res.setHeader('Set-Cookie', serialize('token', 'none', {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== 'development',
                        sameSite: 'strict',
                        maxAge: 0,
                        path: '/',
                    }))

                    return null;
                }
            )
        })

        t.field('register', {
            type: User,
            description: 'Register',
            args: {
                name: stringArg(),
                email: stringArg(),
                password: stringArg(),
            },
            resolve: asyncHandler(
                async (parent, { name, email, password }, ctx) => {
                    const user = await UserModel.create({ name, email, password });
                    const token = user.getSignedJwtToken();
                    ctx.res.setHeader('Set-Cookie', serialize('token', token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== 'development',
                        sameSite: 'strict',
                        maxAge: 3600,
                        path: '/'
                    }));

                    return { name: user.name, email: user.email, createdAt: user.createdAt, _id: user._id };
                }
            )
        })
    }
})