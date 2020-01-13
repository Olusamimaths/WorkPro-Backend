import UserMethod from '../../db/controllers/User';

const resolvers = {
    Query: {
        getUser: (_, {_id}, context) =>{
            if(!context.user) return {};
            return UserMethod.get(_id)
        }
    },

    Mutation: {
        signup: (_, args) => UserMethod.signup(args),
        signin: (_, args) => UserMethod.signin(args)
    }
}

export default resolvers;