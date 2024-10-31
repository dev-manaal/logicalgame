let levels = [
    {
        question: "Given the array: [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]. Rearrange it such that even numbers come before odd numbers, Even numbers sorted in ascending order and Odd numbers sorted in descending order.",
        array: [3, 1, 4, 1, 5, 9, 2, 6, 5, 3],
        correctAnswer: [2, 4, 6, 9, 5, 5, 3, 3, 1, 1]
    },
    {
        question: "Given the array: [10, 3, 5, 7, 2]. Rearrange it such that it is in descending order.",
        array: [10, 3, 5, 7, 2],
        correctAnswer: [10, 7, 5, 3, 2]
    },
    {
        question: "Given the array: [8, 4, 7, 1, 6]. Sort it in ascending order.",
        array: [8, 4, 7, 1, 6],
        correctAnswer: [1, 4, 6, 7, 8]
    }
];

let currentLevel = 0;
let draggedIndex = null;

function startGame() {
    currentLevel = 0;
    generateLevel();
    document.getElementById('result').innerText = '';
    document.getElementById('puzzleContainer').style.display = 'block'; // Show puzzle question
    document.getElementById('puzzleResult').innerText = '';
}

function generateLevel() {
    const level = levels[currentLevel];
    document.getElementById('puzzleQuestion').innerText = level.question;
    updateArrayDisplay(level.array);
}

function updateArrayDisplay(array) {
    const container = document.getElementById('arrayContainer');
    container.innerHTML = '';
    array.forEach((value, index) => {
        const block = document.createElement('div');
        block.className = 'arrayBlock';
        block.innerHTML = value;
        block.setAttribute('draggable', 'true');

        // Add drag-and-drop event listeners for desktop
        block.ondragstart = (event) => dragStart(event, index);
        block.ondragover = dragOver;
        block.ondrop = (event) => drop(event, index);

        // Add touch event listeners for mobile
        block.addEventListener('touchstart', (event) => touchStart(event, index));
        block.addEventListener('touchmove', touchMove);
        block.addEventListener('touchend', touchEnd);

        container.appendChild(block);
    });
}

function dragStart(event, index) {
    event.dataTransfer.setData('text/plain', index);
    event.target.style.opacity = '0.5';
    draggedIndex = index; // Set draggedIndex
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event, targetIndex) {
    event.preventDefault();
    const draggedIndex = event.dataTransfer.getData('text/plain');

    // Move the dragged item to the target index
    if (draggedIndex !== targetIndex.toString() && draggedIndex !== '') {
        const draggedItem = levels[currentLevel].array.splice(draggedIndex, 1)[0]; // Remove dragged item
        levels[currentLevel].array.splice(targetIndex, 0, draggedItem); // Insert at target index
        updateArrayDisplay(levels[currentLevel].array); // Refresh display
    }

    event.target.style.opacity = '1';
}

function touchStart(event, index) {
    draggedIndex = index; // Set draggedIndex
    const block = event.target;
    block.style.opacity = '0.5';
}

function touchMove(event) {
    const touch = event.touches[0];
    const block = document.elementFromPoint(touch.clientX, touch.clientY);
    if (block && block.classList.contains('arrayBlock') && block !== event.target) {
        const targetIndex = Array.from(document.getElementById('arrayContainer').children).indexOf(block);
        if (draggedIndex !== targetIndex) {
            // Swap the elements
            const draggedItem = levels[currentLevel].array.splice(draggedIndex, 1)[0];
            levels[currentLevel].array.splice(targetIndex, 0, draggedItem);
            updateArrayDisplay(levels[currentLevel].array); // Refresh display
            draggedIndex = targetIndex; // Update draggedIndex
        }
    }
}

function touchEnd(event) {
    const block = event.target;
    block.style.opacity = '1';
}

function checkPuzzleAnswer() {
    const playerAnswer = [...document.getElementById('arrayContainer').children].map(block => parseInt(block.innerHTML));
    const correctAnswer = levels[currentLevel].correctAnswer;

    if (JSON.stringify(playerAnswer) === JSON.stringify(correctAnswer)) {
        document.getElementById('puzzleResult').innerText = 'Correct! You can now advance to the next level!';
        currentLevel++;
        if (currentLevel < levels.length) {
            generateLevel();
        } else {
            document.getElementById('puzzleResult').innerText += ' You have completed all levels!';
            document.getElementById('puzzleContainer').style.display = 'none'; // Hide puzzle question after completion
        }
    } else {
        document.getElementById('puzzleResult').innerText = 'Incorrect! Please try again.';
    }
}
