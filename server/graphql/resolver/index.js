import userResolver from "./user.js";
import messageResolver from "./message.js";

const imgurl = 'https://res.cloudinary.com/dxh1uvmlw/image/upload/v1612333347/project/img_avatar3_fxggoz.png'

export default {
  Message:{
    createdAt: (parent) => parent.createdAt.toISOString()
  },
  Username:{
    createdAt: (parent) => parent.createdAt.toISOString(),
    imageUrl: (parent) => parent.imageUrl === null ? imgurl : parent.imageUrl
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
