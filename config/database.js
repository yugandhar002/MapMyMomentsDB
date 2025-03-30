require("dotenv").config();
const { Sequelize } = require("sequelize");

// Verify environment variables
const requiredEnv = ["DB_NAME", "DB_USER", "DB_PASSWORD", "DB_HOST", "DB_DIALECT"];
requiredEnv.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.error(`❌ Missing environment variable: ${envVar}`);
    process.exit(1);
  }
});

// Initialize Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT.toLowerCase(), // Ensure lowercase
    logging: false, // Optional: Disable logging
  }
);

// Test Database Connection
sequelize
  .authenticate()
  .then(() => console.log("✅ MySQL Database connected successfully"))
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  });

// ✅ Export sequelize BEFORE requiring models
module.exports = sequelize;  

// Import Models AFTER exporting sequelize
const Profile = require("../models/profileModel");
const Post = require("../models/postModel");

// Sync Models with Database
sequelize
  .sync({ alter: true }) // Updates tables if needed
  .then(() => console.log("✅ MySQL Tables synced"))
  .catch((err) => console.error("❌ Error syncing tables:", err));
