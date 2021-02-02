import { ApolloServer } from "apollo-server";
import sequelize from "./db/connection.js";
import typedef from "./graphql/typedef.js";
import myResolver from "./graphql/resolver/index.js";
import migration from './model.config.js'
import dotenv from 'dotenv'

const main = async () => {

  dotenv.config()

  // db
  try {
    await sequelize.authenticate();
    console.log("connected to database");
  } catch (error) {
    console.log("database connection error:", error);
  }
  migration()

  // graphql
  const typeDefs = typedef;
  const resolvers = myResolver;
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ctx => ctx,
  });

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
};

main().catch((err) => {
  console.error(err);
});
