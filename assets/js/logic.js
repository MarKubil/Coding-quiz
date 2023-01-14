// Variables
var startButton = document.querySelector("#start");
var startScreen = document.querySelector("#start-screen");

var question = document.querySelector("#questions");
var questionTitle = document.querySelector("#question-title");
var choices = document.querySelector("#choices");
var endScreenId = document.querySelector("#end-screen");


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
            document.getElementById('time').innerHTML = 'Done';

        }
    }, 1000);
    runQuiz();
});


function runQuiz() {
    if (questions.length === 0) {
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
        score = score + 5;
        answeredQuestions.push(questions[indexOfRandomQuestion]);
        questions.splice(indexOfRandomQuestion, 1);
        console.log("correct");
        runQuiz();
    } else {

        score = score - 5;
        time = time - 10;
        answeredQuestions.push(questions[indexOfRandomQuestion]);
        questions.splice(indexOfRandomQuestion, 1);
        console.log("Wrong");

        runQuiz();
    };
};

// When all questions answred runs this function.
var endScreen = function (score) {
    // Makes question screen invisible
    question.setAttribute("style", "display: none;");
    // Makes end screen visible
    endScreenId.setAttribute("style", "display: block;")
    // Shows score
    document.querySelector("#final-score").innerHTML = score;

    document.querySelector("#submit").addEventListener("click", function(){
        var initials = document.querySelector("#initials").value;

        if (localStorage.getItem(initials) === null) {
            localStorage.setItem(initials, score);
        } else if (score > localStorage.getItem(initials)) {
            localStorage.setItem(initials, score);
        } else {
            alert("It's not you highest score!");
        };
        return window.location="./highscores.html"
    });


};
