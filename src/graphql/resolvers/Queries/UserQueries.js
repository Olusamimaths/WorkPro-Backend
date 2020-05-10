import UserMethod from '../../controllers/UserController';

const UserQueries = {
  getUser: (_, { _id }, context) => {
    if (!context.user) return {};
    return UserMethod.get(_id);
  },
};

module.exports = UserQueries;
