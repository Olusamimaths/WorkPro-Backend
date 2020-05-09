import Response from './Response';
/**
 * Function isNotAuthenticated
 */


/**
 * This helper function verifies if a user is signed in
 * @param {Object} context the context for the current request
 * @param {String} creatorId the id of the creator of the project or story
 */
const isNotAuthenticated = (context) => {
    if(!context.user) return Response(
        'Auth failed',
        500,
        'You need to be signed in to perform this operation'
    );
    return false;
}

export default isNotAuthenticated;
