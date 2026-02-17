const Chat = require("../models/chatSchema.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");

module.exports.root = wrapAsync(async (req, res) => {
    let chats = await Chat.find({});
    res.render("./chats/home.ejs", { chats });
})

module.exports.newChat = (req, res) => {
    res.render("./chats/new.ejs")
}

module.exports.createNewChat = wrapAsync(async (req, res) => {
    let newChat = new Chat({ ...req.body.chat, created_at: new Date() });
    await newChat.save();
    req.flash("success", "New Chat");
    res.redirect("/whatsapp");
})

module.exports.show = wrapAsync(async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    if (!chat) throw new ExpressError(410, "Chat deleted");
    res.render("./chats/show.ejs", { chat })
})

module.exports.renderEditForm = wrapAsync(async (req, res) => {
    let { id } = req.params;
    let chatEach = await Chat.findById(id);
    res.render("./chats/edit.ejs", { chatEach });
})

module.exports.editChat = wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Chat.findByIdAndUpdate(id, { ...req.body.chat });
    req.flash("success", "Chat editted");
    res.redirect(`/whatsapp`);
})

module.exports.deleteChat = wrapAsync(async (req, res) => {
    let { id } = req.params
    await Chat.findByIdAndDelete(id);
    req.flash("success", "Chat deleted successflly");
    res.redirect("/whatsapp");
})

