import username from "../db/model/User.js";
import bcrypt from "bcryptjs";
import { registerValidation } from "../utils/registerValidation.js";
import {UserInputError} from "apollo-server"

export default {
  Query: {
    getUsers: async () => {
      try {
        const users = await username.findAll();
        return users;
      } catch (error) {
        console.log("error:", error);
      }
    },
  },
  Mutation: {
    register: async (_, args, context, info) => {
      let { user, email, password } = args;
    
      const {errors,valid} = registerValidation(args);

      if(!valid){
        throw new UserInputError("validation error",errors)
      }

      try {
        password = await bcrypt.hash(password, 6);

        const User = await username.create({
          user,
          email,
          password,
        });
        return User;
      } catch (error) {
        if (error.parent.code === "23505" || error.parent.detail.includes("already exists")) {
          errors[error.errors[0].path] = error.errors[0].message
          throw new UserInputError(error.errors[0].message,{errors})
        }
      }
    },
  },
};


