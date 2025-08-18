import { createYoga, createSchema } from 'graphql-yoga';
import { typeDefs } from '../../lib/graphql/schema';
import { resolvers } from '../../lib/graphql/resolvers';
import { NextApiRequest, NextApiResponse } from 'next';

const schema = createSchema({
  typeDefs,
  resolvers,
});

const yoga = createYoga({
  schema,
  graphiql: process.env.NODE_ENV === 'development',
  cors: {
    origin: '*',
    credentials: true,
  },
});

export default yoga;

export const config = {
  api: {
    bodyParser: false,
  },
};