require("dotenv").config()
console.log(process.env.MONGO_URL);

const express = require("express");
const app = express();
const ejsMate = require("ejs-mate");
const path = require("path");
const { main } = require("./config/db.js")
const chat = require("./Routes/chat.js");
const methodOverride = require("method-override");

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use("/whatsapp", chat);

main()
    .then(() => app.listen(3000, () => {
        console.log("the app is listening on the port : ", 3000)
    }))
    .catch(err => console.log(err));




