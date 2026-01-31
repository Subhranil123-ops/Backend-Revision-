const Chat = require("../models/chatSchema.js")
module.exports.root = async (req, res) => {
    let chats = await Chat.find({});
    res.render("./chats/home.ejs", { chats });
}

module.exports.newChat = (req, res) => {
    res.render("./chats/new.ejs")
}

module.exports.createNewChat = async (req, res) => {
    let { chat } = req.body;
    console.log(chat);
    res.redirect("./chats");
}