// Variables
var startButton = document.querySelector("#start");
var startScreen = document.querySelector("#start-screen");

var question = document.querySelector("#questions");
var questionTitle = document.querySelector("#question-title");
var choices = document.querySelector("#choices");
var endScreenId = document.querySelector("#end-screen");
var answerResult = document.querySelector("#answerResult");


var correctAnswerIndex;
var indexOfRandomQuestion;
var score = 0;
var time = 75;


// Variables for creating a list elements.
var ul = document.createElement('ul');
// Function to create new list element.
function newLi() {
    return document.createElement("li");
};


// Event listener for Start button.
startButton.addEventListener("click", function () {
    // On click removes starter text
    startScreen.setAttribute("style", "display:none;")

    // Timer function
    document.getElementById('time').innerHTML = time;
    var timer = setInterval(function () {
        time--;
        document.getElementById('time').innerHTML = time;
        if (time <= 0) {
            clearInterval(timer);
            document.getElementById('time').innerHTML = 'Game Over';
            endScreen(score);
        };
    }, 1000);
    runQuiz();
});


function runQuiz() {
    // Adds the point for the time left after quiz done.
    if (questions.length === 0) {
        if (time > 60) {
            score = score + 10;
        } else if (time > 40) {
            score = score + 8;
        } else if (time > 30) {
            score = score + 6;
        } else if (time > 20) {
            score = score + 4;
        } else if (time > 10) {
            score = score + 2;
        } else if (score > 5) {
            score = score + 1;
        };

        // sets time to 0 if questions answered.
        time = 0;
        return endScreen(score);
    } else {
        // Generates random question from questions.js variable.
        var randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        indexOfRandomQuestion = questions.indexOf(randomQuestion)
    };

    // Changes question display to visible and shows question title.
    question.setAttribute("style", "display: block;")

    correctAnswerIndex = randomQuestion["correctAnswerIndex"];

    //Creater unordered list.
    choices.appendChild(ul);
    // loop throw randomQuestion answers
    for (var x = 0; x < randomQuestion["answers"].length; x++) {
        questionTitle.textContent = randomQuestion["question"];
        // creates ul list item.
        if (ul.children.length < 4) {
            ul.appendChild(newLi());
        };


        // evert list item gets an randomQuestion answer content.
        ul.children[x].innerHTML = "<button onclick='checkAnswer(\"" + randomQuestion["answers"].indexOf(randomQuestion["answers"][x]) + "\", this)'>" + randomQuestion["answers"][x] + "</button>"

    };


};

// Function to check the answer.
var checkAnswer = function (check) {

    if (check == correctAnswerIndex) {
        // if answer is correct adds 5 points to score
        score = score + 5;
        // Answered question pushed to seperate array
        answeredQuestions.push(questions[indexOfRandomQuestion]);
        // Answered question cuted out of the questions array
        questions.splice(indexOfRandomQuestion, 1);
        // Shows did user picked correct or wrong answer
        answerResult.setAttribute("style", "display: block;")
        answerResult.innerHTML = "<b> Correct! </b>";

        runQuiz();
    } else {
        // if picked wrong answer minus 5 points from score
        score = score - 5;
        // if picked wrong takes 10sec from time.
        time = time - 10;
        answeredQuestions.push(questions[indexOfRandomQuestion]);
        questions.splice(indexOfRandomQuestion, 1);
        answerResult.setAttribute("style", "display: block;")
        answerResult.innerHTML = "<b style=\"color:red\"> Wrong! </b>";

        runQuiz();
    };
};

// When all questions answred runs this function.
var endScreen = function (score) {
    // if score is less that 0 it will equal to 0 to avoid negative results.
    if (score < 0) {
        score = 0;
    };
    // Makes question screen invisible
    question.setAttribute("style", "display: none;");
    // Makes end screen visible
    endScreenId.setAttribute("style", "display: block;")
    // Shows score
    document.querySelector("#final-score").innerHTML = score;

    document.querySelector("#submit").addEventListener("click", function (event) {
        event.preventDefault();
        // takes a value of initials input on click button submit
        var initial = document.querySelector("#initials").value;
        // makes it only uppercase
        var initials = initial.toUpperCase();
        console.log(localStorage.getItem(initials))
        // if there is no same initials in localstorage it adds it.
        if (localStorage.getItem(initials) == null) {
            localStorage.setItem(initials, score);
            // if there is same initials checks if the score is bigger then existing if yes adds it.
        } else if (score > localStorage.getItem(initials)) {
            localStorage.setItem(initials, score);
        } else if (score <= localStorage.getItem(initials)) {
            alert("It's not you highest score!");
        };
        // refresh page.
        window.location = "./highscores.html";
    });


};
