// Variables
var highScores = document.querySelector("#highscores");
// local takes an object from local storage and makes it multiply arrays.
var unsorted= Object.keys(localStorage).map((key) => [String(key), localStorage[key]]);
var local = unsorted.sort((A, B) => B[1] - A[1]);

// Clear HighScores button
var clear = document.querySelector("#clear");




// Creates new list item.
function newLi() {
    return document.createElement("li");
};

// Loops throw local arrays and prints it in HighScores
for (var i = 0; i < local.length; i++) {
    var string = local[i].join(" Score: ");
    highScores.appendChild(newLi());
    highScores.children[i].innerHTML = "<b>Initials:   <i>" + string + "</i></b>";
}

// Clear History button event function
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});
