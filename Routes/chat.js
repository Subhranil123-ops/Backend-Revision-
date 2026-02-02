const express = require("express");
const router = express.Router();
const chatController = require("../Contoller/chat.js");

router
    .route("/")
    .get(chatController.root)
    .post(chatController.createNewChat);

router
    .route("/new")
    .get(chatController.newChat)

router
    .route("/:id")
    .get(chatController.show)
    .patch(chatController.editChat)
    .delete(chatController.deleteChat);

router
    .route("/:id/edit")
    .get(chatController.renderEditForm);

module.exports = router;