// Variables
var startButton = document.querySelector("#start");
var startScreen = document.querySelector("#start-screen");

var question = document.querySelector("#questions");
var questionTitle = document.querySelector("#question-title");
var choices = document.querySelector("#choices");

var question1 = [];



// Variables for creating a list elements.
var ul = document.createElement('ul');
function newLi() {
    return document.createElement("li");
};


// Event listener for Start button.
startButton.addEventListener("click", function(){
// On click removes starter text
startScreen.setAttribute("style","display:none;")
// creates unordered list.


// for (var i = 0; i < questions.length; i++) {

// Generates random question from questions.js variable.
var randomQuestion = questions[Math.floor(Math.random()*questions.length)];
// Changes question display to visible and shows question title.
question.setAttribute("style", "display: block;")
questionTitle.textContent = randomQuestion["question"];


choices.appendChild(ul);

for (var x = 0; x < randomQuestion["answers"].length; x++) {


ul.appendChild(newLi());


console.log(choices.children[x]);
};


//;}




});



