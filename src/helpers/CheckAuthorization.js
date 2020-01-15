import Response from './Response';
/**
 * Function CheckAuth
 */

const CheckAuthorization = (context, creatorId) => {
    if(!(context.user && context.user._id == creatorId)) return Response(
        'Auth failed',
        400,
        'You are not authorized to perform this operation'
    );
}

export default CheckAuthorization;
