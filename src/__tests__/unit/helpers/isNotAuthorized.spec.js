/* eslint-disable no-undef */
import mongoose from 'mongoose';
import isNotAuthorized from '../../../graphql/helpers/isNotAuthorized';

const { ObjectId } = mongoose.Types;

const _id = new ObjectId();

const context = {};
context.user = { _id };
const creatorId = _id;

describe('The isNotAuthorized helper function', () => {
  it('returns true if the current user is not authorized', () => {
    expect(isNotAuthorized(context, new ObjectId())).toBe(true);
  });

  it('returns false if the current user is authorized', () => {
    expect(isNotAuthorized(context, creatorId)).toBe(false);
  });
});
