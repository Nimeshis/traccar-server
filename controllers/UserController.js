const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

const UserLogin = async (req, role, res) => {
  let { email, password } = req;

  // First Check if the user exist in the database
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "User is not found. Invalid login credentials.",
      success: false,
    });
  }
  // We will check the if the user is logging in via the route for his department
  if (user.role !== role) {
    return res.status(403).json({
      message: "Please make sure you are logging in from the right portal.",
      success: false,
    });
  }

  // Now check if the password match
  if (user.password !== password) {
    return res.status(401).json({ error: "Invalid email or password" });
  } else {
    // if the password match Sign a the token and issue it to the user
    let token = jwt.sign(
      {
        role: user.role,
        username: user.username,
        email: user.email,
      },
      "Access_is_created",
      { expiresIn: "1hr" }
    );

    let result = {
      username: user.username,
      role: user.role,
      email: user.email,
      token: `Bearer ${token}`,
    };

    return res.status(200).json({
      ...result,
      message: "You are now logged in.",
    });
  }
};

module.exports = { UserLogin };
