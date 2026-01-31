const express=require("express");
const {main}=require("../config/db.js")
const {data} =require("./data.js")
const Chat=require("../models/chatSchema.js");
let insertData=async()=>{
    console.log(data)
    await Chat.deleteMany({});
    let chats=await Chat.insertMany(data);
    console.log(chats);
    console.log("data is successfully initialized")
}
insertData();