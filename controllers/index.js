const express = require("express")
const router = express.Router()
const User = require("../models/user")
const Message = require("../models/message")
//new user get
router.get("/", (req,res) => {

res.send("new user route")

})

module.exports = router