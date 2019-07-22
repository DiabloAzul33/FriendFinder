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