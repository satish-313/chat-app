import username from "./db/model/User.js";
import message from './db/model/Message.js';

const migration = async () => {
  await username.sync();
  await message.sync();
};
export default migration;
