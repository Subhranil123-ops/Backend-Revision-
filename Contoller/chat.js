const Chat = require("../models/chatSchema.js");

module.exports.root = async (req, res) => {
    let chats = await Chat.find({});
    res.render("./chats/home.ejs", { chats });
}

module.exports.newChat = (req, res) => {
    res.render("./chats/new.ejs")
}

module.exports.createNewChat = async (req, res) => {
    let newChat = new Chat({ ...req.body.chat, created_at: new Date() });
    await newChat.save();
    res.redirect("/whatsapp");
}

module.exports.show = async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("./chats/show.ejs", { chat })
}

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    let chatEach = await Chat.findById(id);
    res.render("./chats/edit.ejs", { chatEach });
}

module.exports.editChat = async (req, res) => {
    let { id } = req.params;
    await Chat.findByIdAndUpdate(id, { ...req.body.chat });
    res.redirect(`/whatsapp`);
}

module.exports.deleteChat = async (req, res) => {
    let { id } = req.params
    await Chat.findByIdAndDelete(id);
    res.redirect("/whatsapp");
}