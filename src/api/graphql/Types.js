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

    type Task {
        content: String
        done: Boolean
    }


    type Stories {
        title: String
        type: String
        points: Int
        requester: String
        owner: String
        followers: [User]
        description: String
        labels: [String]
        tasks: [Task]
        category: String
        finished: Boolean
        delivered: Boolean
    }

    type Project {
        id: ID
        title: String
        stories: [Stories]
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