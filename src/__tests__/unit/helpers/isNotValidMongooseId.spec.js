import mongoose from 'mongoose';
import isNotValidMongooseId from '../../../graphql/helpers/isNotValidMongooseId';

const { ObjectId } = mongoose.Types;

describe('The isNotValidMongooseId helper function', () => {
  const id1 = new ObjectId();

  it('returns false for a valid id of the type ObjectId', () => {
    expect(isNotValidMongooseId(id1)).toBe(false);
  });

  it('returns true for an invalid id which is not an ObjectId type', () => {
    expect(isNotValidMongooseId('13433dfkkfd')).toBe(true);
  })
});
