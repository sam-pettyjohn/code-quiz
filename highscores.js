function highScores() {
    var hs = JSON.parse(window.localStorage.getItem("High Scores")) || [];

    hs.sort(function (x, y) {
        return y.score - x.score
    });

    hs.forEach(function (score) {
        var listElement = document.createElement("li");
        listElement.textContent = score.initials + ": " + score.score;

        var scoresId = document.getElementById("highscore");
        scoresId.appendChild(listElement);
    });
}
highScores();