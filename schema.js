console.log("SCHEMA FILE LOADED");
const Joi = require("joi");

const chatSchema = Joi.object({
    chat: Joi.object({
        from: Joi.string().min().required(),
        to: Joi.string().min().required(),
        message: Joi.string().min().required(),
    }).required()
})

module.exports = {
    chatSchema
}