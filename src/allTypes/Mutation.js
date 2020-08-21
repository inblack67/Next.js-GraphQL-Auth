import { mutationType, stringArg } from '@nexus/schema';
import UserModel from '../../models/User';
import { User } from './User';
import { isProtected } from '../isAuthenticated';
import { serialize } from 'cookie';
import ErrorResponse from '../errorResponse';

export const Mutation = mutationType({
    definition(t) {
        t.typeName = 'UserMutation';
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

                return { name: user.name, email: user.email, createdAt: user.createdAt };
            }
        })
    }
})