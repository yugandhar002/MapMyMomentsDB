require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Database connection (MySQL)
const sequelize = require("./config/database");

// Import Routes
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const profileRoutes = require("./routes/profileRoutes"); // Ensure you have this

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve uploaded images

// Multer Setup (for file uploads)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Swagger Setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User, Profile & Post API",
      version: "1.0.0",
      description: "API for user authentication, profile management, and post management",
    },
    servers: [{ url: "http://localhost:5000" }],
  },
  apis: ["./routes/userRoutes.js", "./routes/postRoutes.js", "./routes/profileRoutes.js"], 
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// API Routes
app.use("/", userRoutes);
app.use("/", postRoutes);
app.use("/", profileRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
sequelize
  .sync({ alter: true }) // Ensure tables are updated if needed
  .then(() => {
    console.log("✅ MySQL Database connected & tables synced");
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error("❌ Error connecting to database:", err));
