const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    email: String
    role: String
    createdAt: String
    token: String

    status: String
    code: Int
    message: String
  }

  type Task {
    content: String
    done: Boolean

    status: String
    code: Int
    message: String
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
    projectId: ID

    status: String
    code: Int
    message: String
  }

  type Project {
    _id: ID
    title: String
    stories: [ID]
    createdAt: String
    createdBy: String
    pro: Query

    status: String
    code: Int
    message: String
  }

  type Query {
    getUser(_id: ID): User
    getProject(_id: ID): Project
    getStories(_id: ID): [Story]
    getStory(_id: ID): Story
  }

  type Mutation {
    signup(email: String!, password: String!): User
    signin(email: String!, password: String!): User
    createProject(title: String): Project
    updateProjectTitle(projectId: ID!, title: String!): Project
    assignTo(projectId: ID!, email: String!): Project
    deleteProject(_id: ID): Project

    addStory(
      projectId: ID!
      title: String!
      description: String!
      points: Int
      owner: ID
      labels: [String]
      tasks: [String]
      category: [String]
      finished: Boolean
      delivered: Boolean
    ): Project
    updateStory(
      storyId: ID!
      title: String!
      description: String!
      points: Int
      owner: ID
      labels: [String]
      tasks: [String]
      category: [String]
      finished: Boolean
      delivered: Boolean
    ): Story
  }
`;

export default typeDefs;
