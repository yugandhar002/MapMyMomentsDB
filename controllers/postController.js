const Post = require("../models/postModel");

// CREATE a new post
exports.createPost = async (req, res) => {
    try {
      const { startDestination, endDestination, date, description, images } = req.body;
  
      // If files are uploaded via multipart/form-data
      const uploadedImages = req.files ? req.files.map((file) => file.path) : images || [];
  
      const newPost = new Post({ startDestination, endDestination, date, description, images: uploadedImages });
      await newPost.save();
  
      res.status(201).json({ message: "Post created successfully", post: newPost });
    } catch (error) {
      res.status(500).json({ message: "Error creating post", error });
    }
  };
  

// GET all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};

// GET a single post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error fetching post", error });
  }
};

// UPDATE a post by ID
exports.updatePost = async (req, res) => {
  try {
    const { startDestination, endDestination, date, description } = req.body;
    const images = req.files ? req.files.map((file) => file.path) : [];

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { startDestination, endDestination, date, description, images },
      { new: true }
    );

    if (!updatedPost) return res.status(404).json({ message: "Post not found" });

    res.status(200).json({ message: "Post updated successfully", post: updatedPost });
  } catch (error) {
    res.status(500).json({ message: "Error updating post", error });
  }
};

// DELETE a post by ID
exports.deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ message: "Post not found" });

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post", error });
  }
};
