import authResolvers from "./authResolvers.js";
const resolvers = {
  Query: {
    ...authResolvers.Query,
  },
  Mutation: {
    ...authResolvers.Mutation,
  },
};

export default resolvers;
