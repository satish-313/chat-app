import pkg from "sequelize";
const { DataTypes, Model } = pkg;
import sequelize from "../connection.js";

class username extends Model {}

username.init(
  {
    user: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: DataTypes.STRING
  },
  {
    sequelize,
    modelName: "username",
  }
);

// console.log(Username === sequelize.models.Username);

export default username;
