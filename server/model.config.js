import username from "./db/model/User.js";

const migration = async () => {
  await username.sync();
};
export default migration;
