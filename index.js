require("dotenv").config()
console.log(process.env.MONGO_URL);

const express = require("express");
const app = express();
const ejsMate = require("ejs-mate");
const path = require("path");
const { main } = require("./config/db.js")
const chat = require("./Routes/chat.js");
const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore=require("connect-mongo");
const flash = require("connect-flash");

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storeOptions={
    mongoUrl:process.env.MONGO_URL,
}

const store=new MongoStore.create(storeOptions);
// const store = new session.MemoryStore();
// const originalSet = store.set;
// store.set = function (sid, data, cb) {
//     console.log("📝 SESSION SAVED");
//     return originalSet.call(this, sid, data, cb);
// };

const sessionOptions = {
    secret: "mysecret",
    resave: false,
    saveUnitialized: false,
    store
}
app.use(session(sessionOptions));



app.use(flash());
app.use("/whatsapp", chat);

app.get("/test", (req, res) => {
    console.log("req recieved");
    res.send("checking bro");
});


app.use((err, req, res, next) => {
    let { status = 500, message = "Something is wrong!Check it once" } = err;
    console.log(err);
    res.status(status).render("./error.ejs", { message })
})

main()
    .then(() => app.listen(3000, () => {
        console.log("the app is listening on the port : ", 3000)
    }))
    .catch(err => console.log(err));




