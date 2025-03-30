const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // ✅ Correct import

const Profile = sequelize.define("Profile", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  gender: {
    type: DataTypes.ENUM("Male", "Female"),
    allowNull: false,
  },
}, { timestamps: true });

module.exports = Profile;
