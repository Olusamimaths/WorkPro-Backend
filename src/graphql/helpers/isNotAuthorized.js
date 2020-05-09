import Response from './Response';
/**
 * Function isNotAuthorized
 */


/**
 * This helper function verifies if its the owner of a story
 * or project that is trying to modify it
 * @param {Object} context the context for the current request
 * @param {String} creatorId the id of the creator of the project or story
 */
const isNotAuthorized = (context, creatorId) => {
    if(!(context.user && context.user._id == creatorId)) return Response(
        'Auth failed',
        400,
        'You are not authorized to perform this operation'
    );
    return false;
}

export default isNotAuthorized;
