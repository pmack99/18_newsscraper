// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create article schema
var NprArticleSchema = new Schema({
  // title is a required string
  title: {
    type: String,
    required: false,
    unique: true
  },
  // description is a required string
  link: {
    type: String,
    required: false,
    unique: true
  },
  // boolean to flag articles as saved
  saved: {
    type: Boolean,
    required: false,
    default: false
  },
  // This will save an array of comments' ObjectIds
  comments:[{
        type: Schema.ObjectId,
        ref:'comment'
    }]
});

// Create the Article model with the ArticleSchema
var Article = mongoose.model("articles", NprArticleSchema);

// Export the model
module.exports = Article;