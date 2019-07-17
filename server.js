var express = require("express");
var path = require("path");
var friends = require("./app/data/friends.js")
var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/app/public/index.html"));
});

app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "/app/public/survey.html"));
});

app.get("/api/friends", function(req, res) {
    res.json(friends);
});

app.post("/api/friends", function(req, res) {
    console.log(req.body);
    res.json({message: "Comparing your results to possible new friends."});
});




app.listen(3000, function() {
    console.log("Listening on port 3000");
});
