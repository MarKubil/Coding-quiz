// Variables
var highScores = document.querySelector("#highscores");
// local takes an object from local storage and makes it multiply arrays.
var local = Object.keys(localStorage).map((key) => [String(key), localStorage[key]]);
// Creates new list item.
function newLi() {
    return document.createElement("li");
};

// Loops throw local arrays and prints it in HighScores
for (var i = 0; i < local.length; i++) {

}
highScores.textContent = 
console.log(local);
