import mongoose from 'mongoose';
/**
 * Function isNotValidMongooseId
 */

/**
 * This helper function verifies if a user is signed in
 * @param {Object} context the context for the current request
 * @param {String} creatorId the id of the creator of the project or story
 */
const isNotValidMongooseId = id => {
  if (!mongoose.Types.ObjectId.isValid(id)) return true;
  return false;
};

export default isNotValidMongooseId;
