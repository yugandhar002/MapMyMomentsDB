const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: CRUD operations for Posts
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID of the post
 *         startDestination:
 *           type: string
 *           description: Starting location of the journey
 *         endDestination:
 *           type: string
 *           description: Ending location of the journey
 *         date:
 *           type: string
 *           format: date
 *           description: Date of the journey
 *         description:
 *           type: string
 *           description: Description of the journey
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: List of image URLs
 *       example:
 *         id: "60d0fe4f5311236168a109ca"
 *         startDestination: "New York"
 *         endDestination: "Los Angeles"
 *         date: "2024-03-17"
 *         description: "An amazing road trip across the USA."
 *         images: ["image1.jpg", "image2.jpg"]
 */

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       201:
 *         description: Post created successfully
 *       400:
 *         description: Validation error - Missing required fields
 */
router.post("/posts", postController.createPost);

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Retrieve all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: List of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
router.get("/posts", postController.getAllPosts);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post
 *     responses:
 *       200:
 *         description: Post found
 *       404:
 *         description: Post not found
 */
router.get("/posts/:id", postController.getPostById);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Update a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       404:
 *         description: Post not found
 */
router.put("/posts/:id", postController.updatePost);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post
 *     responses:
 *       204:
 *         description: Post deleted successfully
 *       404:
 *         description: Post not found
 */
router.delete("/posts/:id", postController.deletePost);

module.exports = router;
