const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const { SECRET } = process.env;
const JWT_EXPIRE = "24h";

function generateAccessToken(user) {
  const token = jwt.sign({ user }, SECRET, {
    expiresIn: JWT_EXPIRE,
  });
  return token;
}

async function createUser(req, res) {
  try {
    const { user } = req.body;

    const userToSave = new User(user);

    await userToSave.validate();

    const existingUser = await User.findOne({
      $or: [{ email: user.email }, { username: user.username }],
    });

    if (existingUser) {
      if (existingUser.email === user.email) {
        res.status(400).json({ message: "Email already in use." });
      }
      if (existingUser.username === user.username) {
        res.status(400).json({ message: "Username not available." });
      }
    } else {
      const newUser = await userToSave.save();
      const token = generateAccessToken(newUser);
      res.status(200).json(token);
    }
  } catch (error) {
    res.status(500).json({ message: `Error creating user! ${error.message}` });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "Invalid credentials provided!" });
    } else {
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        res.status(400).json({ message: "Invalid credentials provided!" });
      } else {
        const token = generateAccessToken(user);
        res.json(token);
      }
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error encountered while attempting login!" });
  }
}

module.exports = {
  createUser,
  login,
};
