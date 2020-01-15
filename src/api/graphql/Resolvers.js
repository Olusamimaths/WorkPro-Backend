import UserMethod from '../../controllers/User'
import ProjectMethod from '../../controllers/Project'
import Project from '../../db/models/Project'

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

        assignTo: async (_, { projectId, email }, context) => {
            const project = await ProjectMethod.get(projectId);
            if (!project) return {message: "Project does not exist",status: "Not found", code: 404}

            const { createdBy } = project
            if (!context.user || createdBy != context.user._id || !createdBy)
                return {code: 500, status: "Auth failed", message: "Project not found for user."}
            
            return ProjectMethod.assignTo({projectId, email});
        },

        updateProject: (_, args, context) => {},

        addStory: async (_, args, context) => {
            const {
                _id: projectId,
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
            } = args

            const project = await ProjectMethod.get(projectId)
            if (!project) return {}

            const { createdBy } = project
            if (!context.user || createdBy != context.user._id || !createdBy)
                return {}
            return ProjectMethod.addStory({
                projectId,
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
