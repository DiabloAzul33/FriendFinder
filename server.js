var express = require("express");
var path = require("path");
var friends = require("./app/data/friends.js")
var app = express();
var PORT = process.env.PORT || 3000;

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
    var userAnswers = req.body.scores;
    var bestMatch = {name: "", photo: "", score: 1000};
    var totalDifference;
    for (var i = 0; i < friends.length; i++) {
        totalDifference = 0;
        for (var j = 0; j < friends[i].scores.length; j++) {
            totalDifference+=Math.abs(userAnswers[j]-friends[i].scores[j])

        }
            if (totalDifference < bestMatch.score) {
                bestMatch.name = friends[i].name;
                bestMatch.photo = friends[i].photo;
                bestMatch.score = totalDifference;
            }
    }
    console.log(bestMatch);
    res.json(bestMatch);
});




app.listen(PORT, function() {
    console.log("Listening on" + PORT);
});
