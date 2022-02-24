import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "../config";
import * as Promise from "bluebird";
import fs from "fs";
Promise.promisifyAll(fs);

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

const bulkInsert = async (req, res) => {
  fs.readFileAsync("users.json", "utf8").then(function (resolve, reject) {
    var users = JSON.parse(resolve);

    for (let i = 0; i < users.length; i++) {
      console.log();
      let user = users[i];
      console.log("user", user);
      // first entries have no date
      // if(typeof user.date != 'undefined'){
      // var formatDate = user.date.split('\n')[1].trim();   // Thu 08 Oct 2015
      // user.date = formatDate;

      var newUser = new User(user);
      newUser.username = user.username;
      newUser.email = user.email;
      newUser.password = user.password;
      newUser.createdAt = user.createdAt;
      newUser.updatedAt = user.updatedAt;

      console.log(newUser);
      newUser.save();

      // }
    }
    return res.status(201).json({ msg: "successfuly" });
  });
};

export default {
  getAllUser,
  addUser,
  login,
  bulkInsert,
};
