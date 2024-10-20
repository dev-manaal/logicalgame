document.getElementById("startGameBtn").addEventListener("click", function() {
    showPage('page2');
});

const levels = {
    sorting: [
        { question: "Sort the array [3, 1, 4, 2]", answer: "1,2,3,4" },
        { question: "Sort the array [9, 5, 8, 7]", answer: "5,7,8,9" }
    ],
    searching: [
        { question: "Find index of 5 in array [1, 2, 5, 7, 9]", answer: "2" },
        { question: "Find index of 8 in array [3, 8, 12, 7]", answer: "1" }
    ]
};

let currentCategory = '';
let currentLevel = 0;

function openCategory(category) {
    currentCategory = category;
    document.getElementById('categoryTitle').innerText = category.charAt(0).toUpperCase() + category.slice(1) + ' Algorithms';
    showPage('page3');
    loadLevels();
}

function loadLevels() {
    const levelsContainer = document.getElementById("levelsContainer");
    levelsContainer.innerHTML = ''; // Clear previous levels
    const categoryLevels = levels[currentCategory];

    for (let i = 0; i < categoryLevels.length; i++) {
        const levelBtn = document.createElement('button');
        levelBtn.classList.add('level-btn');
        levelBtn.innerText = `Level ${i + 1}`;
        levelBtn.onclick = () => startLevel(i);
        levelsContainer.appendChild(levelBtn);
    }
}

function startLevel(levelIndex) {
    currentLevel = levelIndex;
    const levelData = levels[currentCategory][currentLevel];
    document.getElementById('levelTitle').innerText = `Level ${currentLevel + 1}`;
    document.getElementById('question').innerText = levelData.question;
    document.getElementById('answerInput').value = '';
    document.getElementById('resultMessage').innerText = '';
    document.getElementById('nextLevelBtn').style.display = 'none';
    showPage('page4');
}

document.getElementById('submitAnswerBtn').addEventListener('click', function() {
    const userAnswer = document.getElementById('answerInput').value;
    const correctAnswer = levels[currentCategory][currentLevel].answer;

    if (userAnswer === correctAnswer) {
        document.getElementById('resultMessage').innerText = 'Correct!';
        document.getElementById('nextLevelBtn').style.display = 'inline';
    } else {
        document.getElementById('resultMessage').innerText = 'Try Again!';
    }
});

document.getElementById('nextLevelBtn').addEventListener('click', function() {
    if (currentLevel < levels[currentCategory].length - 1) {
        startLevel(currentLevel + 1);
    } else {
        document.getElementById('resultMessage').innerText = 'You have completed all levels!';
        document.getElementById('nextLevelBtn').style.display = 'none';
    }
});

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.style.display = 'none');
    document.getElementById(pageId).style.display = 'block';
}
