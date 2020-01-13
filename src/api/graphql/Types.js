const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        role: String
        createdAt: String
        token: String
    }

    type Query {
        getUser(_id: ID): User
    }

    type Mutation {
        signup(username: String!, email: String!, password: String!): User,
        signin(username: String!, password: String!): User
    }
`

export default typeDefs;