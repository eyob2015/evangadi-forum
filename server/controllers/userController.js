const dbconnection = require("../db/dbconfig.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//require("dotenv").config();
require("dotenv").config({ path: "../.env" });
const register = async (req, res) => {
  const { username, email, firstname, lastname, password } = req.body;
  console.log(req.body);
  console.log(username, email, firstname, lastname, password);
  if (!username || !email || !firstname || !lastname || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  if (password.length < 8) {
    return res
      .status(400)
      .json({ msg: "Password must be at least 8 characters" });
  }
  

  try {
    const [user] = await dbconnection.query(
      "SELECT user_name, user_id FROM users WHERE user_name = ? OR user_email = ?",
      [username, email]
    );
    if (user && user.length > 0) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    await dbconnection.query(
      "INSERT INTO users (user_name, user_email, first_name, last_name, user_password) VALUES (?, ?, ?, ?, ?)",
      [username, email, firstname, lastname, hashedPassword]
    );
    res.status(201).json({ msg: "User created" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  try {
    const [user] = await dbconnection.query(
      "SELECT user_name,user_id,user_password FROM users WHERE user_email = ?",
      [email]
    );
    console.log(user)
    if (!user || user.length === 0) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    const match = await bcrypt.compare(password, user.user_password);
    if (!match) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const userid = user.user_id;
    const username = user.user_name;
    const token = jwt.sign({ userid, username }, 
      //jwt const
      process.env.JWT_SECRET
      , {
      expiresIn: "1d",
    });
    res.json({
      msg: "user logged in",
      token,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
const checkUser = async (req, res) => {
  res.json(req.user);
};

module.exports = {
  register,
  login,
  checkUser,
};
