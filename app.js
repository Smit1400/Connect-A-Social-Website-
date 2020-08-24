const bodyParser = require("body-parser");
const path = require("path");
const mongodb_url = require("./mongo_credentials");

const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", "views");

app.get("/", (req, res, next) => {
    res.render("forum");
});

app.post("/forum", (req, res, next) => {
    const question = req.body.question;
    const description = req.body.description;
    console.log(question, description);
    res.redirect("/");
});
mongoose
    .connect(mongodb_url)
    .then((result) => {
        console.log("server started");
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err);
    });