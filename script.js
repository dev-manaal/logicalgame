let currentPuzzleType = null;
let currentPuzzleIndex = 0;

const linkedListPuzzles = [
    { order: [1, 2, 3, 4, 5], start: [5, 3, 1, 4, 2], instruction: "Arrange Linked List in ascending order!" },
    { order: [5, 4, 3, 2, 1], start: [1, 3, 5, 4, 2], instruction: "Arrange Linked List in descending order!" }
];

const arrayPuzzles = [
    { order: [2, 4, 6, 8, 10], start: [10, 2, 4, 8, 6], instruction: "Arrange Array in ascending order!" },
    { order: [9, 7, 5, 3, 1], start: [1, 3, 7, 9, 5], instruction: "Arrange Array in descending order!" }
];

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("linkedlist-game-button").addEventListener("click", () => startGame("linkedlist"));
    document.getElementById("array-game-button").addEventListener("click", () => startGame("array"));
    document.getElementById("linkedlist-check-solution").addEventListener("click", () => checkSolution("linkedlist"));
    document.getElementById("array-check-solution").addEventListener("click", () => checkSolution("array"));
    document.getElementById("linkedlist-next-puzzle").addEventListener("click", () => nextPuzzle("linkedlist"));
    document.getElementById("array-next-puzzle").addEventListener("click", () => nextPuzzle("array"));
    document.getElementById("linkedlist-reset-button").addEventListener("click", () => resetPuzzle("linkedlist"));
    document.getElementById("array-reset-button").addEventListener("click", () => resetPuzzle("array"));
});

function startGame(type) {
    currentPuzzleType = type;
    currentPuzzleIndex = 0;

    document.getElementById("linkedlist-container").style.display = type === "linkedlist" ? "block" : "none";
    document.getElementById("array-container").style.display = type === "array" ? "block" : "none";

    loadPuzzle(currentPuzzleIndex);
}

function loadPuzzle(index) {
    const puzzle = currentPuzzleType === "linkedlist" ? linkedListPuzzles[index] : arrayPuzzles[index];
    const puzzleContainer = document.getElementById(`${currentPuzzleType}-puzzle`);
    document.getElementById(`${currentPuzzleType}-instructions`).innerText = puzzle.instruction;
    document.getElementById(`${currentPuzzleType}-status`).innerText = "";

    puzzleContainer.innerHTML = "";
    puzzle.start.forEach(num => {
        const node = document.createElement("div");
        node.className = "node";
        node.innerText = num;
        puzzleContainer.appendChild(node);
    });
}

function checkSolution(type) {
    const puzzle = type === "linkedlist" ? linkedListPuzzles[currentPuzzleIndex] : arrayPuzzles[currentPuzzleIndex];
    const puzzleContainer = document.getElementById(`${type}-puzzle`);
    const nodes = Array.from(puzzleContainer.children).map(node => parseInt(node.innerText));

    if (JSON.stringify(nodes) === JSON.stringify(puzzle.order)) {
        document.getElementById(`${type}-status`).innerText = "Correct!";
    } else {
        document.getElementById(`${type}-status`).innerText = "Try Again!";
    }
}

function nextPuzzle(type) {
    currentPuzzleIndex = (currentPuzzleIndex + 1) % (type === "linkedlist" ? linkedListPuzzles.length : arrayPuzzles.length);
    loadPuzzle(currentPuzzleIndex);
}

function resetPuzzle(type) {
    loadPuzzle(currentPuzzleIndex);
}
