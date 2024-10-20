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

let currentSearchingLevel = 1;
let currentSearchingProblemIndex = 0;
let currentSortingLevel = 1;
let currentSortingProblemIndex = 0;

function displaySearchingProblem() {
    const levelProblems = searchingProblems.filter(p => p.level === currentSearchingLevel);
    
    if (currentSearchingProblemIndex < levelProblems.length) {
        const problem = levelProblems[currentSearchingProblemIndex];
        document.getElementById("searchingLevel").innerText = `Level ${currentSearchingLevel}`;
        document.getElementById("searchingProblem").innerText = problem.question;
        document.getElementById("searchingResult").innerText = "";
        document.getElementById("searchingAnswer").value = "";
        document.getElementById("searchingNext").style.display = "none";
        document.getElementById("searchingSubmit").disabled = false;
    } else {
        document.getElementById("searchingProblem").innerText = "Congratulations! You've completed this level.";
        document.getElementById("searchingLevel").innerText = "";
        document.getElementById("searchingSubmit").disabled = true;
        document.getElementById("searchingNext").style.display = "block";
    }
}

function displaySortingProblem() {
    const levelProblems = sortingProblems.filter(p => p.level === currentSortingLevel);
    
    if (currentSortingProblemIndex < levelProblems.length) {
        const problem = levelProblems[currentSortingProblemIndex];
        document.getElementById("sortingLevel").innerText = `Level ${currentSortingLevel}`;
        document.getElementById("sortingProblem").innerText = problem.question;
        document.getElementById("sortingResult").innerText = "";
        document.getElementById("sortingAnswer").value = "";
        document.getElementById("sortingNext").style.display = "none";
        document.getElementById("sortingSubmit").disabled = false;
    } else {
        document.getElementById("sortingProblem").innerText = "Congratulations! You've completed this level.";
        document.getElementById("sortingLevel").innerText = "";
        document.getElementById("sortingSubmit").disabled = true;
        document.getElementById("sortingNext").style.display = "block";
    }
}

// Search Game Logic
document.getElementById("searchingSubmit").addEventListener("click", () => {
    const userAnswer = document.getElementById("searchingAnswer").value.trim();
    const correctAnswer = searchingProblems.filter(p => p.level === currentSearchingLevel)[currentSearchingProblemIndex].answer;

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        document.getElementById("searchingResult").innerText = "Correct!";
        currentSearchingProblemIndex++;
        displaySearchingProblem();
    } else {
        document.getElementById("searchingResult").innerText = "Wrong answer, try again!";
    }
});

// Move to the next level for searching
document.getElementById("searchingNext").addEventListener("click", () => {
    currentSearchingLevel++;
    currentSearchingProblemIndex = 0;
    displaySearchingProblem();
});

// Sorting Game Logic
document.getElementById("sortingSubmit").addEventListener("click", () => {
    const userAnswer = document.getElementById("sortingAnswer").value.trim();
    const correctAnswer = sortingProblems.filter(p => p.level === currentSortingLevel)[currentSortingProblemIndex].answer;

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        document.getElementById("sortingResult").innerText = "Correct!";
        currentSortingProblemIndex++;
        displaySortingProblem();
    } else {
        document.getElementById("sortingResult").innerText = "Wrong answer, try again!";
    }
});

// Move to the next level for sorting
document.getElementById("sortingNext").addEventListener("click", () => {
    currentSortingLevel++;
    currentSortingProblemIndex = 0;
    displaySortingProblem();
});

// Switch Games
document.getElementById("toggleGame").addEventListener("click", () => {
    const searchingContainer = document.getElementById("searchingContainer");
    const sortingContainer = document.getElementById("sortingContainer");

    if (searchingContainer.style.display === "none") {
        searchingContainer.style.display = "block";
        sortingContainer.style.display = "none";
        currentSearchingLevel = 1;
        currentSearchingProblemIndex = 0;
        displaySearchingProblem();
        document.getElementById("toggleGame").innerText = "Switch to Sorting Algorithms";
    } else {
        sortingContainer.style.display = "block";
        searchingContainer.style.display = "none";
        currentSortingLevel = 1;
        currentSortingProblemIndex = 0;
        displaySortingProblem();
        document.getElementById("toggleGame").innerText = "Switch to Searching Algorithms";
    }
});

// Start with searching game
displaySearchingProblem();
