import { queryType, idArg } from '@nexus/schema';
import UserModel from '../../models/User';
import { User } from './User';
import asyncHandler from '../../middlewares/asyncHandler'
import { isProtected } from '../../src/isAuthenticated';
import ErrorResponse from '../../src/errorResponse'
import { Story } from './Story';
import StoryModel from '../../models/Story';

export const Query = queryType({

    definition(t) {
        t.typeName = 'Query'

        t.list.field('stories', {
            type: Story,
            description: 'Get All Stories',
            resolve: asyncHandler(
                async () => {
                    const stories = await StoryModel.find();
                    return stories;
                }
            )
        });

        t.field('story', {
            type: Story,
            description: 'Get Single Story',
            args: {
                id: idArg()
            },
            nullable: true,
            resolve: asyncHandler(
                async (_, { id }) => {
                    const story = await StoryModel.findById(id);
                    if (!story) {
                        throw new ErrorResponse('Resource not found', 400);
                    }
                    return story;
                }
            )
        });

        t.field('getMe', {
            type: User,
            description: 'Get Logged In User',
            resolve: async (parent, args, ctx) => {
                const isAuthenticated = await isProtected(ctx);
                if (!isAuthenticated) {
                    throw new ErrorResponse('Not Auth!', 401);
                }
                return ctx.req.user;
            }
        });

        t.list.field('users', {
            type: User,
            description: 'GET All Users',
            resolve: asyncHandler(
                async (parent, args, ctx) => {

                    const isAuthenticated = await isProtected(ctx);

                    if (!isAuthenticated) {
                        throw new ErrorResponse('Not Auth', 401);
                    }

                    const users = await UserModel.find();
                    return users;
                }
            )
        })
    }
})