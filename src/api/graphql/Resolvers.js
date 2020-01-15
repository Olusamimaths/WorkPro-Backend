import UserMethod from '../../controllers/UserController'
import ProjectMethod from '../../controllers/ProjectController'
import CheckAuthorization from '../../helpers/CheckAuthorization';

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
            // if not authenticated, return
            if (!context.user) return {code: 500, status: "Auth failed", message: "You must be logged in."}
            const userId = context.user._id
            return ProjectMethod.create( title, userId)
        },

        assignTo: async (_, { projectId, email }, context) => ProjectMethod.assignTo(projectId, email, context),

        updateProjectTitle: (_, { projectId, title }, context) => ProjectMethod.updateProjectTitle(projectId, title, context),

        addStory: async (_, args, context) => ProjectMethod.addStory(args, context),
    }
}

export default resolvers
