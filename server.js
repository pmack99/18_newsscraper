var express = require("express");
var request = require("request");
var logger = require("morgan");
var mongoose = require("mongoose");
var articleRouter = require("./controllers/article-routes.js");
var exphbs = require("express-handlebars");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

// Initialize Express
var port = process.env.PORT || 3000;
var app = express();

// Initialize Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use("/", articleRouter);


// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });




// Start the server
app.listen(port, function() {
  console.log("App running on port " + port + "!");
});
