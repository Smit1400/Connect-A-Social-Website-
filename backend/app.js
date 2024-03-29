const bodyParser = require("body-parser");
const path = require("path");
// const mongodb_url = require("./mongo_credentials");

const forumRoutes = require("./routes/forum");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");

const express = require("express");
const mongoose = require("mongoose");

const app = express();

var Cors=require('cors');


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(Cors());

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

app.use(authRoutes);
app.use(forumRoutes);
app.use(postRoutes);

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
    // .connect(mongodb_url, { useNewUrlParser: true, useFindAndModify: false })
    .connect('mongodb://localhost:27017/project',{
        useNewUrlParser:true,
        useCreateIndex:true,
        useUnifiedTopology: true,
        useFindAndModify: false 
    })
    .then((result) => {
        console.log("server started");
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err);
    });