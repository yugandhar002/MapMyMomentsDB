const swaggerJSDoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "User, Profile & Post API",
            version: "1.0.0",
            description: "User registration, profile management, and post creation using Swagger",
        },
        servers: [{ url: "http://localhost:5000" }],
        components: {
            schemas: {
                // User Signup Schema
                UserSignup: {
                    type: "object",
                    required: ["name", "email", "password"],
                    properties: {
                        id: { type: "integer", readOnly: true },
                        name: { type: "string" },
                        email: { type: "string", format: "email" },
                        password: { type: "string", format: "password" }
                    }
                },
                // Profile Schema
                Profile: {
                    type: "object",
                    required: ["name", "username", "bio", "gender"],
                    properties: {
                        id: { type: "integer", description: "Auto-generated ID" },
                        name: { type: "string", description: "Full name of the user" },
                        username: { type: "string", description: "Unique username" },
                        bio: { type: "string", description: "User bio" },
                        gender: {
                            type: "string",
                            enum: ["Male", "Female"],
                            description: "Gender selection from dropdown"
                        }
                    }
                },
                // Post Schema
                Post: {
                    type: "object",
                    required: ["startDestination", "date"],
                    properties: {
                        id: { type: "integer", description: "Auto-generated ID" },
                        startDestination: { type: "string", description: "Starting location" },
                        endDestination: { type: "string", description: "Ending location" },
                        date: { type: "string", format: "date", description: "Date of travel" },
                        description: { type: "string", description: "Additional details" },
                        images: {
                            type: "array",
                            items: { type: "string" },
                            description: "Array of image URLs"
                        }
                    }
                }
            }
        }
    },
    apis: ["./routes/*.js"], // Include all route files
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
