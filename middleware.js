let {chatSchema}=require("./schema.js");

module.exports.validateChat=(req,res,next)=>{
    // console.log("f",req.body);
    let result=chatSchema.validate(req.body);
    // console.log("t",req.body);
    console.log(result);
    next();
}