import UserMethod from '../../db/controllers/User'
import ProjectMethod from '../../db/controllers/Project'

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
            if (!context.user) return {}
            const userId = context.user._id
            return ProjectMethod.create({ title, userId })
        },

        updateProject: (_, args, context) => {},

        addStory: async (_, args, context) => {

            const {
                _id : projectId, 
                title, 
                description, 
                points, 
                owner,
                followers,
                labels,
                tasks,
                category,
                finished,
                delivered
            } = args;

            const {createdBy} = await ProjectMethod.get(projectId);

            if(createdBy != context.user._id) return {};

            return ProjectMethod.addStory({
                projectId , 
                title, 
                description, 
                points, 
                owner,
                followers,
                labels,
                tasks,
                category,
                finished,
                delivered
            })
        }
    }
}

export default resolvers
