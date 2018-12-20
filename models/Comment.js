// Require mongoose
var mongoose = require("mongoose");
// Create a schema class
var Schema = mongoose.Schema;

// Create the comment schema
var NprCommentSchema = new Schema({
  // The comment text
  body: {
    type: String
  }
});

// Mongoose will automatically save the ObjectIds of the comments
// These ids are referred to in the Article model

// Create the Comment model with the CommentSchema
var Comment = mongoose.model("comments", NprCommentSchema);

// Export the Comment model
module.exports = Comment;
