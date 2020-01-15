import Project from '../db/models/ProjectModel'
import User from '../db/models/UserModel'
import Story from '../db/models/StoryModel'
import Response from '../helpers/Response'

/**
 *
 * class Project Method
 */
class ProjectMethod {
    /**
     *
     * @param {userDetails} object
     * @returns {object}  new project
     */
    static async create({ title, userId }) {
        const project = new Project({
            title,
            createdBy: userId
        })
        try {
            const savedProject = await project.save()
            if (!savedProject) {
                return Response(
                    'Bad Request',
                    400,
                    'Project could not be created'
                )
            }
            return Response(
                'Created',
                201,
                'Project Created',
                savedProject._doc
            )
        } catch (error) {
            console.error(error)
        }
    }

    /**
     * Assigns a project to a user
     * @param {Object} param0 
     */
    static async assignTo({projectId, email}) {
        // find the project
        try {
            const project = await Project.findById({ _id: projectId })
            const user = await User.findOne({ email })

            if (!project) {
                return Response(
                    'Bad Request',
                    400,
                    'Project could not be found'
                )
            }
            if (!user) {
                return Response(
                    'Bad Request',
                    400,
                    'User could not be found'
                )
            }

            // update the project
            //if not already assigned
            if(!project.assignedTo.includes(user._id)) {
                project.assignedTo = [...project.assignedTo, user._id];
            }
            const updatedProject = await project.save()

            // update the user
            if(!user.projects.includes(projectId)) {
                user.projects = [...user.projects, projectId];
            }
            const updatedUser = await user.save();
            if (!updatedProject || !updatedUser) {
                return Response(
                    'Server error',
                    500,
                    'Project could not be assigned to user.'
                )
            }

            return Response(
                'Assigned',
                201,
                'Project successfully assigned to user',
                project._doc
            )


        } catch (error) {
            console.log('Could not assign to: ', error)
        }       
    }

    /**
     * Adds a story to a project
     * @param {Object} args
     * @returns ProjectObject
     */
    static async addStory(args) {
        const {
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
        } = args

        const story = new Story({
            title,
            description,
            points,
            owner,
            followers,
            labels,
            tasks,
            category,
            finished,
            delivered,
            projectId
        })

        try {
            const project = await Project.findById({ _id: projectId })
            if (!project) {
                return Response(
                    'Bad Request',
                    400,
                    'Project could not be created'
                )
            }
            project.stories = [...project.stories, story]

            const updatedProject = await project.save()
            if (!project) {
                return Response(
                    'Bad Request',
                    400,
                    'Story could not be added to project'
                )
            }
            return Response(
                'Created',
                201,
                'Project Created',
                updatedProject._doc
            )
        } catch (error) {
            console.error('Error adding story: ', error)
        }
    }

    /**
     * This section contains
     * Internal methods that are not directly exposed to the user
     */
    /**
     *
     * @param {ProjectId} _id
     * @returns {ProjectObject} project
     */
    static async get(_id) {
        try {
            const project = await Project.findById({ _id })
            return project ? project : {}
        } catch (error) {
            console.log('error: ', error)
        }
    }

    /**
     *
     * @param {ProjectId} _id
     * @returns {CreatorId} createdBy
     */
    static async getProjectCreator(_id) {
        try {
            const project = await ProjectMethod.get(_id)
            const { createdBy } = project
            return createdBy ? createdBy : ''
        } catch (error) {
            console.log(error)
        }
    }
}

export default ProjectMethod
