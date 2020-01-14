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

    type Story {
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
        stories: [Story]
        createdAt: String
        createdBy: String
    }

    type Query {
        getUser(_id: ID): User
        getProject(_id: ID): Project
        getStories(_id: ID): [Story]
    }

    type Mutation {
        signup(username: String!, email: String!, password: String!): User,
        signin(username: String!, password: String!): User
        createProject(title: String): Project
        updateProject(title: String): Project
        addStory(_id:ID, title: String): Story
    }
`

export default typeDefs;