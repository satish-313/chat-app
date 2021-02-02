import { gql } from "apollo-server";

export default gql`
  type Username {
    id: Int!
    user: String!
    email: String!
    password: String!
    token: String
    createdAt: String
  }
  type Query {
    getUser: Username!
    getUsers: [Username]!
    login(user: String!,password: String!): Username!
  }
  type Mutation {
    register(
      user: String!
      email: String!
      password: String!
      confirmPassword: String!
    ): Username!
  }
`;
