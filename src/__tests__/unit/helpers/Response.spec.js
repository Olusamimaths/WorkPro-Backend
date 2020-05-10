import Response from '../../../graphql/helpers/Response';

describe('The Response helper function', () => {
  it('returns an object when provided with status, code, message, data arguments', () => {
    expect(Response('Auth failed', 400, 'Authentication failed', {}), expect.objectContaining({
      status: expect.any(String),
      code: expect.any(Number),
      message: expect.any(String),
      data: expect.any(Object),
    }));
  });
});
