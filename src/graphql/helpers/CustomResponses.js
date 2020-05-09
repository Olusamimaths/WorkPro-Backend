import Response from './Response';

export default {
  invalidId: Response('Invalid Project Id', 500, 'The project id you supplied is not valid.'),
  notAuthorized: Response('Auth failed', 400, 'You are not authorized to perform this operation'),
  notAuthenticated: Response('Auth failed', 500, 'You need to be signed in to perform this operation'),
};
