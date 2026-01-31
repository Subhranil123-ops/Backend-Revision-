const express = require("express");
const router = express.Router();
const chatController = require("../Contoller/chat.js")
router
    .route("/")
    .get(chatController.root)
    .post(chatController.createNewChat)
router
.route("/new")
.get(chatController.newChat)


module.exports = router;