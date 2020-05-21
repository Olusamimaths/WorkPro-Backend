import UserMethod from '../../controllers/UserController';

const UserQueries = {
  getUser: (_, { _id }, context) => UserMethod.get(_id, context),
};

export default UserQueries;
