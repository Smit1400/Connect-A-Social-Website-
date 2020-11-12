const bodyParser = require("body-parser");
const path = require("path");
const mongodb_url = require("./mongo_credentials");

const forumRoutes = require("./routes/forum");

const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.get("/", (req, res, next) => {
    res.render("home");
});

app.use(forumRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode;
    const message = error.message;
    res.status(status).json({
        message: message,
        data: error.data,
    });
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