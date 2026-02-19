const bcrypt = require("bcrypt");
const User = require("../models/userSchema");
const wrapAsync = require("../utils/wrapAsync.js");
const saltRounds = 10;

module.exports.renderSignupForm = ((req, res) => {
    res.render("./auth/signup.ejs");
});

module.exports.signUp = wrapAsync(async (req, res) => {
    let password = req.body.auth.password;
    password = await bcrypt.hash(password, saltRounds);
    let newUser = new User({ ...req.body.auth, password });
    req.flash("success", "bla bla bla ");
    await newUser.save();
    res.redirect("/whatsapp");
});

module.exports.renderLoginForm = ((req, res) => {
    res.render("./auth/login.ejs");
});

module.exports.login = wrapAsync(async (req, res) => {
    const { user, password } = req.body.auth;
    let u = await User.findOne({ user });
    const match = await bcrypt.compare(password, u.password);
    if(match){
        
    }
    if (!u) {
        req.flash("error", "No user found");
        res.redirect("/auth/signup");
    }
    res.redirect("/whatsapp");
});



