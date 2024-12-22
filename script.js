document.addEventListener("DOMContentLoaded", () => {
    const splashScreen = document.getElementById("splash-screen");
    const credentialsPage = document.getElementById("credentials-page");
    const gameTypesPage = document.getElementById("game-types");
    const gameSections = document.querySelectorAll(".game-section");
    const usernameInput = document.getElementById("username");
    const userGreeting = document.getElementById("user-greeting");
  
    // Simulate a delay or wait for user interaction
    setTimeout(() => {
      splashScreen.style.display = "none"; // Hide splash screen
      credentialsPage.style.display = "flex"; // Show credentials form
    }, 2000); // Adjust delay time as needed (2 seconds here)
  
    // Check for saved username
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      userGreeting.textContent = savedUsername;
      splashScreen.style.display = "none";
      credentialsPage.style.display = "none";
      gameTypesPage.style.display = "block";
    }
  
    // Handle username submission
    const credentialsForm = document.getElementById("credentials-form");
    credentialsForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = usernameInput.value.trim();
      if (username) {
        localStorage.setItem("username", username);
        userGreeting.textContent = username;
        credentialsPage.style.display = "none";
        gameTypesPage.style.display = "block";
      }
    });
  
    // Back to Game Types
    const backToGameTypes = () => {
      gameSections.forEach((section) => {
        section.style.display = "none";
      });
      gameTypesPage.style.display = "block";
    };
  
    // Add Back Button functionality to all games
    document.getElementById('backToGameTypesBtnArray').addEventListener("click", backToGameTypes);
    document.getElementById('backToGameTypesBtnLinkedList').addEventListener("click", backToGameTypes);
    document.getElementById('backToGameTypesBtnStack').addEventListener("click", backToGameTypes);
    document.getElementById('backToGameTypesBtnQueue').addEventListener("click", backToGameTypes);
    document.getElementById('backToGameTypesBtnTree').addEventListener("click", backToGameTypes);
    document.getElementById('backToGameTypesBtnsliding').addEventListener("click",backToGameTypes);
  
    // Game Start Functions
    window.arraystartGame = () => {
      showGame("arrayGame");
      startArrayGame(); // Start array game logic
    };
  
    window.linkedliststartGame = () => {
      showGame("linkedListGame");
      startLinkedListGame(); // Start linked list game logic
    };
  
    window.startStackGame = () => {
      showGame("stackGame");
      startStackGame(); // Start stack game logic
    };
  
    window.startqueuegame = () => {
      showGame("queueGame");
      startQueueGame(); // Start queue game logic
    };
  
    window.starttreeGame = () => {
      showGame("treeGame");
      startTreeGame(); // Start tree game logic
    };
  
    window.startpuzzelGame = () => {
      showGame("slidingGame"); // Show the sliding game section
      initializePuzzle(); // Initialize the puzzle
  };
  
    window.startmindGame = () => {
      alert("Coming Soon!");
    };
  
    // Show Game
    const showGame = (gameId) => {
      gameTypesPage.style.display = "none";
      gameSections.forEach((section) => {
        section.style.display = section.id === gameId ? "block" : "none";
      });
    };
  
    // Game logic implementations
    const startArrayGame = () => {
      let arraylevels = [];

// Function to load the array game levels from a JSON file
function loadArrayLevels() {
  fetch('array.json')
    .then(response => response.json())
    .then(data => {
      arraylevels = data;
      arraycurentlevel = localStorage.getItem('arrayCurentLevel') || 0;
      arraycurentlevel = parseInt(arraycurentlevel);
      arraystartGame();  // Call the game start function after loading the levels
    })
    .catch(error => console.error('Error loading array levels:', error));
}

function arraystartGame() {
  generateLevel();
  document.getElementById('result').innerText = '';
  document.getElementById('puzzleContainer').style.display = 'block'; // Show puzzle question
  document.getElementById("checkPuzzleAnswer").addEventListener("click", () => {
    checkAnswer(); // Call the function to check the puzzle answer
  });
  document.getElementById('puzzleResult').innerText = '';
}

function generateLevel() {
  const level = arraylevels[arraycurentlevel];
  const levelNumber = arraycurentlevel + 1; // Display level as 1-based index
  document.getElementById('puzzleQuestion').innerHTML = `
    <strong>Level ${levelNumber}:</strong> ${level.question}
  `;
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
    block.ondragstart = (event) => dragStart(event, index);
    block.ondragover = dragOver;
    block.ondrop = (event) => drop(event, index);

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
  if (draggedIndex !== targetIndex.toString() && draggedIndex !== '') {
    const draggedItem = arraylevels[arraycurentlevel].array.splice(draggedIndex, 1)[0];
    arraylevels[arraycurentlevel].array.splice(targetIndex, 0, draggedItem);
    updateArrayDisplay(arraylevels[arraycurentlevel].array);
  }
  event.target.style.opacity = '1';
}

function checkAnswer() {
  const currentLevel = arraylevels[arraycurentlevel];
  const userAnswer = Array.from(document.querySelectorAll("#arrayContainer .arrayBlock"))
    .map((item) => parseInt(item.textContent, 10)); // Assuming the items contain text content as numbers

  const puzzleResult = document.getElementById("puzzleResult");

  if (JSON.stringify(userAnswer) === JSON.stringify(currentLevel.correctAnswer)) {
    puzzleResult.innerText = "Correct Answer!";
    puzzleResult.style.color = "green";

    // Save the current level to LocalStorage
    localStorage.setItem('arrayCurentLevel', arraycurentlevel + 1);

    // Move to the next level
    arraycurentlevel++;
    if (arraycurentlevel < arraylevels.length) {
      setTimeout(() => {
        puzzleResult.innerText = ""; // Hide message
        generateLevel(); // Load next level
      }, 2000); // Message stays for 2 seconds
    } else {
      document.getElementById("puzzleContainer").style.display = "none";
      document.getElementById("result").innerText = "Congratulations! You completed all levels!";
    }
  } else {
    puzzleResult.innerText = "Incorrect. Try again!";
    puzzleResult.style.color = "red";

    setTimeout(() => {
      puzzleResult.innerText = ""; // Hide message
    }, 2000); // Message stays for 2 seconds
  }
}

// Load the array levels
loadArrayLevels();

    };

    // *****************************************************************************************************************************************************
    const startLinkedListGame = () => {
      // Fetch the linked list questions and answers from linkedlist.json
      fetch('linkedlist.json')
        .then(response => response.json())
        .then(levels => {
          // Start the game with fetched questions
          let currentLevel = localStorage.getItem('linkedListLevel') ? parseInt(localStorage.getItem('linkedListLevel')) : 0;
          let startTime, timerInterval;
    
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
    
          const linkedList = new LinkedList();
    
          function initializeGame() {
            const level = levels[currentLevel];
            linkedList.nodesArray = [];
            linkedList.head = null;
            level.start.forEach((value) => linkedList.add(value));
            linkedList.display();
            document.getElementById("question").textContent = level.question;
            document.getElementById("options").innerHTML = "";
    
            level.options.forEach((option) => {
              const optionElement = document.createElement("div");
              optionElement.className = "option";
              optionElement.textContent = option;
              optionElement.onclick = () => linkedlistcheckanswer(option);
              document.getElementById("options").appendChild(optionElement);
            });
    
            document.getElementById("next-button").style.display = "none";
            document.getElementById("level").textContent = `Level: ${currentLevel + 1}`;
            document.getElementById("message").textContent = "";
            startTime = Date.now();
            timerInterval = setInterval(updateTimer, 1000);
    
            const nextButton = document.getElementById("next-button");
            nextButton.addEventListener('click', loadNextLevel);
          }
    
          function updateTimer() {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            document.getElementById("timer").textContent = `Time: ${elapsed}s`;
          }
    
          function linkedlistcheckanswer(selected) {
            const level = levels[currentLevel];
            if (selected === level.answer) {
              document.getElementById("message").textContent = "Correct!";
              document.getElementById("next-button").style.display = "block";
            } else {
              document.getElementById("message").textContent = "Incorrect!";
              setTimeout(() => {
                document.getElementById("message").textContent = "";
              }, 2000);
            }
    
            clearInterval(timerInterval);
          }
    
          function loadNextLevel() {
            currentLevel++;
            if (currentLevel < levels.length) {
              localStorage.setItem('linkedListLevel', currentLevel);
              initializeGame();
            } else {
              document.getElementById("message").textContent = "You've completed all levels!";
              document.getElementById("next-button").style.display = "none";
              localStorage.removeItem('linkedListLevel');
            }
          }
    
          // Initialize the game
          initializeGame();
        });
    };
    
    
    

    const startStackGame = () => {
      // Fetch levels and messages from the stack.json file
      fetch('stack.json')
        .then(response => response.json())
        .then(data => {
          const stackGame = document.getElementById("stackGame");
          stackGame.style.display = "block";
        
          const stackContainer = document.getElementById("stack");
          const playerInput = document.getElementById("player-input");
          const popButton = document.getElementById("pop-button");
          const messageElement = document.getElementById("message");
          const scoreElement = document.getElementById("score");
          const currentLevelElement = document.getElementById("current-level"); // Level display element
        
          let stack = [];
          let sequence = [];
          let score = 0;
          let level = 1;
          let incorrectGuessState = null; // Track the state of the game when the incorrect guess happens
    
          const levels = data.levels; // Load levels from stack.json
          const messages = data.messages; // Load messages from stack.json
        
          // Load saved game progress from LocalStorage if available
          if (localStorage.getItem("stackGameLevel")) {
            level = parseInt(localStorage.getItem("stackGameLevel"));
            score = parseInt(localStorage.getItem("stackGameScore"));
            stack = JSON.parse(localStorage.getItem("stackGameStack"));
          }
        
          function renderStack(hidden = false) {
            stackContainer.innerHTML = "";
            stack.forEach((plate) => {
              const plateElement = document.createElement("div");
              plateElement.classList.add("plate");
              plateElement.textContent = hidden ? "?" : plate;
              stackContainer.appendChild(plateElement);
            });
          }
        
          function updateLevelDisplay() {
            currentLevelElement.textContent = `Level: ${level}`; // Update level display
          }
        
          function displaySequence() {
            updateLevelDisplay(); // Update level at the start of each sequence
            messageElement.textContent = messages.startSequence.replace("{level}", level);
            playerInput.disabled = true;
            popButton.disabled = true;
        
            sequence = levels[level]?.sequence || []; // Use the sequence from stack.json for current level
            stack = [];
        
            let index = 0;
            const interval = setInterval(() => {
              if (index < sequence.length) {
                stack.push(sequence[index]);
                renderStack();
                setTimeout(() => renderStack(true), 500);
                index++;
              } else {
                clearInterval(interval);
                stack = [...sequence];
                renderStack(true);
                messageElement.textContent = "Enter numbers in reverse order!";
                playerInput.disabled = false;
                popButton.disabled = false;
              }
            }, 1000);
          }
        
          function popPlate() {
            const inputNum = parseInt(playerInput.value);
            if (isNaN(inputNum)) {
              messageElement.textContent = "Please enter a valid number!";
              return;
            }
        
            const expectedNum = stack.pop();
            renderStack(true);
        
            if (inputNum === expectedNum) {
              score++;
              messageElement.textContent = "Correct!";
              scoreElement.textContent = `Score: ${score}`;
            } else {
              // Save the current game state in case of an incorrect guess
              incorrectGuessState = {
                level: level,
                score: score,
                stack: [...stack], // Save the stack state
                sequence: [...sequence], // Save the sequence state
              };
        
              messageElement.textContent = messages.incorrectGuess.replace("{expectedNum}", expectedNum);
              playerInput.disabled = true;
              popButton.disabled = true;
        
              setTimeout(() => {
                // Reset to the state at the point of the incorrect guess
                level = incorrectGuessState.level;  // Ensure level remains the same
                score = incorrectGuessState.score;
                stack = incorrectGuessState.stack;
                sequence = incorrectGuessState.sequence;
        
                // Render the stack and reset game
                renderStack(true);
                scoreElement.textContent = `Score: ${score}`;
                updateLevelDisplay();
                displaySequence(); // Re-show the sequence from the current state
              }, 2000); // Restart after a delay of 2 seconds
              return;
            }
        
            playerInput.value = "";
        
            if (stack.length === 0) {
              messageElement.textContent = messages.levelComplete.replace("{level}", level);
              level++;
              if (levels[level]) {
                // Save game progress to LocalStorage
                localStorage.setItem("stackGameLevel", level);
                localStorage.setItem("stackGameScore", score);
                localStorage.setItem("stackGameStack", JSON.stringify(stack));
                setTimeout(displaySequence, 2000);  // Delay before showing the next sequence
              } else {
                messageElement.textContent = messages.gameOver;
                localStorage.removeItem("stackGameLevel"); // Clear saved progress
                localStorage.removeItem("stackGameScore");
                localStorage.removeItem("stackGameStack");
              }
            }
          }
        
          popButton.addEventListener("click", popPlate);
          displaySequence();
        })
        .catch((error) => {
          console.error("Error loading stack.json:", error);
        });
    };
    
    
    
  

    const startQueueGame = () => {
      // Initialize global variables
      const cardsContainer = document.getElementById("cards-container");
      const inputContainer = document.getElementById("input-container");
      const submitButton = document.getElementById("submit-button");
      const feedback = document.getElementById("feedback");
      const qlevelDisplay = document.getElementById("qlevel");
      const qscoreDisplay = document.getElementById("qscore");
      const originalNumbersHeading = document.getElementById("original-numbers-heading");
    
      let qlevel = 1;
      let qscore = 0;
      let numbers = [];
      let shuffledNumbers = [];
      let currentGuessIndex = 0;
    
      // Fetch the queue.json file
      fetch('queue.json')
        .then(response => response.json())
        .then(data => {
          const levels = data.levels;
          const messages = data.messages;
    
          // Utility to shuffle an array
          function shuffleArray(array) {
            return array.sort(() => Math.random() - 0.5);
          }
    
          // Load saved game progress from LocalStorage if available
          if (localStorage.getItem("queueGameLevel")) {
            qlevel = parseInt(localStorage.getItem("queueGameLevel"));
            qscore = parseInt(localStorage.getItem("queueGameScore"));
            shuffledNumbers = JSON.parse(localStorage.getItem("queueGameShuffledNumbers"));
            currentGuessIndex = parseInt(localStorage.getItem("queueGameCurrentGuessIndex"));
          }
    
          // Initialize the qlevel
          function initializeqlevel() {
            // Use the numbers from the current level in the JSON file
            numbers = levels[qlevel]?.numbers || [];
            shuffledNumbers = shuffleArray([...numbers]);
    
            // Reset guess index
            currentGuessIndex = 0;
    
            // Update qlevel display
            qlevelDisplay.textContent = qlevel;
            originalNumbersHeading.textContent = `Original Numbers: ${numbers.join(", ")}`;
    
            // Clear the card and input containers
            cardsContainer.innerHTML = "";
            inputContainer.innerHTML = "";
    
            // Display original numbers
            numbers.forEach((number) => {
              const card = document.createElement("div");
              card.classList.add("card");
              card.textContent = number;
              cardsContainer.appendChild(card);
            });
    
            // Show original numbers for 3 seconds, then shuffle
            setTimeout(() => {
              displayShuffledOrder();
            }, 3000);
          }
    
          // Display shuffled numbers in the cards
          function displayShuffledOrder() {
            cardsContainer.innerHTML = "";
            shuffledNumbers.forEach((number) => {
              const card = document.createElement("div");
              card.classList.add("card");
              card.textContent = number;
              cardsContainer.appendChild(card);
            });
    
            // Show shuffled numbers for 2 seconds, then hide them
            setTimeout(() => {
              hideNumbersAndShowInputs();
            }, 2000);
          }
    
          // Hide numbers and show inputs
          function hideNumbersAndShowInputs() {
            cardsContainer.innerHTML = "";
            shuffledNumbers.forEach(() => {
              const card = document.createElement("div");
              card.classList.add("card", "hidden");
              card.textContent = "?";
              cardsContainer.appendChild(card);
            });
    
            // Create input fields for the user to guess
            inputContainer.innerHTML = "";
            const input = document.createElement("input");
            input.type = "number";
            input.classList.add("guess-input");
            input.placeholder = "?";
            inputContainer.appendChild(input);
    
            // Show submit button
            submitButton.style.display = "inline-block";
          }
    
          // Handle the guess submission
          submitButton.addEventListener("click", () => {
            const input = document.querySelector(".guess-input");
            const guess = Number(input.value);
    
            // Check if the guess matches the shuffled number at currentGuessIndex
            if (guess === shuffledNumbers[currentGuessIndex]) {
              feedback.textContent = messages.correctGuess;
              feedback.classList.remove("incorrect");
              feedback.classList.add("correct");
    
              // Increment qscore
              qscore += 10 * qlevel;
              qscoreDisplay.textContent = qscore;
    
              // Move to next number
              currentGuessIndex++;
    
              // If all numbers are guessed correctly, qlevel up
              if (currentGuessIndex === shuffledNumbers.length) {
                qlevel++;
                qlevelDisplay.textContent = qlevel;
                feedback.textContent = messages.levelComplete.replace("{level}", qlevel);
                setTimeout(() => {
                  initializeqlevel();
                  feedback.textContent = "";
                }, 1000);
              } else {
                // Show next input field
                hideNumbersAndShowInputs();
              }
            } else {
              feedback.textContent = messages.incorrectGuess;
              feedback.classList.remove("correct");
              feedback.classList.add("incorrect");
            }
    
            // Save the current game state to LocalStorage after each guess
            localStorage.setItem("queueGameLevel", qlevel);
            localStorage.setItem("queueGameScore", qscore);
            localStorage.setItem("queueGameShuffledNumbers", JSON.stringify(shuffledNumbers));
            localStorage.setItem("queueGameCurrentGuessIndex", currentGuessIndex);
          });
    
          // Start the game
          initializeqlevel();
        })
        .catch((error) => {
          console.error("Error loading queue.json:", error);
        });
    };
    // *************************************************************************************************
const startTreeGame = () => {
  fetch('tree.json')
    .then(response => response.json())
    .then(data => {
      const levels = data.levels;
      console.log(levels);
  
      
let currentLevel = 0;

const treeContainer = document.getElementById("treeContainer");
const nodeContainer = document.getElementById("nodeContainer");
const mess = document.getElementById("mess");
const checkBtn = document.getElementById("checkBtn");
const levelIndicator = document.getElementById("levelIndicator");

// Function to load a level
function loadLevel(levelIndex) {
  const level = levels[levelIndex];

  // Update the level indicator
  levelIndicator.innerText = `Level: ${levelIndex + 1}`;
  const levelHeading = document.getElementById("levelHeading");
  levelHeading.innerText = level.heading;  // Display the heading
  // Clear existing nodes and targets
  treeContainer.innerHTML = "";
  nodeContainer.innerHTML = "";

  // Add targets
  level.targets.forEach((target) => {
    const div = document.createElement("div");
    div.className = "target";
    div.setAttribute("data-value", target.value);
    div.style.left = `${target.x}px`;
    div.style.top = `${target.y}px`;
    treeContainer.appendChild(div);
  });

  // Add draggable nodes
  level.nodes.forEach((value) => {
    const div = document.createElement("div");
    div.className = "node";
    div.setAttribute("data-value", value);
    div.setAttribute("draggable", "true");
    div.innerText = value;
    nodeContainer.appendChild(div);

    // Add drag events
    div.addEventListener("dragstart", () => {
      draggedNode = div;
      div.classList.add("dragging");
    });
    div.addEventListener("dragend", () => {
      draggedNode = null;
      div.classList.remove("dragging");
    });
  });
}

// Drag and Drop Logic
let draggedNode = null;

treeContainer.addEventListener("dragover", (e) => e.preventDefault());

treeContainer.addEventListener("drop", (e) => {
  const target = e.target.closest(".target");
  if (target && draggedNode) {
    const existingNode = target.querySelector(".node");
    if (existingNode) {
      nodeContainer.appendChild(existingNode);
    }
    target.appendChild(draggedNode);
  }
});

// Check Answer Logic
checkBtn.addEventListener("click", () => {
  const level = levels[currentLevel];
  let isCorrect = true;

  level.targets.forEach((target) => {
    const targetElement = document.querySelector(`.target[data-value='${target.value}']`);
    const node = targetElement.querySelector(".node");

    if (!node || node.getAttribute("data-value") !== `${target.value}`) {
      isCorrect = false;
    }
  });

  if (isCorrect) {
    mess.innerText = "Correct! Moving to the next level...";
    mess.style.color = "green";

    // Move to the next level or end the game
    if (currentLevel < levels.length - 1) {
      currentLevel++;
      setTimeout(() => {
        loadLevel(currentLevel);
        mess.innerText = "";
      }, 1500);
    } else {
      mess.innerText = "Congratulations! You've completed all levels!";
    }
  } else {
    mess.innerText = "Incorrect! Try again.";
    mess.style.color = "red";
  }
});



// Load the first level
loadLevel(currentLevel);
})

      
    };

    const initializePuzzle = () => {
      const slidingpuzzelcontainer = document.getElementById("slidingpuzzelcontainer");
      const winPopup = document.getElementById("winPopup");
      const nextLevelButton = document.getElementById("nextLevelButton");
      const levelDisplay = document.getElementById("level");
  
      let gridSize = 3; // Start with a 3x3 grid
      let currentLevel = 1;
      let tiles = [];
      let emptyIndex;
  
      // Generate the puzzle tiles
      function generatePuzzle(gridSize) {
          const tiles = [];
          for (let i = 1; i < gridSize * gridSize; i++) {
              tiles.push(i);
          }
          tiles.push(null); // Add an empty space
          return tiles;
      }
  
      // Shuffle the tiles
      function shuffleTiles(tiles) {
          do {
              for (let i = tiles.length - 1; i > 0; i--) {
                  const j = Math.floor(Math.random() * (i + 1));
                  [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
              }
          } while (checkWinCondition(tiles)); // Ensure the shuffled tiles are not already solved
          return tiles;
      }
  
      // Render the puzzle grid
      function renderPuzzle(tiles, gridSize) {
          slidingpuzzelcontainer.innerHTML = "";
          slidingpuzzelcontainer.style.gridTemplateColumns = `repeat(${gridSize}, 100px)`;
          slidingpuzzelcontainer.style.gridTemplateRows = `repeat(${gridSize}, 100px)`;
  
          tiles.forEach((tile, index) => {
              const tileElement = document.createElement("div");
              tileElement.classList.add("tile");
              if (tile === null) {
                  tileElement.classList.add("empty");
              } else {
                  tileElement.textContent = tile;
                  tileElement.dataset.index = index;
              }
              slidingpuzzelcontainer.appendChild(tileElement);
  
              // Add click event to each tile
              tileElement.addEventListener("click", () => {
                  handleTileClick(index);
              });
          });
      }
  
      // Check if the move is valid
      function canMove(tileIndex, emptyIndex, gridSize) {
          const rowSize = gridSize;
          const tileRow = Math.floor(tileIndex / rowSize);
          const emptyRow = Math.floor(emptyIndex / rowSize);
  
          return (
              (tileIndex === emptyIndex - 1 && tileRow === emptyRow) || // Left
              (tileIndex === emptyIndex + 1 && tileRow === emptyRow) || // Right
              tileIndex === emptyIndex - rowSize || // Up
              tileIndex === emptyIndex + rowSize // Down
          );
      }
  
      // Handle tile click
      function handleTileClick(tileIndex) {
          if (canMove(tileIndex, emptyIndex, gridSize)) {
              // Swap tiles
              [tiles[tileIndex], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[tileIndex]];
  
              // Update emptyIndex
              emptyIndex = tileIndex;
  
              // Re-render the puzzle
              renderPuzzle(tiles, gridSize);
  
              // Check win condition
              if (checkWinCondition(tiles)) {
                  winPopup.style.display = "flex";
              }
          }
      }
  
      // Check if the puzzle is solved
      function checkWinCondition(tiles) {
          for (let i = 0; i < tiles.length - 1; i++) {
              if (tiles[i] !== i + 1) return false;
          }
          return true;
      }
  
      // Initialize the puzzle
      function initializePuzzle() {
          tiles = generatePuzzle(gridSize);
          tiles = shuffleTiles(tiles);
          emptyIndex = tiles.indexOf(null);
          renderPuzzle(tiles, gridSize);
      }
  
      // Move to the next level
      nextLevelButton.addEventListener("click", () => {
          winPopup.style.display = "none";
          currentLevel++;
          gridSize++;
          levelDisplay.textContent = currentLevel;
          initializePuzzle();
      });
  
      initializePuzzle();
  };
});
