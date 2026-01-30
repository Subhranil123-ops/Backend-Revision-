require("dotenv").config()
const express=require("express");
const app=express();
const ejsMate=require("ejs-mate");
const path=require("path");
const {main}=require("./config/db.js")
const chat=require("./Routes/chat.js");

app.engine("ejs",ejsMate);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))
app.use(express.json());
app.use("/",chat)
main()
.then(()=>app.listen(3000,()=>{
    console.log("the app is listening on the port : ",3000)
}))
.catch(err=>console.log(err));




