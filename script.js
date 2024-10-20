const searchingProblems = [
    {
        level: 1,
        question: "Find the index of 4 in [1, 2, 3, 4, 5] using linear search.",
        answer: "3"
    },
    {
        level: 1,
        question: "Find the index of 5 in [5, 3, 2, 1] using linear search.",
        answer: "0"
    },
    {
        level: 2,
        question: "Find the index of 7 in [1, 2, 3, 4, 5, 6, 7, 8, 9] using binary search.",
        answer: "6"
    },
    {
        level: 2,
        question: "Find the index of 10 in [2, 4, 6, 8, 10] using binary search.",
        answer: "4"
    },
    {
        level: 3,
        question: "What is the output of the following: [1, 3, 5, 7].indexOf(3)?",
        answer: "1"
    },
    {
        level: 3,
        question: "What is the output of the following: [10, 20, 30].includes(20)? (true/false)",
        answer: "true"
    }
];

const sortingProblems = [
    {
        level: 1,
        question: "What is the output of sorting [3, 1, 4, 2] using bubble sort?",
        answer: "[1, 2, 3, 4]"
    },
    {
        level: 2,
        question: "Sort the array [5, 2, 9, 1] using selection sort.",
        answer: "[1, 2, 5, 9]"
    },
    {
        level: 3,
        question: "What is the output of sorting [10, 7, 8, 9] using quicksort?",
        answer: "[7, 8, 9, 10]"
    },
    {
        level: 3,
        question: "Sort the array [6, 5, 3, 1, 8] using merge sort.",
        answer: "[1, 3, 5, 6, 8]"
    }
];

let currentLevel = 1;
let currentProblemIndex = 0;
let currentGame = "searching"; // Default game is searching

function displayProblem() {
    let problems = currentGame === "searching" ? searchingProblems : sortingProblems;
    const levelProblems = problems.filter(p => p.level === currentLevel);
    
    if (currentProblemIndex < levelProblems.length) {
        const problem = levelProblems[currentProblemIndex];
        document.getElementById("level").innerText = `Level ${currentLevel}`;
        document.getElementById("problem").innerText = problem.question;
        document.getElementById("result").innerText = "";
        document.getElementById("answer").value = "";
        document.getElementById("next").style.display = "none";
        document.getElementById("submit").disabled = false;
    } else {
        document.getElementById("problem").innerText = "Congratulations! You've completed this level.";
        document.getElementById("level").innerText = "";
        document.getElementById("submit").disabled = true;
        document.getElementById("next").style.display = "block";
    }
}

document.getElementById("submit").addEventListener("click", () => {
    let problems = currentGame === "searching" ? searchingProblems : sortingProblems;
    const userAnswer = document.getElementById("answer").value.trim();
    const correctAnswer = problems.filter(p => p.level === currentLevel)[currentProblemIndex].answer;

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        document.getElementById("result").innerText = "Correct!";
        currentProblemIndex++;
        displayProblem();
    } else {
        document.getElementById("result").innerText = "Wrong answer, try again!";
    }
});

// Move to the next level
document.getElementById("next").addEventListener("click", () => {
    currentLevel++;
    currentProblemIndex = 0;
    displayProblem();
});

// Switch games
document.getElementById("searchingBtn").addEventListener("click", () => {
    currentGame = "searching";
    currentLevel = 1;
    currentProblemIndex = 0;
    document.getElementById("next").style.display = "none";
    displayProblem();
});

document.getElementById("sortingBtn").addEventListener("click", () => {
    currentGame = "sorting";
    currentLevel = 1;
    currentProblemIndex = 0;
    document.getElementById("next").style.display = "none";
    displayProblem();
});

// Start the game
displayProblem();
