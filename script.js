const cells = document.querySelectorAll('[data-cell]');
const restartButton = document.getElementById('restartButton');
const gameStatus = document.querySelector('.game-status');
let isXturn = true;

function handleClick(e) {
    const cell = e.target;
    if (cell.textContent === '') {
        const currentClass = isXturn ? 'X' : 'O';
        placeMark(cell, currentClass);
        if (checkWin(currentClass)) {
            endGame(currentClass);
        } else if (isDraw()) {
            endGame(null);
        } else {
            swapTurns();
            updateStatus();
        }
    }
}

function placeMark(cell, currentClass) {
    cell.textContent = currentClass;
}

function swapTurns() {
    isXturn = !isXturn;
}

function updateStatus() {
    gameStatus.textContent = `Player ${isXturn ? 'X' : 'O'}'s turn`;
}

function checkWin(currentClass) {
    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];

    return winCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentClass;
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.textContent === 'X' || cell.textContent === 'O';
    });
}

function endGame(winnerClass) {
    if (winnerClass === null) {
        gameStatus.textContent = "It's a Draw!";
    } else {
        gameStatus.textContent = `Player ${winnerClass} Wins!`;
    }
    cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

restartButton.addEventListener('click', () => {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleClick, { once: true });
    });
    isXturn = true;
    gameStatus.textContent = 'Player X starts';
});

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});

document.addEventListener('DOMContentLoaded', updateStatus);
