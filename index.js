require("dotenv").config()
console.log(process.env.MONGO_URL);

const express = require("express");
const app = express();
const ejsMate = require("ejs-mate");
const path = require("path");
const { main } = require("./config/db.js")
const chat = require("./Routes/chat.js");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionOptions = {
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,
}
app.use(session(sessionOptions));
app.use(flash());
app.use((req, res, next) => {
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})
app.use("/whatsapp", chat);

app.use((err, req, res, next) => {
    let { status = 500, message = "Something is wrong!Check it once" } = err;
    console.log(err.stack);
    req.flash("error",message);
    res.redirect("/whatsapp");
});

main()
    .then(() => app.listen(3000, () => {
        console.log("the app is listening on the port : ", 3000)
    }))
    .catch(err => console.log(err));




