const mongoose = require("mongoose");

//----------------------------------------------------------------
//Schema -- created schema definition
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
  title: String,
  body: String,
  date: {
    type: String,
    default: Date.now()
  }
});

//Model -- Give the Model and the Schema, to register
const BlogPostModel = mongoose.model("BlogPostModel", BlogPostSchema);

module.exports = BlogPostModel;
