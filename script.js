// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function() {
    // Splash screen hides after 5 seconds
    setTimeout(() => {
        document.getElementById("splash-screen").style.display = "none";
        document.getElementById("username-popup").classList.add("active");
    }, 5000);

    // Username submission
    document.querySelector("#username-popup button").addEventListener("click", submitUsername);
});

function submitUsername() {
    const username = document.getElementById("username").value;
    if (username) {
        document.getElementById("username-popup").classList.remove("active");
        document.getElementById("category-screen").classList.add("active");
    } else {
        alert("Please enter a username.");
    }
}

// Open level selection screen
function openLevelScreen() {
    document.getElementById("category-screen").classList.remove("active");
    document.getElementById("level-screen").classList.add("active");
}

// Start a specific level
function startLevel(level) {
    document.getElementById("level-number").innerText = level;
    document.getElementById("level-screen").classList.remove("active");
    document.getElementById("problem-screen").classList.add("active");

    // Set question based on level
    if (level === 1) {
        document.getElementById("problem-text").innerText = "Arrange the ARRAY in ascending order";
    } else if (level === 2) {
        document.getElementById("problem-text").innerText = "Arrange the ARRAY in descending order";
    }
}

// Check answer
function checkAnswer() {
    const level = parseInt(document.getElementById("level-number").innerText);
    const answer = document.getElementById("answer").value.trim();

    // Correct answers for level 1 and 2
    const correctAnswers = {
        1: "1,2,3,4,5",
        2: "5,4,3,2,1"
    };

    // Verify answer
    if (answer === correctAnswers[level]) {
        document.getElementById("feedback-message").innerText = "Congrats! 🎉";
        document.getElementById("feedback-popup").classList.add("active");
    } else {
        alert("Wrong answer, try again!");
    }
}

// Move to the next level
function nextLevel() {
    document.getElementById("feedback-popup").classList.remove("active");
    document.getElementById("problem-screen").classList.remove("active");
    document.getElementById("level-screen").classList.add("active");
}
