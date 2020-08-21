import { queryType } from '@nexus/schema';
import UserModel from '../../models/User';
import { User } from './User';
import asyncHandler from '../../middlewares/asyncHandler'

export const Query = queryType({
    definition(t) {
        t.typeName = 'Query'
        t.list.field('users', {
            type: User,
            description: 'GET All Users',
            resolve: asyncHandler(
                async (parent, args, ctx) => {
                    const users = await UserModel.find();
                    return users;
                }
            )
        })
    }
})