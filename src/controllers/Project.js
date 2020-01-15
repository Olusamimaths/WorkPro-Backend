import Project from '../db/models/Project'
import Story from '../db/models/Story'
import Response from '../helpers/Response'

/**
 *
 * class Project Methods
 */
class ProjectMethod {
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
}

export default ProjectMethod
