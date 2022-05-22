// DOM Elements
var timerElement = document.getElementById("timer");
var startButton = document.getElementById("start-quiz");
var questionsElement = document.getElementById("questions");
var scoreElement = document.getElementById("reveal-score");
var choicesElement = document.getElementById("choices");
var feedback = document.getElementById("feedback");
var initialsElement = document.getElementById("initials");
var submitButton = document.getElementById("submit");

// quiz status variables
var timerId;
var time = 75;
var questionIndex = 0;

function timer() {
    time--;
    timerElement.textContent = time;
    if (time <= 0) {
        quizEnds();
    }
}

// click button to start quiz
startButton.onclick = quizStart;

function quizStart() {
    $("#quiz-rules").hide();
    var quizRules = document.getElementById("quiz-rules");
    // hide quizRules by adding "hide" class attribute
    quizRules.setAttribute("class", "hide");
    // reveals questions
    questionsElement.removeAttribute("class");
    // pair timerId to setInterval
    timerId = setInterval(timer, 1000);
    // show starting time and call pullQuestions
    timerElement.textContent = time;

    pullQuestions();
}

function pullQuestions() {
    var pulledQuestion = questions[questionIndex];
    // update questions-title Id with current question
    var titleElement = document.getElementById("questions-title");
    titleElement.textContent = pulledQuestion.question;
    // clear old question choices
    choicesElement.innerHTML = "";

    pulledQuestion.choices.forEach(function (choice, index) {
        // create a button for each choice available
        var option = document.createElement("button");
        option.setAttribute("class", "choice");
        option.setAttribute("value", choice);

        option.textContent = index + 1 + ". " + choice;

        // add onclick event listener for each choice
        option.onclick = questionSelect;

        // display 
        choicesElement.appendChild(option);
    });
}

function questionSelect() {
    // check is user answer is correct
    if (this.value !== questions[questionIndex].answer) {
        feedback.textContent = "Incorrect!";
        time -= 15;
    } else {
        feedback.textContent = "Correct!";
    }

    questionIndex++;

    if (questionIndex > 4) {
        return quizEnds();
    }
    // end quiz if all questions have been answered, else pull next question
    if (questionIndex === questions.length) {
        quizEnds();
    } else {
        pullQuestions();
    }
}

function quizEnds() {
    $("#quiz-over").show();
    $("#feedback").hide();
    $("#questions").hide();

    if(questions[questionIndex] === 5 || time === 0) {
        clearInterval(timerId);
    }

    // time = to score
    scoreElement.textContent = time;

    // stop timer when quiz in finished
    clearInterval(timerId);
}

function score() {
    $("#quiz-over").show();
    $("initials").hide();

    var initials = initialsElement.value.trim();

    if (initials !== "") {

        var hs = JSON.parse(window.localStorage.getItem("High Scores")) || [];

        var hsValues = {
            score: time,
            initials: initials
        }

        hs.push(hsValues);
        localStorage.setItem("High Scores", JSON.stringify(hs));
        console.log(time);
        window.location.href = "highscores.html";
    }
}
submitButton.onclick = score;