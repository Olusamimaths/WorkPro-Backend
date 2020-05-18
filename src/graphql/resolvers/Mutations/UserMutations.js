import UserMethod from '../../controllers/UserController';
import ProjectMethod from '../../controllers/ProjectController';

const UserMutations = {
  signup: (_, { email, password }) => UserMethod.signup(email, password),

  signin: (_, { email, password }) => UserMethod.signin(email, password),

  createProject: (_, { title }, context) => ProjectMethod.create(title, context),

  assignTo: (_, { projectId, email }, context) => ProjectMethod.assignTo(projectId, email, context),

  updateProjectTitle: (_, { projectId, title }, context) => ProjectMethod.updateProjectTitle(projectId, title, context),

  addStory: (_, args, context) => ProjectMethod.addStory(args, context),

  updateStory: (_, args, context) => ProjectMethod.updateStory(args, context),

  deleteProject: (_, { _id }, context) => ProjectMethod.deleteProject(_id, context),
};

export default UserMutations;
