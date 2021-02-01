import { gql } from "apollo-server";

export default gql`
  type Username {
    id: Int!
    user: String!
    email: String!
    password: String!
  }
  type Query {
    getUsers: [Username]!
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
