const express = require("express")
const router = express.Router()
const User = require("../models/user")
const Message = require("../models/message")
const asynchandler = require("express-async-handler")
//Select route homepage
exports.userGet = asynchandler(async(req,res) => {
    res.send("Please enter the correct route")
})
//Get ALL posts 
exports.postsGet = asynchandler(async(req,res) => {
    res.json({
        posts: 'All posts...'
    })
})
//Individual User data **Admin only**
exports.userInfo = asynchandler(async(req,res) => {
    res.json({
        info: "User info..."
    })
})