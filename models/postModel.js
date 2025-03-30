const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Import the Sequelize instance

const Post = sequelize.define("Post", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  startDestination: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endDestination: {
    type: DataTypes.STRING,
    allowNull: true, // Optional
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  images: {
    type: DataTypes.JSON, // Store image URLs as an array
    allowNull: true,
    defaultValue: [],
  },
}, { timestamps: true });

module.exports = Post;
