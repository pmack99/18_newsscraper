var express = require("express");
var request = require("request");
var router = express.Router();
var axios = require("axios");
var cheerio = require("cheerio");

var Comment = require("../models/Note.js");
var Article = require("../models/Article.js");
var db = require("../models");



// Routes
router.get("/", function(req, res) {
    res.render("index");
  });

// A GET route for scraping the NYT website
router.get("/scrape", function(req, res) {
   
    axios.get("https://www.reddit.com/r/news/").then(function(response) {
      
      var $ = cheerio.load(response.data);
  
      
  $('article span').each(function(i, element){
    const title = $(this).children('a').find('h2').text();
    const link = $(this).parent().next().find('a').attr('href');
  
  if (!title || !link) return;

        db.Article.create({title, link})
          .then(function(dbArticle) {
            
            console.log(dbArticle);
          })
          .catch(function(err) {
            
            console.log(err);
          });
      });
  
      res.send("Scrape Complete");
    });
  });
  
  // Route for getting all Articles from the db
  router.get("/articles", function(req, res) {
    // Grab every document in the Articles collection
    db.Article.find({})
      .then(function(dbArticle) {
        // If we were able to successfully find Articles, send them back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });
  
  // Route for grabbing a specific Article by id, populate it with it's note
  router.get("/articles/:id", function(req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Article.findOne({ _id: req.params.id })
      // ..and populate all of the notes associated with it
      .populate("comments")
      .then(function(dbArticle) {
        // If we were able to successfully find an Article with the given id, send it back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });
  
  // Route for saving/updating an Article's associated Note
  router.post("/articles/:id", function(req, res) {
    // Create a new note and pass the req.body to the entry
    db.Note.create(req.body)
      .then(function(dbNote) {
        // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
        // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { comment: dbNote._id }, { new: true });
      })
      .then(function(dbArticle) {
        // If we were able to successfully update an Article, send it back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  module.exports = router;