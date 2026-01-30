const express = require("express");
const router = express.Router();
const { root } = require("../Contoller/chat.js")
router
    .route("/")
    .get(root);
module.exports = router;