import Project from '../models/Project'
import Story from '../models/Story'

/**
 *
 * class Project Methods
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
            return savedProject ? savedProject : {}
        } catch (error) {
            console.error(error)
        }
    }

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
        } = args;

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
            const project = await Project.findById({_id: projectId});
            project.stories = [...project.stories, story];

            const updatedProject = await project.save()
            
            console.log(updatedProject.stories)
            return updatedProject;
        } catch (error) {
            console.error("Error adding story: ", error)
        }
    }
}

export default ProjectMethod
