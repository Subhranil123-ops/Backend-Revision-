const Joi = require("joi");

const chatSchema = Joi.object({
    chat: Joi.object({
        from: Joi.string().min(1).required(),
        to: Joi.string().min(1).required(),
        message: Joi.string().min(1).required(),
    }).required()
})

module.exports = {
    chatSchema
}