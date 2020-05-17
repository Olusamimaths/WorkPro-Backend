/* eslint-disable no-undef */
import Response from '../../../graphql/helpers/Response';

describe('The Response helper function', () => {
  const response = Response('Auth failed', 400, 'Authentication failed', {});

  it('returns a response object that has a status defined', () => {
    expect(response.status).toBe('Auth failed');
  });

  it('returns a response object that has a code defined', () => {
    expect(response.status).toBe(400);
  });

  it('returns a response object that has a message defined', () => {
    expect(response.status).toBe('Authentication failed');
  });

  it('returns a response object that has a data object defined', () => {
    expect(response.data).toBe({});
  });
});
