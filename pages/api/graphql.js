import { ApolloServer } from 'apollo-server-micro';
import { schema } from '../../src/schema';
import nextConnect from 'next-connect';
import errorHandler from '../../middlewares/errorHandler'
import { protect } from '../../middlewares/auth'
import asyncHandler from '../../middlewares/asyncHandler';

const apolloServer = new ApolloServer({
  schema,
})

const handler = apolloServer.createHandler({
  path: '/api/graphql'
})

const nextConnectHandler =
  nextConnect({ onError: errorHandler })
    .use(protect)
    .use('/api/graphql', handler);

export const config = {
  api: {
    bodyParser: false
  }
}

export default nextConnectHandler;