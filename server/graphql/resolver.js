import username from "../db/model/User.js";
import bcrypt from "bcryptjs";
import { registerValidation } from "../utils/registerValidation.js";
import { UserInputError, AuthenticationError } from "apollo-server";
import { loginValidation } from "../utils/loginValidation.js";
import jwt from "jsonwebtoken";
import pkg from "sequelize"
const {Op} = pkg;

export default {
  Query: {
    getUser: async (_, __, context, info) => {
      let token;
      if (context.req.headers.jwtauth) {
        token = context.req.headers.jwtauth;
      }

      let decodeToken = jwt.verify(token, process.env.jwtsecreat);

      if (!decodeToken) {
        throw new AuthenticationError("token expire");
      }

      try {
        const users = await username.findOne({
          where: { user: decodeToken.user },
        });
        return users;
      } catch (error) {
        console.log("error:", error);
      }
    },

    getUsers: async (_, __, context, info) => {
      let token;
      if (context.req.headers.jwtauth) {
        token = context.req.headers.jwtauth;
      }

      let decodeToken = jwt.verify(token, process.env.jwtsecreat);

      if (!decodeToken) {
        throw new AuthenticationError("token expire");
      }
      try {
        const users = await username.findAll({
          where:{user: {[Op.ne]:decodeToken.user}}
        });
        return users;
      } catch (error) {
        console.log("error:", error);
      }
    },

    login: async (_, args, context, info) => {
      const { user, password } = args;

      const { errors, valid } = loginValidation(args);

      if (!valid) {
        throw new UserInputError("validation error", errors);
      }

      const tuser = await username.findOne({
        where: { user },
      });

      if (!tuser) {
        errors.user = "invalide input";
        throw new AuthenticationError(" user not found", errors);
      }

      const correctPassword = await bcrypt.compare(password, tuser.password);

      if (!correctPassword) {
        errors.password = "password incorrect";
        throw new AuthenticationError("password error", errors);
      }

      const token = jwt.sign({ user: tuser.user }, process.env.jwtsecreat, {
        expiresIn: "1d",
      });

      return {
        ...tuser.toJSON(),
        createdAt: tuser.createdAt.toISOString(),
        token,
      };
    },
  },
  Mutation: {
    register: async (_, args, context, info) => {
      let { user, email, password } = args;
      console.log("error in register")
      const { errors, valid } = registerValidation(args);

      if (!valid) {
        throw new UserInputError("validation error", errors);
      }

      try {
        password = await bcrypt.hash(password, 6);

        const User = await username.create({
          user,
          email,
          password,
        });
        const token = jwt.sign({ user: User.user }, process.env.jwtsecreat, {
          expiresIn: "1d",
        });

        return {
          ...User.toJSON(),
          token,
        };
      } catch (error) {
        if (
          error.parent.code === "23505" ||
          error.parent.detail.includes("already exists")
        ) {
          errors[error.errors[0].path] = error.errors[0].message;
          throw new UserInputError(error.errors[0].message, { errors });
        }
      }
    },
  },
};
