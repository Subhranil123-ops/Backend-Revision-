let { chatSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");

module.exports.validateChat = (req, res, next) => {
    let result = chatSchema.validate(req.body);
    if (result.error) {
        throw new ExpressError(400, result.error?.details?.[0]?.message)
    }
    next();
}