import UserMethod from '../../db/controllers/User';

const resolvers = {
    Query: {
        getUser: (_, {_id}, context) => {
            if(!context.user) return {};
            return UserMethod.get(_id)
        },
        getProject: (_, {_id}, context) => {},
        getStories: (_, {_id}, context) => {}
    },

    Mutation: {
        signup: (_, args) => UserMethod.signup(args),
        signin: (_, args) => UserMethod.signin(args),
        createProject: (_, args, context) => {},
        updateProject: (_, args, context) => {},
        addStories: (_, args, context) => {},
    }
}

export default resolvers;