const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const profileModel=require("../models/profileModel")

// CREATE USER (Signup)
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use." });
    }

    // ⚠️ Storing password as plain text (Not secure)
    console.log(password)
    const user = await User.create({
      name,
      email,
      password, // Storing as plain text ⚠️
      role: role || "user",
    });

    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProfile=async(req,res)=>{
  try{
    const {user_id,name,email}=req.body
    console.log("name "+name)
    const profileuser=await profileModel.create(
      {
        userId:user_id,
        name:name,
        email:email
      }
    )
    res.status(200).json(profileuser)
  }catch(error){
    res.status(500).json({message:error.message})
  }
}


// GET ALL USERS (Exclude Passwords)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    res.status(200).json({ message: "Users Retrieved Successfully", users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET USER BY ID (Exclude Password)
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, { attributes: { exclude: ["password"] } });
    if (!user) {
      return res.status(404).json({ error: "User Not Found" });
    }
    res.status(200).json({ message: "User Retrieved Successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE USER (Allow Role Change)
exports.updateUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User Not Found" });
    }

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required for update." });
    }

    let updatedData = { name, email };

    // If password is provided, hash it before updating
    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    // Allow role change only if provided
    if (role) {
      updatedData.role = role;
    }

    await user.update(updatedData);

    res.status(200).json({
      message: "User Updated Successfully",
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User Not Found" });
    }

    await user.destroy();
    res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LOGIN USER
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    // Check if user exists
    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log("❌ User not found for email:", email);
      return res.status(401).json({ success: false, message: "Invalid credentials!" });
    }

    console.log("✅ User found:", user.email);
    console.log("🔐 Stored password:", user.password);
    console.log("🔑 Entered password:", password);

    // Directly compare entered password with stored password
    if (password !== user.password) {
      console.log("❌ Password does not match!");
      return res.status(200).json({ success: false, message: "Invalid credentials!" });
    }

    console.log("✅ Password matched successfully!");

    res.status(200).json({
      success: true,
      message: "Login successful",
      role: user.role,
    });

  } catch (error) {
    console.error("❌ Error in loginUser:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// to assing the admin role
// UPDATE Users SET role = 'admin' WHERE email = 'user@example.com';
