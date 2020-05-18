import ProjectMethod from '../../controllers/ProjectController';

const ProjectQueries = {
  getProject: (_, { _id }, context) => ProjectMethod.getProject(_id, context),

  getStory: (_, { _id }, context) => ProjectMethod.getStory(_id, context),
};

export default ProjectQueries;
