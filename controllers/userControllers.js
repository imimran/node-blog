import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "../config";

const login = async (req, res) => {
  const { username, password } = req.body;

  //checking email registerd or not...
  const foundUser = await User.findOne({ username: username });
  if (!foundUser) {
    return res.status(400).json({ error: true, msg: "Invalid credentials." });
  }

  //checking for password match..
  const isMatched = await bcrypt.compare(password, foundUser.password);
  if (!isMatched) {
    return res.status(400).json({ error: true, msg: "Invalid credentials." });
  }

  const payload = {
    id: foundUser._id,
    username: foundUser.username,
  };

  //create access token
  const token = jwt.sign(payload, JWT_KEY, { expiresIn: "24h" });

  const response = {
    msg: "Logged in Success",
    token: token,
  };

  return res.status(200).json(response);
};

const getAllUser = async (req, res) => {
  const users = await User.find();
  return res.status(200).json(users);
};

const addUser = async (req, res) => {
  let { username, email, password } = req.body;

  //if email exist or not
  const foundEmail = await User.findOne({
    email: email,
  });
  if (foundEmail) {
    return res.status(400).json({ message: "Email already exists" });
  }

  //hashed password
  const salt = await bcrypt.genSalt(10);
  let passwordHash = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    email,
    password: passwordHash,
  });

  const user = await newUser.save();
  return res.status(201).json({ msg: "User create successfully" });
};

export default {
  getAllUser,
  addUser,
  login,
};
