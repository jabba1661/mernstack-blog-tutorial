const express = require("express");
const router = express.Router();

const BlogPostModel = require("../models/BlogPostModel");

//Routes
router.get("/", (req, res) => {
  console.log("calling /api..");

  BlogPostModel.find({})
    .then((data) => {
      //   data += "yahoo2!";

      console.log("Data: " + data);
      res.json(data);
    })
    .catch((error) => {
      console.log("error: " + error);
    });
});

//save model to the database
router.post("/save", (req, res) => {
  console.log(`calling /api/save..body: ${req.body}`);
  const data = req.body;

  const newBlogPost = new BlogPostModel(data);

  //.save
  newBlogPost.save((error) => {
    if (error) {
      res.status(500).json({ msg: "Sorry, internal server error" });
      return;
    }
    //BlogPost saved
    res.json({ msg: "we received your data!" });
  });
});

router.get("/name", (req, res) => {
  console.log("calling /api/name..");
  const data = {
    username: "peterson",
    age: 8
  };
  res.json(data);
});

module.exports = router;
