/**
 * Function isNotAuthenticated
 */

/**
 * This helper function verifies if a user is signed in
 * @param {Object} context the context for the current request
 * @param {String} creatorId the id of the creator of the project or story
 */
const isNotAuthenticated = context => {
  if (!context.user) return true;
  return false;
};

export default isNotAuthenticated;
