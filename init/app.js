const express=require("express");
const app=express()
const {main}=require("../config/db.js")
const {data} =require("./data.js")
const Chat=require("../models/chatSchema.js");
let insertData=async()=>{
    await Chat.deleteMany({});
    await Chat.insertMany(data);
    console.log("data is successfully initialized")
}
insertData();

main()
.then(()=>app.listen(3000,()=>{
    console.log("the app is listening on the port : ",3000)
}))
.catch(err=>console.log(err));