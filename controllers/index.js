const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Message = require("../models/message");
const asynchandler = require("express-async-handler");
const LocalStraregy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const passport = require("passport");

//test
exports.userGet = asynchandler(async (req, res) => {
  res.send("Connected!");
});

//Get ALL posts - render all posts when a user is logged in
exports.postsGet = asynchandler(async (req, res) => {
  res.json({
    posts: "All posts...",
  });
});
//Individual User data - this will be used to edit users profiles
exports.userInfo = asynchandler(async (req, res) => {
  res.json({
    info: "User info...",
  });
});
//All comments for a post - this will be moved wo when an individual post is selected
exports.individualPost = asynchandler(async (req, res) => {
  res.json({
    post: "This will be the post",
    comments: "Blah Blah Blah",
    user: "User...",
  });
});
//Create post -- this will add a post to the database
exports.createPost = asynchandler(async (req, res) => {
  res.send("will create a post if user has privlidges");
});
//User login - will pass token in this request
exports.userLogin = asynchandler(async (req, res) => {
  const liveAccount = await User.findOne({ email: req.body.email });
  console.log(liveAccount);
  if (liveAccount == null) {
    console.log("2");
    res.send({ data: false });
  }

  //make sure password matches
  else {
    console.log(liveAccount.password);
    bcrypt.compare(req.body.password, liveAccount.password, (err, result) => {
      if (result) {
        //correct password, need to send in user data (ID) along with a jwt token
        console.log("Login");
        return res.send({ data: true });
      } else {
        console.log("not a match");
        return res.send({ data: false });
      }
    });
  }
});
//Sign up handler -- new users getting added to the DB
exports.userCreate = asynchandler(async (req, res) => {
  console.log(req.body);
  //Pass JWT token here
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  try {
    const newUser = new User({
      fname: req.body.firstName,
      lname: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      canPost: false,
    });

    const save = newUser.save();

    res.json({ stat: "User created" });
  } catch (err) {
    console.log(err);
  }
});

//Submit a comment - post a comment, will just rerender the current page a user is on
exports.submitComment = asynchandler(async (req, res) => {
  res.send("Comment has been submitted!");
});
//Admin remove comment -- Those who have admin access will be able to remove comments
exports.adminRemoveComment = asynchandler(async (req, res) => {
  res.send("Comment removed");
});
//Edit a post -- will be able to edit posts that are currently posted
exports.userPostEdit = asynchandler(async (req, res) => {
  res.send("The post has been edited!");
});
