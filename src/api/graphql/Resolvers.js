import UserMethod from '../../controllers/UserController'
import ProjectMethod from '../../controllers/ProjectController'
import isNotAuthenticated from '../../helpers/isNotAuthenticated';

const resolvers = {
    Query: {
        getUser: (_, { _id }, context) => {
            if (!context.user) return {}
            return UserMethod.get(_id)
        },

        getProject: (_, { _id }, context) => {},

        getStories: (_, { _id }, context) => {}
    },

    Mutation: {
        signup: (_, args) => UserMethod.signup(args),

        signin: (_, args) => UserMethod.signin(args),

        createProject: (_, { title }, context) => {
            if(isNotAuthenticated(context)) return isNotAuthenticated(context);;
            const userId = context.user._id
            return ProjectMethod.create( title, userId)
        },

        assignTo: (_, { projectId, email }, context) => {
            if(isNotAuthenticated(context)) return isNotAuthenticated(context);
            return ProjectMethod.assignTo(projectId, email, context);
        },

        updateProjectTitle: (_, { projectId, title }, context) => {
            if(isNotAuthenticated(context)) return isNotAuthenticated(context);;
            return ProjectMethod.updateProjectTitle(projectId, title, context);
        },

        addStory: (_, args, context) => {
            if(isNotAuthenticated(context)) return isNotAuthenticated(context);
            return ProjectMethod.addStory(args, context);
        },
    }
}

export default resolvers
