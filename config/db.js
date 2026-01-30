const mongoose=require("mongoose");
module.exports.main=async()=>{
await mongoose.connect(process.env.MONGO_URL)
}

