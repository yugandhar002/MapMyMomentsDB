const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

/**
 * @swagger
 * tags:
 *   name: Profiles
 *   description: CRUD operations for user profiles
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Profile:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID of the profile
 *         name:
 *           type: string
 *           description: Full name of the user
 *         username:
 *           type: string
 *           description: Unique username of the user
 *         bio:
 *           type: string
 *           description: Short bio of the user
 *         gender:
 *           type: string
 *           enum: [Male, Female]
 *           description: Gender of the user
 *       example:
 *         id: 1
 *         name: John Doe
 *         username: johndoe
 *         bio: Software Developer
 *         gender: Male
 *
 *     CreateProfile:
 *       type: object
 *       required:
 *         - name
 *         - username
 *         - gender
 *       properties:
 *         name:
 *           type: string
 *         username:
 *           type: string
 *         bio:
 *           type: string
 *         gender:
 *           type: string
 *           enum: [Male, Female]
 *       example:
 *         name: Jane Doe
 *         username: janedoe
 *         bio: Tech enthusiast
 *         gender: Female
 */

/**
 * @swagger
 * /profiles:
 *   post:
 *     summary: Create a new profile
 *     tags: [Profiles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProfile'
 *     responses:
 *       201:
 *         description: Profile created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       400:
 *         description: Validation error - Missing required fields
 */
router.post("/profiles", profileController.createProfile);

/**
 * @swagger
 * /profiles:
 *   get:
 *     summary: Retrieve all profiles
 *     tags: [Profiles]
 *     responses:
 *       200:
 *         description: List of profiles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Profile'
 */
router.get("/profiles", profileController.getAllProfiles);

/**
 * @swagger
 * /profiles/{id}:
 *   get:
 *     summary: Get a profile by ID
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the profile
 *     responses:
 *       200:
 *         description: Profile found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       404:
 *         description: Profile not found
 */
router.get("/profiles/:id", profileController.getProfileById);

/**
 * @swagger
 * /profiles/{id}:
 *   put:
 *     summary: Update a profile by ID
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the profile
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProfile'
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       404:
 *         description: Profile not found
 */
router.put("/profiles/:id", profileController.updateProfile);

/**
 * @swagger
 * /profiles/{id}:
 *   delete:
 *     summary: Delete a profile by ID
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the profile
 *     responses:
 *       204:
 *         description: Profile deleted successfully
 *       404:
 *         description: Profile not found
 */
router.delete("/profiles/:id", profileController.deleteProfile);

module.exports = router;
