//import npm packages
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
// const cors = require("cors");

const app = express();

//observation1: Tutorial says port 8080, but since
//observation2: I am facing issues i changed it to 5000
// const PORT = process.env.PORT || 5000; --
//observation3: still problems -- it appears, keep restarting it a couple of times
const config = {
  MONGODB_URI:
    "mongodb+srv://mongo-user-789:mongo-pass-321@cluster0-uzk9u.mongodb.net/test?retryWrites=true&w=majority",
  PORT: 8080
};
const PORT = process.env.PORT || config.PORT;

//Bring in the routes --> ["./routes/api"] functions  @ ["./routes"]
const routes = require("./routes/api");

//initailize cors -- commented out again, as using the second
// way to solve CORS issue -- using "proxy" in client package.json
// app.use(cors());

//middleware, that parses
//(1) parse every json that comes in
//{2} parse every urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //true only for deep objects

//morgan was not required -- its an HTTP logger
//every single HTTP request is made, is logged
app.use(morgan("tiny"));
app.use("/api", routes); //configure the routes

mongoose
  .connect(process.env.MONGODB_URI || config["MONGODB_URI"], {
    useNewUrlParser: true,
    useUnifiedTopology: true
    // reconnectTries: 3
  })
  .then((db) => {
    // boot up post connection

    console.log(`before app.listen() Port:${PORT}..`);
    app.listen(PORT, () => {
      console.log(`app.Listen() executed, Now..Listening on port: ${PORT}`);
    });
    console.log(`after app.listen() Port:${PORT}..`);
  })
  .catch((dbErr) => {
    console.log("DB ERROR--------------------------------");
    console.log("DB Connection Error: ", dbErr.message);
    process.exit(1);
  });

//Check on the listener that the connection is live
console.log("here1---");
mongoose.connection.on("connected", () => {
  console.log("here2 [1]mongoose is connected!");
});
console.log("here3---");
console.log(
  `process.env: ${process.env.PORT} , ${process.env.NODE_ENV}, ${process.env.MONGODB_URI}`
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("dir_client/build"));
}

// Code Ends

/*
// Purposely commenting out this code
//Moved to models/BlogPostModel.js

//Saving data to our mongo database -- creating element structure
const data = {
  title: "Replicating Esterling Accime's Youtube course-2",
  body: "Very helpful course. Aiming to become a full stack developer-2"
};

//passing element structure to the Model
//FIXME
// const newBlogPost = new BlogPostModel(data); //instance of the model
*/

/*
// Purposely commenting out this code
//Comment so that its not creating data everytime

newBlogPost.save((error) => {
  if (error) {
    console.log("Error" + error);
  } else {
    console.log("Data has been saved!");
  }
});
*/
// .save()
//----------------------------------------------------------------

//Routes
//Routes refectored and moved to ./routes/api.js
// app.listen(
//   config.PORT,
//   console.log(`Server is now listening at ${config.PORT}`)
// );
