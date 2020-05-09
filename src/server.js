import jwt from 'jsonwebtoken';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './graphql/Types';
import resolvers from './graphql/resolvers';


const db = require('./db');
const config = require('../config').default;

const { jwtsecret } = config;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    if (!token) return {};

    try {
      const user = jwt.verify(token, jwtsecret);
      return { db, user };
    } catch (error) {
      return {};
    }
  },
});

export default server;
