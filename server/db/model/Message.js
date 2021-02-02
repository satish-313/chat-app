import pkg from "sequelize";
const { DataTypes, Model } = pkg;
import sequelize from "../connection.js";

class message extends Model {}

message.init(
  {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    from: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    to: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "message",
  }
);


export default message;
