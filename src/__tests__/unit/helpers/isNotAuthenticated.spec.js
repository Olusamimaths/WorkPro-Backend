import isNotAuthenticated from '../../../graphql/helpers/isNotAuthenticated'

const context = {}
context.user = {}

describe('The isNotAuthenticated helper function', () => {

  it('returns true if the context has no user object', () => {
    expect(isNotAuthenticated({})).toBe(true);
  });

  it('returns false if the context has a user object', () => {
    expect(isNotAuthenticated(context)).toBe(false);
  });

});
