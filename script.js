// script.js
document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('startGame');
    const categories = document.querySelectorAll('.category-btn');
    const gameContent = document.getElementById('gameContent');
    const categoryTitle = document.getElementById('categoryTitle');
    const currentLevelDisplay = document.getElementById('currentLevel');
    const nextGameButton = document.getElementById('nextGame');
    const hintButton = document.getElementById('hintButton');
    const instruction = document.getElementById('instruction');
    const submitButton = document.getElementById('submitButton');
    const successModal = document.getElementById('successModal');
    const closeModal = document.getElementById('closeModal');

    let currentLevel = 1;

    // Start Game
    startButton.addEventListener('click', function () {
        document.getElementById('page1').style.display = 'none';
        document.getElementById('page2').style.display = 'block';
    });

    // Select Category
    categories.forEach(category => {
        category.addEventListener('click', function () {
            const currentCategory = category.getAttribute('data-category');
            categoryTitle.textContent = currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1) + ' Puzzle';
            document.getElementById('page2').style.display = 'none';
            document.getElementById('page3').style.display = 'block';
            loadMiniGame(currentCategory);
        });
    });

    // Load Mini Game based on selected category
    function loadMiniGame(category) {
        gameContent.innerHTML = ''; // Clear previous game content
        nextGameButton.style.display = 'none'; // Hide next game button
        hintButton.style.display = 'none'; // Hide hint button
        submitButton.style.display = 'none'; // Hide submit button
        instruction.style.display = 'none'; // Hide instruction
        currentLevelDisplay.textContent = currentLevel; // Update current level display

        switch (category) {
            case 'array':
                arrayPuzzle();
                break;
            case 'linkedlist':
                linkedListPuzzle();
                break;
            case 'stack':
                stackPuzzle();
                break;
            case 'queue':
                queuePuzzle();
                break;
            case 'tree':
                treePuzzle();
                break;
            case 'graph':
                graphPuzzle();
                break;
        }
    }

    // Array Puzzle
    function arrayPuzzle() {
        const array = Array.from({ length: currentLevel + 2 }, () => Math.floor(Math.random() * 100));
        const puzzleArea = document.createElement('div');
        puzzleArea.classList.add('puzzle-area');
        puzzleArea.setAttribute('id', 'puzzleArea');

        array.forEach(num => {
            const item = document.createElement('div');
            item.classList.add('puzzle-item');
            item.setAttribute('draggable', true);
            item.textContent = num;

            item.addEventListener('dragstart', () => {
                item.classList.add('dragging');
            });

            item.addEventListener('dragend', () => {
                item.classList.remove('dragging');
            });

            puzzleArea.appendChild(item);
        });

        // Drop Area
        puzzleArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            const draggingItem = document.querySelector('.dragging');
            const afterElement = getDragAfterElement(puzzleArea, e.clientY);
            if (afterElement == null) {
                puzzleArea.appendChild(draggingItem);
            } else {
                puzzleArea.insertBefore(draggingItem, afterElement);
            }
        });

        gameContent.appendChild(puzzleArea);
        checkSortedArray(array);
        showInstructions("Drag and drop the numbers to sort the array in ascending order!");

        hintButton.style.display = 'block'; // Show hint button
        submitButton.style.display = 'block'; // Show submit button
    }

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.puzzle-item:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    // Check if the array is sorted
    function checkSortedArray(originalArray) {
        submitButton.addEventListener('click', () => {
            const items = Array.from(document.querySelectorAll('.puzzle-item'));
            const sortedArray = items.map(item => Number(item.textContent));
            if (JSON.stringify(sortedArray) === JSON.stringify(originalArray.sort((a, b) => a - b))) {
                showSuccessModal();
                document.getElementById('levelCompleted').textContent = currentLevel; // Display completed level
            } else {
                alert("Try again! The array is not sorted correctly.");
            }
        });
    }

    // Show Instructions
    function showInstructions(text) {
        instruction.textContent = text;
        instruction.style.display = 'block';
    }

    // Show Success Modal
    function showSuccessModal() {
        successModal.style.display = 'block';
        nextGameButton.style.display = 'block'; // Show next challenge button
    }

    // Close Modal
    closeModal.addEventListener('click', function () {
        successModal.style.display = 'none';
        currentLevel++; // Move to the next level
        loadMiniGame(categoryTitle.textContent.split(' ')[0].toLowerCase()); // Load next level
    });

    // Move to Next Challenge
    nextGameButton.addEventListener('click', function () {
        successModal.style.display = 'none'; // Hide success modal
        currentLevel++; // Move to the next level
        loadMiniGame(categoryTitle.textContent.split(' ')[0].toLowerCase()); // Load next level
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', function (event) {
        if (event.target === successModal) {
            successModal.style.display = 'none';
            currentLevel++; // Move to the next level
            loadMiniGame(categoryTitle.textContent.split(' ')[0].toLowerCase()); // Load next level
        }
    });

    // Placeholder functions for Linked List, Stack, Tree, and Graph
    function linkedListPuzzle() {
        showInstructions("Linked List puzzles will be available soon!");
        hintButton.style.display = 'none'; // Hide hint button
        submitButton.style.display = 'none'; // Hide submit button
    }

    function stackPuzzle() {
        showInstructions("Stack puzzles will be available soon!");
        hintButton.style.display = 'none'; // Hide hint button
        submitButton.style.display = 'none'; // Hide submit button
    }

    function queuePuzzle() {
        showInstructions("Queue puzzles will be available soon!");
        hintButton.style.display = 'none'; // Hide hint button
        submitButton.style.display = 'none'; // Hide submit button
    }

    function treePuzzle() {
        showInstructions("Tree puzzles will be available soon!");
        hintButton.style.display = 'none'; // Hide hint button
        submitButton.style.display = 'none'; // Hide submit button
    }

    function graphPuzzle() {
        showInstructions("Graph puzzles will be available soon!");
        hintButton.style.display = 'none'; // Hide hint button
        submitButton.style.display = 'none'; // Hide submit button
    }
});