import depthLimit from 'graphql-depth-limit';

import { ApolloServer } from '@apollo/server';
import { typeDefs, resolvers } from '../api/index.js';
import { env } from '#config/index.js';

const { NODE_ENV } = env;

const formatError = (error) => {
  console.error('GraphQL Error:', {
    message: error.message,
    path: error.path
  });

  return {
    message: error.message || 'An unexpected error occurred.',
    path: error.path || []
  };
};

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  formatError,
  cache: 'bounded',
  nodeEnv: NODE_ENV,
  introspection: true,
  allowBatchedHttpRequests: true,
  validationRules: [depthLimit(5)] // prevent very deep queries
});
