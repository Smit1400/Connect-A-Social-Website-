const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

var path = require("path");
const userRoutes = require("./routes/user");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

app.use(express.static(path.join(__dirname, "views")));
app.set("view engine", "ejs");

app.use('/images',express.static(path.join(__dirname,"images")));

app.use(userRoutes);

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
var url = process.env.DATABASEURL || "mongodb://localhost/post";
mongoose.connect("mongodb://localhost:27017/post",function(err,res){
  if (err) console.log(err);
  console.log("Connected");
  app.listen(3000);
});