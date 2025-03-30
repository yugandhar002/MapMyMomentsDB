const Profile = require("../models/profileModel");

// CREATE PROFILE
exports.createProfile = async (req, res) => {
  try {
    const { name, username, bio, gender } = req.body;

    if (!name || !username || !gender) {
      return res.status(400).json({ error: "Name, username, and gender are required." });
    }

    // Check if username already exists
    const existingProfile = await Profile.findOne({ username });
    if (existingProfile) {
      return res.status(400).json({ error: "Username already taken." });
    }

    const profile = await Profile.create({ name, username, bio, gender });

    res.status(201).json({
      message: "Profile Created Successfully",
      profile,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL PROFILES
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.status(200).json({ message: "Profiles Retrieved Successfully", profiles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET PROFILE BY ID
exports.getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ error: "Profile Not Found" });
    }
    res.status(200).json({ message: "Profile Retrieved Successfully", profile });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE PROFILE
exports.updateProfile = async (req, res) => {
  try {
    const { name, username, bio, gender } = req.body;
    const profile = await Profile.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({ error: "Profile Not Found" });
    }

    if (!name || !username || !gender) {
      return res.status(400).json({ error: "Name, username, and gender are required." });
    }

    profile.name = name;
    profile.username = username;
    profile.bio = bio || profile.bio;
    profile.gender = gender;

    await profile.save();

    res.status(200).json({ message: "Profile Updated Successfully", profile });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE PROFILE
exports.deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ error: "Profile Not Found" });
    }

    await profile.deleteOne();
    res.status(200).json({ message: "Profile Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
