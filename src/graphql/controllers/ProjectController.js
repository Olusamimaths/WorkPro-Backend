import Project from '../../models/ProjectModel';
import User from '../../models/UserModel';
import Story from '../../models/StoryModel';
import Response from '../helpers/Response';
import isNotAuthorized from '../helpers/isNotAuthorized';
import isNotAuthenticated from '../helpers/isNotAuthenticated';
import isNotValidMongooseId from '../helpers/isNotValidMongooseId';
import CustomResponses from '../helpers/CustomResponses';

/**
 *
 * class Project Method
 */
class ProjectMethod {
  /**
   *
   * @param {string} title the title of the project to create
   * @param {string} userId the id of the user the project belongs to
   */
  static async create(title, context) {
    if (isNotAuthenticated(context)) return CustomResponses.invalidId;

    const project = new Project({
      title,
      createdBy: context.user._id,
    });
    try {
      const savedProject = await project.save();
      if (!savedProject) {
        return Response('Bad Request', 400, 'Project could not be created');
      }
      return Response('Created', 201, 'Project Successfully Created', savedProject._doc);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   *
   * @param {String} projectId the project id to update
   * @param {String} title the new title
   */
  static async updateProjectTitle(projectId, title, context) {
    if (isNotValidMongooseId(projectId)) return CustomResponses.invalidId;
    if (isNotAuthenticated(context)) return CustomResponses.notAuthenticated;
    try {
      const project = await Project.findById({ _id: projectId });

      if (!project) {
        return Response('Bad Request', 400, 'Project could not be found');
      }

      if (isNotAuthorized(context, project.createdBy)) return CustomResponses.notAuthorized;

      project.title = title;
      const updatedProject = await project.save();

      if (!updatedProject) {
        return Response('Internal Server Error', 500, 'Error occured while updating project');
      }
      return Response('Updated', 201, 'Project title successfully updated', updatedProject._doc);
    } catch (error) {
      console.log('Error while updating project title: ', error);
    }
  }

  /**
   *
   * @param {String} projectId the id of the project to be assigned
   * @param {String} email the user to be assigned a project
   */
  static async assignTo(projectId, email, context) {
    if (isNotValidMongooseId(projectId)) return CustomResponses.invalidId;
    if (isNotAuthenticated(context)) return CustomResponses.notAuthenticated;
    // find the project
    try {
      const project = await Project.findById({ _id: projectId });

      if (!project) {
        return Response('Not found', 404, 'Project could not be found');
      }

      // check authentication
      if (isNotAuthorized(context, project.createdBy)) return CustomResponses.notAuthorized;

      const user = await User.findOne({ email });
      if (!user) {
        return Response('Not found', 404, 'User could not be found');
      }

      // update the project
      // if not already assigned
      if (!project.assignedTo.includes(user._id)) {
        project.assignedTo = [...project.assignedTo, user._id];
      }
      const updatedProject = await project.save();

      // update the user
      if (!user.projects.includes(projectId)) {
        user.projects = [...user.projects, projectId];
      }
      const updatedUser = await user.save();
      if (!updatedProject || !updatedUser) {
        return Response('Internal Server Error', 500, 'Project could not be assigned to user.');
      }

      return Response('Assigned', 201, 'Project successfully assigned to user', project._doc);
    } catch (error) {
      console.log('Could not assign  project to user: ', error);
    }
  }

  /**
   * Adds a story to a project
   * @param {Object} args // story object
   * @returns ProjectObject
   */
  static async addStory(args, context) {
    if (isNotAuthenticated(context)) return CustomResponses.notAuthenticated;
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
      delivered,
    } = args;

    if (isNotValidMongooseId(projectId)) return CustomResponses.invalidId;
    try {
      const project = await Project.findById({ _id: projectId });
      if (!project) {
        return Response('Not found', 404, 'Project could not be found');
      }
      if (isNotAuthorized(context, project.createdBy)) return CustomResponses.notAuthorized;

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
        projectId,
      });

      project.stories = [...project.stories, story._id];
      const updatedProject = await project.save();
      if (!updatedProject) {
        return Response('Internal Server Error', 500, 'An error occured while trying to add story to project.');
      }
      return Response('Added', 201, 'Story successfully added to the project', updatedProject._doc);
    } catch (error) {
      console.error('Error adding story: ', error);
    }
  }

  /**
   *
   * @param {object} args story object
   * @param {string} storyId the id of the story to update
   * @param {object} context the current context
   */
  static async updateStory(args, storyId, context) {
    if (isNotValidMongooseId(projectId)) return CustomResponses.invalidId;
    if (isNotAuthenticated(context)) return CustomResponses.notAuthenticated;
    try {
      // checkAuthorization
      if (isNotAuthorized(context, project.createdBy)) return CustomResponses.notAuthorized;
      const story = await Story.findById({ _id: storyId });
      if (!story) {
        return Response('Not found', 404, 'Story could not be found');
      }

      const keys = Object.keys(args);
      const providedKeys = keys.filter(key => Boolean(key));
      if (providedKeys.length <= 0) { return Response('Bad Request', 500, 'You most provide at least one value to be updated'); }
      // copy the provided values to a new object
      const update = {};
      keys.forEach(key => (update[key] = args[key]));

      const updatedStory = await Story.findByIdAndUpdate(storyId, { ...update }, { useFindAndModify: false });
      if (!updatedStory) {
        return Response('Internal Server Error', 500, 'An error occured while trying to update story.');
      }
      return Response('Updated', 201, 'Story successfully updated', updatedStory._doc);
    } catch (error) {
      console.log('Error while updating story: ', error);
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
      const project = await Project.findById({ _id });
      return project || {};
    } catch (error) {
      console.log('error: ', error);
    }
  }

  /**
   *
   * @param {ProjectId} _id
   * @returns {CreatorId} createdBy
   */
  static async getProjectCreator(_id) {
    try {
      const project = await ProjectMethod.get(_id);
      const { createdBy } = project;
      return createdBy || '';
    } catch (error) {
      console.log(error);
    }
  }
}

export default ProjectMethod;
