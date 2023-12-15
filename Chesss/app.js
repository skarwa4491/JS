const gameBoard = document.querySelector('#game-board');
const playerDisplay = document.querySelector('#player');
const infoDisplay = document.querySelector('#info-display');
const width = 8;
let playerGo = 'black';

playerDisplay.textContent = 'black';

const startPieces = [
    rook, knight, bishop, queen, king, bishop, knight, rook,
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    rook, knight, bishop, queen, king, bishop, knight, rook,
];

// create chess board
function createBoard() {
    startPieces.forEach((startPiece, i) => {
        const square = document.createElement('div');
        square.classList.add('square');
        square.innerHTML = startPiece;
        square.firstChild?.setAttribute('draggable', 'true'); //set draggable if piece is there
        square.setAttribute('square-id', i);
        const row = Math.floor((63 - i) / 8) + 1;
        if (row % 2 === 0) {
            square.classList.add(i % 2 === 0 ? 'beige' : 'green');
        }
        else {
            square.classList.add(i % 2 === 0 ? 'green' : 'beige');
        }
        if (i <= 15) {
            square.firstChild.firstChild.classList.add('black');
        }
        if (i >= 48) {
            square.firstChild.firstChild.classList.add('white');
        }
        gameBoard.appendChild(square);
    });
}
createBoard();

const allSquares = document.querySelectorAll('.square');

allSquares.forEach((square) => {
    square.addEventListener('dragstart', dragStart);
    square.addEventListener('dragover', dragOver);
    square.addEventListener('drop', dragDrop);
});

let startPositionId;
let draggedElement;

function dragStart(e) {
    startPositionId = e.target.parentNode.getAttribute('square-id');
    draggedElement = e.target;
}

function dragOver(e) {
    e.preventDefault();
}

function dragDrop(e) {
    e.stopPropagation();
    const correctGo = draggedElement.firstChild.classList.contains(playerGo);
    const opponentGo = playerGo === 'white' ? 'black' : 'white';
    const taken = e.target.classList.contains('piece');
    const valid = checkIfValid(e.target);
    const takenByOpponenet = e.target.firstChild?.classList.contains(opponentGo);

    if (correctGo) {
        if (takenByOpponenet && valid) {
            e.target.parentNode.appendChild(draggedElement); // this is only if piece exist on sqaure
            e.target.remove();
            checkWinCondition();
            changePlayer();
            return;
        }
        if (
            taken && !takenByOpponenet
            ||
            !valid
        ) {
            infoDisplay.textContent = 'Invalid move';
            setTimeout(() => {
                infoDisplay.textContent = '';
            }, 2000);
            return;
        }

        if (valid) {
            e.target.appendChild(draggedElement);
            checkWinCondition();
            changePlayer();
            return; // this is only sqaure is blank
        }
    }
}

function checkIfValid(target) {
    const targetId = Number(target.getAttribute('square-id')) || Number(target.parentNode.getAttribute('square-id'));
    const startId = Number(startPositionId);
    const piece = draggedElement.id;
    console.log(`targetId`, targetId);
    console.log(`startId`, startId);
    console.log(piece);

    switch (piece) {
        case 'pawn':
            const starterRow = [8, 9, 10, 11, 12, 13, 14, 15];
            if (
                (
                    starterRow.includes(startId)
                    &&
                    startId + (width * 2) === targetId
                ) // two moves at start
                ||
                (startId + width === targetId) // one move at a start
                ||
                (startId + width + 1 === targetId && document.querySelector(`[square-id='${startId + width + 1}']`).firstChild) // kill opponenet if present
                ||
                (startId + width - 1 === targetId && document.querySelector(`[square-id='${startId + width - 1}']`).firstChild) // kill opponenet if present
            ) {
                return true;
            }
            break;
        case 'rook':
            if (
                // move forward
                startId + width === targetId ||
                startId + width * 2 === targetId && !document.querySelector(`[square-id='${startId + width}']`).firstChild ||
                startId + width * 3 === targetId && !document.querySelector(`[square-id='${startId + width}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 2}']`).firstChild ||
                startId + width * 4 === targetId && !document.querySelector(`[square-id='${startId + width}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 2}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 3}']`).firstChild ||
                startId + width * 5 === targetId && !document.querySelector(`[square-id='${startId + width}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 2}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 3}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 4}']`).firstChild ||
                startId + width * 6 === targetId && !document.querySelector(`[square-id='${startId + width}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 2}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 3}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 4}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 5}']`).firstChild ||
                startId + width * 7 === targetId && !document.querySelector(`[square-id='${startId + width}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 2}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 3}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 4}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 5}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 6}']`).firstChild ||

                // move backward
                startId - width === targetId ||
                startId - width * 2 === targetId && !document.querySelector(`[square-id='${startId - width}']`).firstChild ||
                startId - width * 3 === targetId && !document.querySelector(`[square-id='${startId - width}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 2}']`).firstChild ||
                startId - width * 4 === targetId && !document.querySelector(`[square-id='${startId - width}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 2}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 3}']`).firstChild ||
                startId - width * 5 === targetId && !document.querySelector(`[square-id='${startId - width}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 2}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 3}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 4}']`).firstChild ||
                startId - width * 6 === targetId && !document.querySelector(`[square-id='${startId - width}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 2}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 3}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 4}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 5}']`).firstChild ||
                startId - width * 7 === targetId && !document.querySelector(`[square-id='${startId - width}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 2}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 3}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 4}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 5}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 6}']`).firstChild ||

                // move side hotizontally
                startId - 1 === targetId ||
                startId - 2 === targetId && !document.querySelector(`[square-id='${startId - 1}']`).firstChild ||
                startId - 3 === targetId && !document.querySelector(`[square-id='${startId - 1}']`).firstChild && !document.querySelector(`[square-id='${startId - 2}']`).firstChild ||
                startId - 4 === targetId && !document.querySelector(`[square-id='${startId - 1}']`).firstChild && !document.querySelector(`[square-id='${startId - 2}']`).firstChild && !document.querySelector(`[square-id='${startId - 3}']`).firstChild ||
                startId - 6 === targetId && !document.querySelector(`[square-id='${startId - 1}']`).firstChild && !document.querySelector(`[square-id='${startId - 2}']`).firstChild && !document.querySelector(`[square-id='${startId - 3}']`).firstChild && !document.querySelector(`[square-id='${startId - 4}']`).firstChild ||
                startId - 7 === targetId && !document.querySelector(`[square-id='${startId - 1}']`).firstChild && !document.querySelector(`[square-id='${startId - 2}']`).firstChild && !document.querySelector(`[square-id='${startId - 3}']`).firstChild && !document.querySelector(`[square-id='${startId - 4}']`).firstChild && !document.querySelector(`[square-id='${startId - 5}']`).firstChild ||
                startId - 8 === targetId && !document.querySelector(`[square-id='${startId - 1}']`).firstChild && !document.querySelector(`[square-id='${startId - 2}']`).firstChild && !document.querySelector(`[square-id='${startId - 3}']`).firstChild && !document.querySelector(`[square-id='${startId - 4}']`).firstChild && !document.querySelector(`[square-id='${startId - 5}']`).firstChild && !document.querySelector(`[square-id='${startId - 6}']`).firstChild ||

                // move side hotizontally
                startId + 1 === targetId ||
                startId + 2 === targetId && !document.querySelector(`[square+id='${startId + 1}']`).firstChild ||
                startId + 3 === targetId && !document.querySelector(`[square+id='${startId + 1}']`).firstChild && !document.querySelector(`[square+id='${startId + 2}']`).firstChild ||
                startId + 4 === targetId && !document.querySelector(`[square+id='${startId + 1}']`).firstChild && !document.querySelector(`[square+id='${startId + 2}']`).firstChild && !document.querySelector(`[square+id='${startId + 3}']`).firstChild ||
                startId + 6 === targetId && !document.querySelector(`[square+id='${startId + 1}']`).firstChild && !document.querySelector(`[square+id='${startId + 2}']`).firstChild && !document.querySelector(`[square+id='${startId + 3}']`).firstChild && !document.querySelector(`[square+id='${startId + 4}']`).firstChild ||
                startId + 7 === targetId && !document.querySelector(`[square+id='${startId + 1}']`).firstChild && !document.querySelector(`[square+id='${startId + 2}']`).firstChild && !document.querySelector(`[square+id='${startId + 3}']`).firstChild && !document.querySelector(`[square+id='${startId + 4}']`).firstChild && !document.querySelector(`[square+id='${startId + 5}']`).firstChild ||
                startId + 8 === targetId && !document.querySelector(`[square+id='${startId + 1}']`).firstChild && !document.querySelector(`[square+id='${startId + 2}']`).firstChild && !document.querySelector(`[square+id='${startId + 3}']`).firstChild && !document.querySelector(`[square+id='${startId + 4}']`).firstChild && !document.querySelector(`[square+id='${startId + 5}']`).firstChild && !document.querySelector(`[square+id='${startId + 6}']`).firstChild
            ) {
                return true;
            }
            break;
        case 'queen':
            if (
                // digonal forward one side
                startId + width + 1 === targetId ||
                startId + width * 2 + 2 === targetId && !document.querySelector(`[square-id='${startId + width + 1}']`).firstChild ||
                startId + width * 3 + 3 === targetId && !document.querySelector(`[square-id='${startId + width + 1}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 2 + 2}']`).firstChild ||
                startId + width * 4 + 4 === targetId && !document.querySelector(`[square-id='${startId + width + 1}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 2 + 2}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 3 + 3}']`).firstChild ||
                startId + width * 5 + 5 === targetId && !document.querySelector(`[square-id='${startId + width + 1}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 2 + 2}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 3 + 3}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 4 + 4}']`).firstChild ||
                startId + width * 6 + 6 === targetId && !document.querySelector(`[square-id='${startId + width + 1}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 2 + 2}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 3 + 3}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 4 + 4}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 5 + 5}']`).firstChild ||
                startId + width * 7 + 7 === targetId && !document.querySelector(`[square-id='${startId + width + 1}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 2 + 2}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 3 + 3}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 4 + 4}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 5 + 5}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 6 + 6}']`).firstChild ||

                // digonal backward one side
                startId - width - 1 === targetId ||
                startId - width * 2 - 2 === targetId && !document.querySelector(`[square-id='${startId - width - 1}']`).firstChild ||
                startId - width * 3 - 3 === targetId && !document.querySelector(`[square-id='${startId - width - 1}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 2 - 2}']`).firstChild ||
                startId - width * 4 - 4 === targetId && !document.querySelector(`[square-id='${startId - width - 1}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 2 - 2}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 3 - 3}']`).firstChild ||
                startId - width * 5 - 5 === targetId && !document.querySelector(`[square-id='${startId - width - 1}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 2 - 2}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 3 - 3}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 4 - 4}']`).firstChild ||
                startId - width * 6 - 6 === targetId && !document.querySelector(`[square-id='${startId - width - 1}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 2 - 2}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 3 - 3}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 4 - 4}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 5 - 5}']`).firstChild ||
                startId - width * 7 - 7 === targetId && !document.querySelector(`[square-id='${startId - width - 1}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 2 - 2}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 3 - 3}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 4 - 4}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 5 - 5}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 6 - 6}']`).firstChild ||

                // digonal backward
                startId - width + 1 === targetId ||
                startId - width * 2 + 2 === targetId && !document.querySelector(`[square-id='${startId - width + 1}']`).firstChild ||
                startId - width * 3 + 3 === targetId && !document.querySelector(`[square-id='${startId - width + 1}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 2 + 2}']`).firstChild ||
                startId - width * 4 + 4 === targetId && !document.querySelector(`[square-id='${startId - width + 1}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 2 + 2}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 3 + 3}']`).firstChild ||
                startId - width * 5 + 5 === targetId && !document.querySelector(`[square-id='${startId - width + 1}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 2 + 2}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 3 + 3}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 4 + 4}']`).firstChild ||
                startId - width * 6 + 6 === targetId && !document.querySelector(`[square-id='${startId - width + 1}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 2 + 2}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 3 + 3}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 4 + 4}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 5 + 5}']`).firstChild ||
                startId - width * 7 + 7 === targetId && !document.querySelector(`[square-id='${startId - width + 1}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 2 + 2}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 3 + 3}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 4 + 4}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 5 + 5}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 6 + 6}']`).firstChild ||

                // digonal backward
                startId + width - 1 === targetId ||
                startId + width * 2 - 2 === targetId && !document.querySelector(`[square-id='${startId + width - 1}']`).firstChild ||
                startId + width * 3 - 3 === targetId && !document.querySelector(`[square-id='${startId + width - 1}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 2 - 2}']`).firstChild ||
                startId + width * 4 - 4 === targetId && !document.querySelector(`[square-id='${startId + width - 1}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 2 - 2}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 3 - 3}']`).firstChild ||
                startId + width * 5 - 5 === targetId && !document.querySelector(`[square-id='${startId + width - 1}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 2 - 2}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 3 - 3}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 4 - 4}']`).firstChild ||
                startId + width * 6 - 6 === targetId && !document.querySelector(`[square-id='${startId + width - 1}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 2 - 2}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 3 - 3}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 4 - 4}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 5 - 5}']`).firstChild ||
                startId + width * 7 - 7 === targetId && !document.querySelector(`[square-id='${startId + width - 1}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 2 - 2}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 3 - 3}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 4 - 4}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 5 - 5}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 6 + 6}']`).firstChild ||

                // moved forward
                startId + width === targetId ||
                startId + width * 2 === targetId && !document.querySelector(`[square-id='${startId + width}']`).firstChild ||
                startId + width * 3 === targetId && !document.querySelector(`[square-id='${startId + width}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 2}']`).firstChild ||
                startId + width * 4 === targetId && !document.querySelector(`[square-id='${startId + width}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 2}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 3}']`).firstChild ||
                startId + width * 5 === targetId && !document.querySelector(`[square-id='${startId + width}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 2}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 3}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 4}']`).firstChild ||
                startId + width * 6 === targetId && !document.querySelector(`[square-id='${startId + width}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 2}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 3}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 4}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 5}']`).firstChild ||
                startId + width * 7 === targetId && !document.querySelector(`[square-id='${startId + width}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 2}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 3}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 4}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 5}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 6}']`).firstChild ||

                // move backward
                startId - width === targetId ||
                startId - width * 2 === targetId && !document.querySelector(`[square-id='${startId - width}']`).firstChild ||
                startId - width * 3 === targetId && !document.querySelector(`[square-id='${startId - width}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 2}']`).firstChild ||
                startId - width * 4 === targetId && !document.querySelector(`[square-id='${startId - width}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 2}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 3}']`).firstChild ||
                startId - width * 5 === targetId && !document.querySelector(`[square-id='${startId - width}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 2}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 3}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 4}']`).firstChild ||
                startId - width * 6 === targetId && !document.querySelector(`[square-id='${startId - width}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 2}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 3}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 4}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 5}']`).firstChild ||
                startId - width * 7 === targetId && !document.querySelector(`[square-id='${startId - width}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 2}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 3}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 4}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 5}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 6}']`).firstChild ||

                // move side hotizontally
                startId - 1 === targetId ||
                startId - 2 === targetId && !document.querySelector(`[square-id='${startId - 1}']`).firstChild ||
                startId - 3 === targetId && !document.querySelector(`[square-id='${startId - 1}']`).firstChild && !document.querySelector(`[square-id='${startId - 2}']`).firstChild ||
                startId - 4 === targetId && !document.querySelector(`[square-id='${startId - 1}']`).firstChild && !document.querySelector(`[square-id='${startId - 2}']`).firstChild && !document.querySelector(`[square-id='${startId - 3}']`).firstChild ||
                startId - 6 === targetId && !document.querySelector(`[square-id='${startId - 1}']`).firstChild && !document.querySelector(`[square-id='${startId - 2}']`).firstChild && !document.querySelector(`[square-id='${startId - 3}']`).firstChild && !document.querySelector(`[square-id='${startId - 4}']`).firstChild ||
                startId - 7 === targetId && !document.querySelector(`[square-id='${startId - 1}']`).firstChild && !document.querySelector(`[square-id='${startId - 2}']`).firstChild && !document.querySelector(`[square-id='${startId - 3}']`).firstChild && !document.querySelector(`[square-id='${startId - 4}']`).firstChild && !document.querySelector(`[square-id='${startId - 5}']`).firstChild ||
                startId - 8 === targetId && !document.querySelector(`[square-id='${startId - 1}']`).firstChild && !document.querySelector(`[square-id='${startId - 2}']`).firstChild && !document.querySelector(`[square-id='${startId - 3}']`).firstChild && !document.querySelector(`[square-id='${startId - 4}']`).firstChild && !document.querySelector(`[square-id='${startId - 5}']`).firstChild && !document.querySelector(`[square-id='${startId - 6}']`).firstChild ||

                // move side hotizontally
                startId + 1 === targetId ||
                startId + 2 === targetId && !document.querySelector(`[square+id='${startId + 1}']`).firstChild ||
                startId + 3 === targetId && !document.querySelector(`[square+id='${startId + 1}']`).firstChild && !document.querySelector(`[square+id='${startId + 2}']`).firstChild ||
                startId + 4 === targetId && !document.querySelector(`[square+id='${startId + 1}']`).firstChild && !document.querySelector(`[square+id='${startId + 2}']`).firstChild && !document.querySelector(`[square+id='${startId + 3}']`).firstChild ||
                startId + 6 === targetId && !document.querySelector(`[square+id='${startId + 1}']`).firstChild && !document.querySelector(`[square+id='${startId + 2}']`).firstChild && !document.querySelector(`[square+id='${startId + 3}']`).firstChild && !document.querySelector(`[square+id='${startId + 4}']`).firstChild ||
                startId + 7 === targetId && !document.querySelector(`[square+id='${startId + 1}']`).firstChild && !document.querySelector(`[square+id='${startId + 2}']`).firstChild && !document.querySelector(`[square+id='${startId + 3}']`).firstChild && !document.querySelector(`[square+id='${startId + 4}']`).firstChild && !document.querySelector(`[square+id='${startId + 5}']`).firstChild ||
                startId + 8 === targetId && !document.querySelector(`[square+id='${startId + 1}']`).firstChild && !document.querySelector(`[square+id='${startId + 2}']`).firstChild && !document.querySelector(`[square+id='${startId + 3}']`).firstChild && !document.querySelector(`[square+id='${startId + 4}']`).firstChild && !document.querySelector(`[square+id='${startId + 5}']`).firstChild && !document.querySelector(`[square+id='${startId + 6}']`).firstChild
            ) {
                return true;
            }
            break;
        case 'king':
            if (
                startId + width === targetId || // forward
                startId - width === targetId || // backward
                startId + width + 1 === targetId || // digonal forward
                startId + width - 1 === targetId || // digonal forward
                startId - width + 1 === targetId || // digonal backward
                startId - width - 1 === targetId || // digonal forward
                startId + 1 === targetId ||
                startId - 1 === targetId
            ) {
                return true;
            }
            break;
        case 'bishop':
            if (
                // digonal forward one side
                startId + width + 1 === targetId ||
                startId + width * 2 + 2 === targetId && !document.querySelector(`[square-id='${startId + width + 1}']`).firstChild ||
                startId + width * 3 + 3 === targetId && !document.querySelector(`[square-id='${startId + width + 1}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 2 + 2}']`).firstChild ||
                startId + width * 4 + 4 === targetId && !document.querySelector(`[square-id='${startId + width + 1}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 2 + 2}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 3 + 3}']`).firstChild ||
                startId + width * 5 + 5 === targetId && !document.querySelector(`[square-id='${startId + width + 1}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 2 + 2}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 3 + 3}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 4 + 4}']`).firstChild ||
                startId + width * 6 + 6 === targetId && !document.querySelector(`[square-id='${startId + width + 1}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 2 + 2}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 3 + 3}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 4 + 4}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 5 + 5}']`).firstChild ||
                startId + width * 7 + 7 === targetId && !document.querySelector(`[square-id='${startId + width + 1}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 2 + 2}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 3 + 3}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 4 + 4}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 5 + 5}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 6 + 6}']`).firstChild ||

                // digonal backward one side
                startId - width - 1 === targetId ||
                startId - width * 2 - 2 === targetId && !document.querySelector(`[square-id='${startId - width - 1}']`).firstChild ||
                startId - width * 3 - 3 === targetId && !document.querySelector(`[square-id='${startId - width - 1}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 2 - 2}']`).firstChild ||
                startId - width * 4 - 4 === targetId && !document.querySelector(`[square-id='${startId - width - 1}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 2 - 2}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 3 - 3}']`).firstChild ||
                startId - width * 5 - 5 === targetId && !document.querySelector(`[square-id='${startId - width - 1}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 2 - 2}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 3 - 3}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 4 - 4}']`).firstChild ||
                startId - width * 6 - 6 === targetId && !document.querySelector(`[square-id='${startId - width - 1}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 2 - 2}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 3 - 3}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 4 - 4}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 5 - 5}']`).firstChild ||
                startId - width * 7 - 7 === targetId && !document.querySelector(`[square-id='${startId - width - 1}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 2 - 2}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 3 - 3}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 4 - 4}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 5 - 5}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 6 - 6}']`).firstChild ||

                //
                startId - width + 1 === targetId ||
                startId - width * 2 + 2 === targetId && !document.querySelector(`[square-id='${startId - width + 1}']`).firstChild ||
                startId - width * 3 + 3 === targetId && !document.querySelector(`[square-id='${startId - width + 1}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 2 + 2}']`).firstChild ||
                startId - width * 4 + 4 === targetId && !document.querySelector(`[square-id='${startId - width + 1}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 2 + 2}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 3 + 3}']`).firstChild ||
                startId - width * 5 + 5 === targetId && !document.querySelector(`[square-id='${startId - width + 1}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 2 + 2}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 3 + 3}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 4 + 4}']`).firstChild ||
                startId - width * 6 + 6 === targetId && !document.querySelector(`[square-id='${startId - width + 1}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 2 + 2}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 3 + 3}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 4 + 4}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 5 + 5}']`).firstChild ||
                startId - width * 7 + 7 === targetId && !document.querySelector(`[square-id='${startId - width + 1}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 2 + 2}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 3 + 3}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 4 + 4}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 5 + 5}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 6 + 6}']`).firstChild ||
                //

                startId + width - 1 === targetId ||
                startId + width * 2 - 2 === targetId && !document.querySelector(`[square-id='${startId + width - 1}']`).firstChild ||
                startId + width * 3 - 3 === targetId && !document.querySelector(`[square-id='${startId + width - 1}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 2 - 2}']`).firstChild ||
                startId + width * 4 - 4 === targetId && !document.querySelector(`[square-id='${startId + width - 1}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 2 - 2}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 3 - 3}']`).firstChild ||
                startId + width * 5 - 5 === targetId && !document.querySelector(`[square-id='${startId + width - 1}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 2 - 2}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 3 - 3}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 4 - 4}']`).firstChild ||
                startId + width * 6 - 6 === targetId && !document.querySelector(`[square-id='${startId + width - 1}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 2 - 2}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 3 - 3}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 4 - 4}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 5 - 5}']`).firstChild ||
                startId + width * 7 - 7 === targetId && !document.querySelector(`[square-id='${startId + width - 1}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 2 - 2}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 3 - 3}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 4 - 4}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 5 - 5}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 6 + 6}']`).firstChild
            ) {
                return true;
            }
        case 'knight':
            if (
                startId + width * 2 - 1 === targetId ||
                startId + width * 2 + 1 === targetId ||
                startId - width * 2 - 1 === targetId ||
                startId - width * 2 + 1 === targetId ||
                startId + width - 2 === targetId ||
                startId + width + 2 === targetId ||
                startId - width - 2 === targetId ||
                startId - width + 2 === targetId
            ) {
                return true;
            }
            break;
    }


}

function checkWinCondition() {
    const kings = Array.from(document.querySelectorAll('#king'));
    if (!kings.some(king => king.firstChild.classList.contains('white'))) {
        infoDisplay.innerHTML = 'Black player wins';
        const allSquares = document.querySelectorAll('.square');
        allSquares.forEach(square => square.firstChild?.setAttribute('draggable', false));
    }

    if (!kings.some(king => king.firstChild.classList.contains('black'))) {
        infoDisplay.innerHTML = 'White player wins';
        const allSquares = document.querySelectorAll('.square');
        allSquares.forEach(square => square.firstChild?.setAttribute('draggable', false));
    }
}

// change player
function changePlayer() {
    if (playerGo === 'black') {
        reverseIds();
        playerGo = 'white';
        playerDisplay.textContent = playerGo;
    }
    else {
        revertIds();
        playerGo = 'black';
        playerDisplay.textContent = playerGo;
    }
}

function reverseIds() {
    const allSquare = document.querySelectorAll('.square');
    allSquare.forEach((square, i) => {
        square.setAttribute('square-id', (width * width - 1) - i);
    });
}

function revertIds() {
    const allSquare = document.querySelectorAll('.square');
    allSquare.forEach((square, i) => {
        square.setAttribute('square-id', i);
    });
}