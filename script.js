let arraylevels = [
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

let arraycurentlevel = 0;
let draggedIndex = null;

function arraystartGame() {
    arraycurentlevel = 0;
    generateLevel();
    document.getElementById('result').innerText = '';
    document.getElementById('puzzleContainer').style.display = 'block'; // Show puzzle question
    document.getElementById('puzzleResult').innerText = '';
    
        // Hide Array button and show Linked List button
    document.getElementById("linkedListButton").style.display = "none";
    document.getElementById("startGameButton").style.display = "none";

}

function generateLevel() {
    const level = arraylevels[arraycurentlevel];
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
        const draggedItem = arraylevels[arraycurentlevel].array.splice(draggedIndex, 1)[0]; // Remove dragged item
        arraylevels[arraycurentlevel].array.splice(targetIndex, 0, draggedItem); // Insert at target index
        updateArrayDisplay(arraylevels[arraycurentlevel].array); // Refresh display
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
            const draggedItem = arraylevels[arraycurentlevel].array.splice(draggedIndex, 1)[0];
            arraylevels[arraycurentlevel].array.splice(targetIndex, 0, draggedItem);
            updateArrayDisplay(arraylevels[arraycurentlevel].array); // Refresh display
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
    const correctAnswer = arraylevels[arraycurentlevel].correctAnswer;

    if (JSON.stringify(playerAnswer) === JSON.stringify(correctAnswer)) {
        document.getElementById('puzzleResult').innerText = 'Correct! You can now advance to the next level!';
        arraycurentlevel++;
        if (arraycurentlevel < arraylevels.length) {
            generateLevel();
        } else {
            document.getElementById('puzzleResult').innerText += ' You have completed all arraylevels!';
            document.getElementById('puzzleContainer').style.display = 'none'; // Hide puzzle question after completion
        }
    } else {
        document.getElementById('puzzleResult').innerText = 'Incorrect! Please try again.';
    }
}


//linkedlist

function linkedliststartGame() {
    document.getElementById("linkedlist").style.display = "block"; // Show the game
    document.getElementById("linkedlistContainer").style.display = "none"; // Hide the start button
    initializeGame();
     // Hide Linked List button and show Array button
    document.getElementById("arrayButton").style.display = "none";
    document.getElementById("startGameButton").style.display = "none";
    
}

// Game Logic
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.nodesArray = [];
    }

    add(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.nodesArray.push(newNode);
    }

    display() {
        const listContainer = document.getElementById("linked-list");
        listContainer.innerHTML = "";
        this.nodesArray.forEach((node) => {
            const nodeElement = document.createElement("div");
            nodeElement.className = "node";
            nodeElement.textContent = node.value;
            listContainer.appendChild(nodeElement);
        });
    }
}

const levels = [
    { question: "What is the value of the 2nd node from the end?", answer: 4, options: [2, 3, 4, 5], start: [1, 2, 3, 4, 5] },
    { question: "How many nodes are in the linked list?", answer: 5, options: [4, 5, 6, 7], start: [1, 2, 3, 4, 5] },
    { question: "Which operation adds a node at the end?", answer: "Insertion", options: ["Insertion", "Deletion", "Traversal", "Searching"], start: [1, 2, 3, 4, 5] },
    { question: "What is the length of the linked list?", answer: 5, options: [3, 4, 5, 6], start: [1, 2, 3, 4, 5] }
];

const linkedList = new LinkedList();
let currentLevel = 0;
let startTime, timerInterval;

function initializeGame() {
    const level = levels[currentLevel];
    linkedList.nodesArray = [];
    linkedList.head = null;
    level.start.forEach(value => linkedList.add(value));
    linkedList.display();
    document.getElementById("question").textContent = level.question;
    document.getElementById("options").innerHTML = "";

    level.options.forEach(option => {
        const optionElement = document.createElement("div");
        optionElement.className = "option";
        optionElement.textContent = option;
        optionElement.onclick = () => checkAnswer(option);
        document.getElementById("options").appendChild(optionElement);
    });

    document.getElementById("next-button").style.display = "none"; // Hide the Next button initially
    document.getElementById("level").textContent = `Level: ${currentLevel + 1}`;    document.getElementById("message").textContent = ""; // Clear message
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById("timer").textContent = `Time: ${elapsed}s`;
}

function checkAnswer(selected) {
    const level = levels[currentLevel];
    if (selected === level.answer) {
        document.getElementById("message").textContent = "Correct!";
        document.getElementById("next-button").style.display = "block"; // Show Next button
    } else {
        document.getElementById("message").textContent = "Incorrect!";
        setTimeout(() => {
            document.getElementById("message").textContent = ""; // Hide message after 2 seconds
        }, 2000); // Display the "Incorrect!" message for 2 seconds
    }

    clearInterval(timerInterval); // Stop the timer after an answer is selected
}

function loadNextLevel() {
    currentLevel++;
    if (currentLevel < levels.length) {
        initializeGame(); // Load the next level
    } else {
        document.getElementById("message").textContent = "You've completed all levels!";
        document.getElementById("next-button").style.display = "none";
    }
}










// stack****************************************************************************************

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    const startGameButton = document.getElementById("startGameButton");
    const introScreen = document.getElementById("intro-screen");
    const gameContainer = document.getElementById("game-container");
    const stackContainer = document.getElementById("stack");
    const popButton = document.getElementById("pop-button");
    const playerInput = document.getElementById("player-input");
    const messageElement = document.getElementById("message");
    const scoreElement = document.getElementById("score");

    let stack = [];
    let sequence = [];
    let score = 0;
    let level = 1;
    let showingSequence = false;

    const levels = {
      1: [10, 20, 30],
      2: [5, 15, 25, 35],
      3: [1, 2, 3, 4, 5],
    };

    function renderStack(hidden = false) {
      stackContainer.innerHTML = "";
      stack.forEach((plate) => {
        const plateElement = document.createElement("div");
        plateElement.classList.add("plate");
        plateElement.textContent = hidden ? "?" : plate;
        stackContainer.appendChild(plateElement);
      });
    }

    // When the start button is clicked
    startGameButton.addEventListener("click", function () {
      introScreen.style.display = "none"; // Hide start button
      gameContainer.style.display = "block"; // Show game container

      stackstartGame();
    });

    // Renamed function to stackstartGame
    function stackstartGame() {
      resetGame();
      loadLevelSequence();
      displaySequence();

      document.getElementById("arrayButton").style.display = "none";
    document.getElementById("linkedListButton").style.display = "none";
      
    }
     
    

    function loadLevelSequence() {
      sequence = levels[level] || [];
      stack = [];
    }

    function displaySequence() {
      if (sequence.length === 0) {
        messageElement.textContent = "No more levels available. Game Over.";
        endGame();
        return;
      }

      messageElement.textContent = `Level ${level}: Memorize the sequence!`;
      playerInput.disabled = true;
      popButton.disabled = true;
      let index = 0;
      showingSequence = true;

      const interval = setInterval(() => {
        if (index < sequence.length) {
          stack.push(sequence[index]);
          renderStack();
          setTimeout(() => renderStack(true), 500);
          index++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            stack = [...sequence];
            renderStack(true);
            messageElement.textContent = "Enter numbers in reverse order!";
            playerInput.disabled = false;
            popButton.disabled = false;
            showingSequence = false;
          }, 500);
        }
      }, 1000);
    }

    function popPlate() {
      if (showingSequence) return;

      const inputNum = parseInt(playerInput.value);
      if (isNaN(inputNum)) {
        messageElement.textContent = "Please enter a valid number!";
        return;
      }

      if (stack.length === 0) {
        messageElement.textContent = "Stack is empty! Start a new game.";
        return;
      }

      const expectedNum = stack.pop();
      renderStack(true);

      if (inputNum === expectedNum) {
        score++;
        messageElement.textContent = "Correct!";
        scoreElement.textContent = `Score: ${score}`;
      } else {
        messageElement.textContent = `Incorrect! Expected ${expectedNum}. Game Over.`;
        endGame();
        return;
      }

      playerInput.value = "";

      if (stack.length === 0) {
        messageElement.textContent = `Level ${level} complete! Moving to next level...`;
        level++;
        setTimeout(stackstartGame, 2000);
      }
    }

    function endGame() {
      playerInput.disabled = true;
      popButton.disabled = true;
      introScreen.classList.remove("hidden");
    }

    function resetGame() {
      stack = [];
      sequence = [];
      score = 0;
      renderStack(true);
      scoreElement.textContent = "Score: 0";
      messageElement.textContent = "";
      playerInput.value = "";
      playerInput.disabled = true;
      popButton.disabled = true;
    }

    popButton.addEventListener("click", popPlate);

    renderStack(true);
});
