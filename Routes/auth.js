const express = require("express");
const router = express.Router();
const authController = require("../Contoller/auth.js");


router
    .route("/signup")
    .get(authController.renderSignupForm)
    .post(authController.signUp);

router
    .route("/login")
    .get(authController.renderLoginForm)
    .post(authController.login);


module.exports = router;
