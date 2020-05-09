import Queries from './Queries';
import Mutations from './Mutations';

const resolvers = {
  Query: { ...Queries },
  Mutation: { ...Mutations },
};

export default resolvers;
