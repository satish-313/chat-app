import {gql} from "apollo-server"

export default gql`
  type Username {
    username: String!
    email: String!
  }
  type Query {
    getUsers: [Username]!
  }
`;

