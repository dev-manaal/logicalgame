document.getElementById("startButton").addEventListener("click", function() {
    document.getElementById("initialContainer").style.display = "none";
    document.getElementById("gameContainer").style.display = "block";
});

// Function to show a specific sub-game container and hide others
function showSubGame(containerId) {
    // Hide all sub-game containers
    const subGameContainers = document.getElementsByClassName("subGameContainer");
    for (let i = 0; i < subGameContainers.length; i++) {
        subGameContainers[i].style.display = "none";
    }

    // Show the selected sub-game container
    document.getElementById(containerId).style.display = "block";

    // Reset any input fields and results
    resetGameFields(containerId);

    // Display the initial problem for the selected game
    if (containerId === 'searchingContainer') {
        displaySearchingProblem();
    } else if (containerId === 'sortingContainer') {
        displaySortingProblem();
    } else if (containerId === 'twoPointerContainer') {
        displayTwoPointerProblem();
    }
}

// Reset input fields and results for each game
function resetGameFields(containerId) {
    const answerField = document.getElementById(containerId === 'searchingContainer' ? 'searchingAnswer' :
        containerId === 'sortingContainer' ? 'sortingAnswer' : 'twoPointerAnswer');
    const resultField = document.getElementById(containerId === 'searchingContainer' ? 'searchingResult' :
        containerId === 'sortingContainer' ? 'sortingResult' : 'twoPointerResult');

    answerField.value = '';
    resultField.innerText = '';
}

// Example problem sets for Searching Algorithms
const searchingProblems = [
    { level: 1, problem: "Find the number index 4 in the array: [1, 2, 3, 4, 5]", answer: "3" },
    { level: 2, problem: "Find the number index 8 in the array: [6, 7, 8, 9]", answer: "2" }
];

let searchingCurrentLevel = 0;

function displaySearchingProblem() {
    const problem = searchingProblems[searchingCurrentLevel];
    document.getElementById("searchingLevel").innerText = `Level ${problem.level}`;
    document.getElementById("searchingProblem").innerText = problem.problem;
    document.getElementById("searchingResult").innerText = '';
    document.getElementById("searchingAnswer").value = '';
}

// Searching Algorithms Submit
document.getElementById("searchingSubmit").addEventListener("click", function() {
    const answer = document.getElementById("searchingAnswer").value;
    const correctAnswer = searchingProblems[searchingCurrentLevel].answer;

    if (answer === correctAnswer) {
        document.getElementById("searchingResult").innerText = "Correct!";
        searchingCurrentLevel++;
        if (searchingCurrentLevel < searchingProblems.length) {
            displaySearchingProblem();
        } else {
            document.getElementById("searchingResult").innerText += " You've completed all levels!";
        }
    } else {
        document.getElementById("searchingResult").innerText = "Try again!";
    }
});

// Example problem sets for Sorting Algorithms
const sortingProblems = [
    { level: 1, problem: "Sort the array: [3, 1, 4, 2]", answer: "1, 2, 3, 4" },
    { level: 2, problem: "Sort the array: [9, 7, 8, 6]", answer: "6, 7, 8, 9" }
];

let sortingCurrentLevel = 0;

function displaySortingProblem() {
    const problem = sortingProblems[sortingCurrentLevel];
    document.getElementById("sortingLevel").innerText = `Level ${problem.level}`;
    document.getElementById("sortingProblem").innerText = problem.problem;
    document.getElementById("sortingResult").innerText = '';
    document.getElementById("sortingAnswer").value = '';
}

// Sorting Algorithms Submit
document.getElementById("sortingSubmit").addEventListener("click", function() {
    const answer = document.getElementById("sortingAnswer").value;
    const correctAnswer = sortingProblems[sortingCurrentLevel].answer;

    if (answer === correctAnswer) {
        document.getElementById("sortingResult").innerText = "Correct!";
        sortingCurrentLevel++;
        if (sortingCurrentLevel < sortingProblems.length) {
            displaySortingProblem();
        } else {
            document.getElementById("sortingResult").innerText += " You've completed all levels!";
        }
    } else {
        document.getElementById("sortingResult").innerText = "Try again!";
    }
});

// Example problem sets for Two-Pointer Technique
const twoPointerProblems = [
    { level: 1, problem: "Find pairs that sum up to 10 in the array: [1, 2, 3, 7, 5]", answer: "3, 7" },
    { level: 2, problem: "Find pairs that sum up to 8 in the array: [2, 4, 3, 5]", answer: "3, 5" }
];

let twoPointerCurrentLevel = 0;

function displayTwoPointerProblem() {
    const problem = twoPointerProblems[twoPointerCurrentLevel];
    document.getElementById("twoPointerLevel").innerText = `Level ${problem.level}`;
    document.getElementById("twoPointerProblem").innerText = problem.problem;
    document.getElementById("twoPointerResult").innerText = '';
    document.getElementById("twoPointerAnswer").value = '';
}

// Two-Pointer Technique Submit
document.getElementById("twoPointerSubmit").addEventListener("click", function() {
    const answer = document.getElementById("twoPointerAnswer").value;
    const correctAnswer = twoPointerProblems[twoPointerCurrentLevel].answer;

    if (answer === correctAnswer) {
        document.getElementById("twoPointerResult").innerText = "Correct!";
        twoPointerCurrentLevel++;
        if (twoPointerCurrentLevel < twoPointerProblems.length) {
            displayTwoPointerProblem();
        } else {
            document.getElementById("twoPointerResult").innerText += " You've completed all levels!";
        }
    } else {
        document.getElementById("twoPointerResult").innerText = "Try again!";
    }
});
