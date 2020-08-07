//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "Welcome to 'EASY BLOG' it is a simple blog website.In this you can post a blog by clicking on 'compose' button.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

// home route
app.get("/", (req, res) => {
  res.render("home", {
    homeStuff: homeStartingContent,
    posts: posts
  });
});

// about route
app.get("/about", (req, res) => {
  res.render("about", {
    aboutStuff: aboutContent
  });
});

// Contact  route
app.get("/contact", (req, res) => {
  res.render("contact", {
    contactStuff: contactContent
  });
});

// post route for new  posts
// express routing parameters
app.get("/posts/:postName", (req, res) => {
  const requestedTitle = _.lowerCase(req.params.postName);
  posts.forEach(function(post) {
    const storedPost = _.lowerCase(post.title);
    const contentBody = post.content;

    if (storedPost === requestedTitle) {
      res.render("post",{
        title:post.title,
        content: post.content
      });
    }
  });

});



// To add new post
app.get("/compose", (req,res) => {
  res.render("compose");
});

app.post("/compose", (req,res) => {
  const postData ={
    title:req.body.postTitle,
    content:req.body.postBody};

   posts.push(postData);
  res.redirect("/");
});





const PORT = process.env.PORT || 3003;
app.listen(PORT, function() {
  console.log(`Server started on port ${PORT}`);
});
