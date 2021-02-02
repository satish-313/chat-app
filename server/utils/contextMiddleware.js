import jwt from "jsonwebtoken";
import { UserInputError } from "apollo-server";

const contextMiddleware = (context) => {
  let token;
  let errors = {}
  if (context.req.headers.jwtauth) {
    token = context.req.headers.jwtauth;
  }

  let decodeToken = jwt.verify(token, process.env.jwtsecreat);

  if (!decodeToken) {
    errors.user = "token expire";
    throw new UserInputError("token expire", errors);
  }else{
    let user = decodeToken.user;
    return user;
  }

};

export { contextMiddleware };
