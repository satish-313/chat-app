import userResolver from "./user.js";
import messageResolver from "./message.js";

export default {
  Message:{
    createdAt: (parent) => parent.createdAt.toISOString()
  },
  Query: {
    ...userResolver.Query,
    ...messageResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...messageResolver.Mutation,
  },
};
