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
  type Message{
    uuid: String!
    content: String!
    from: String!
    to: String!
    createdAt: String!
  }
  type Query {
    getUser: Username!
    getUsers: [Username]!
    login(user: String!,password: String!): Username!
    getMessages(from: String!):[Message]!
  }
  type Mutation {
    register(
      user: String!
      email: String!
      password: String!
      confirmPassword: String!
    ): Username!

    sendMessage(to:String!,content:String!): Message!
  }
`;
