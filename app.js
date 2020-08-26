const bodyParser = require("body-parser");
const path = require("path");
const mongodb_url = require("./mongo_credentials");

const userRoutes = require("./routes/user");

const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", "views");

app.get("/", (req, res, next) => {
    res.render("home");
});

// use /display to see all the questions

app.use(userRoutes);

mongoose
    .connect(mongodb_url)
    .then((result) => {
        console.log("server started");
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err);
    });