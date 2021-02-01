import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  database: "chatapp",
  username: "postgres",
  password: "satish",
  dialect: "postgres",
})

export default sequelize;