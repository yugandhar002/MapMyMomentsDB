const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // ✅ Correct import
const user = require("./userModel")

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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  gender: {
    type: DataTypes.ENUM("Male", "Female"),
    allowNull: true,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  profileImage: {
    type: DataTypes.STRING, // URL or path to image
    allowNull: true,
  },
  // Add userId to reference the User table
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,  // Ensure the profile belongs to a user
  },
}, { timestamps: true });

// Define associations
user.hasOne(Profile, { foreignKey: "userId" });  // A User has one Profile
Profile.belongsTo(user, { foreignKey: "id" }); // A Profile belongs to one User

module.exports = Profile;
