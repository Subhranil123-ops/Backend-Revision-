const express = require("express");
const router = express.Router();
const chatController = require("../Contoller/chat.js");
// let { validateChat } = require("../middleware.js");

router
    .route("/")
    .get(chatController.root)
    .post(
        // validateChat,
        chatController.createNewChat);

router
    .route("/new")
    .get(chatController.newChat)

router
    .route("/:id")
    .get(chatController.show)
    .patch(
        // validateChat,
        chatController.editChat)
    .delete(chatController.deleteChat);

router
    .route("/:id/edit")
    .get(chatController.renderEditForm);

module.exports = router;