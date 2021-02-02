import username from "../../db/model/User.js";
import { contextMiddleware } from "../../utils/contextMiddleware.js";
import message from "../../db/model/Message.js";
import { UserInputError } from "apollo-server";
import pkg from "sequelize";
const { Op } = pkg;

export default {
  Query: {
    getMessages: async (parent, args, context) => {
      const { from } = args;
      let user = contextMiddleware(context);

      const otherUser = await username.findOne({
        where: { user: from },
      });

      if (!otherUser) {
        throw new UserInputError("recipient don't exit");
      } else if (otherUser === user) {
        throw new UserInputError("self message not good");
      }

      const usernames = [user, otherUser.user];

      const messages = await message.findAll({
        where: {
          from: { [Op.in]: usernames },
          to: { [Op.in]: usernames },
        },
        order: [["createdAt", "DESC"]],
      });

      return messages;
    },
  },

  Mutation: {
    sendMessage: async (parent, args, context) => {
      const { content, to } = args;
      let user = contextMiddleware(context);

      const recipient = await username.findOne({
        where: { user: to },
      });

      if (!recipient) {
        throw new UserInputError("recipient don't exit");
      } else if (user === recipient.user) {
        throw new UserInputError("self message not good");
      }

      if (content.trim() === "") {
        throw new UserInputError("message is empty");
      }

      const messages = await message.create({
        from: user,
        to,
        content,
      });

      return messages;
    },
  },
};
