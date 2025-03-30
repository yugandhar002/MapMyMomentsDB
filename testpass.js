const bcrypt = require("bcryptjs");

const hashAndComparePassword = async () => {
  const plainPassword = "yug";

  console.log("🔍 Hashing new password...");
  const hashedPassword = await bcrypt.hash(plainPassword, 10);
  console.log("🆕 Hashed Password:", hashedPassword);

  // Compare the password
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  console.log("🛠 Password Match Test:", isMatch);
  console.log(isMatch ? "✅ Password is CORRECT!" : "❌ Password is INCORRECT!");
};

// Call the function
hashAndComparePassword();
