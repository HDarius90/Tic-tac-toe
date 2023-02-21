(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const ticTacToeAiEngine = require('tic-tac-toe-ai-engine');


window.addEventListener("load", (gameState) => {

    //selecting elements
    const toogler = document.querySelector('#switch');
    const symbolX = document.querySelector('#symbol-X');
    const symbolO = document.querySelector('#symbol-O');
    const instruct = document.querySelector('#instruct');
    const difficulty = document.querySelector('#difficulty');
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext("2d");


    let isItMyTurn = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    let myChar = "X";

    //creating the canvas and the grid
    const clickableMapSide = window.innerHeight * 0.7 - 150;
    canvas.height = clickableMapSide;
    canvas.width = clickableMapSide;
    ctx.strokeStyle = '#0DA192';
    ctx.lineWidth = 15;
    drawHorizontalLine();
    drawVerticalLine();

    function drawHorizontalLine() {
        ctx.beginPath();
        ctx.moveTo(clickableMapSide / 3, 20);
        ctx.lineTo(clickableMapSide / 3, clickableMapSide - 20);
        ctx.moveTo(clickableMapSide / 3 * 2, 20);
        ctx.lineTo(clickableMapSide / 3 * 2, clickableMapSide - 20);
        ctx.closePath();
        ctx.stroke();
    }

    function drawVerticalLine() {
        ctx.beginPath();
        ctx.moveTo(20, clickableMapSide / 3);
        ctx.lineTo(clickableMapSide - 20, clickableMapSide / 3);
        ctx.moveTo(20, clickableMapSide / 3 * 2);
        ctx.lineTo(clickableMapSide - 20, clickableMapSide / 3 * 2);
        ctx.closePath();
        ctx.stroke();
    }

    function drawX(clickIndex, x, y) {
        ctx.strokeStyle = '#545454';
        ctx.beginPath();
        ctx.moveTo(x + clickableMapSide / 17.575, y + clickableMapSide / 17.575);
        ctx.lineTo(x + clickableMapSide / 3.7217, y + clickableMapSide / 3.7217);
        ctx.moveTo(x + clickableMapSide / 3.7217, y + clickableMapSide / 17.575);
        ctx.lineTo(x + clickableMapSide / 17.575, y + clickableMapSide / 3.7217);
        ctx.stroke();
        ctx.closePath();
        gameState[clickIndex] = 'X';
        if (toogler.checked) {
            isItMyTurn = true;
        } else {
            isItMyTurn = false;
        }
    }

    function drawO(clickIndex, x, y) {
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.arc(x + clickableMapSide / 6, y + clickableMapSide / 6, clickableMapSide / 10, 0, 2 * Math.PI);
        ctx.stroke();
        gameState[clickIndex] = 'O';
        if (!toogler.checked) {
            isItMyTurn = true;
        } else {
            isItMyTurn = false;
        }
    }

    function transformIndexToCoordinate(clickIndex) {
        switch (clickIndex) {
            case (0):
                return [0, 0];
            case (1):
                return [clickableMapSide / 3, 0];
            case (2):
                return [clickableMapSide / 3 * 2, 0];
            case (3):
                return [0, clickableMapSide / 3];
            case (4):
                return [clickableMapSide / 3, clickableMapSide / 3];
            case (5):
                return [clickableMapSide / 3 * 2, clickableMapSide / 3];
            case (6):
                return [0, clickableMapSide / 3 * 2];
            case (7):
                return [clickableMapSide / 3, clickableMapSide / 3 * 2];
            case (8):
                return [clickableMapSide / 3 * 2, clickableMapSide / 3 * 2];
        }
    }

    function clickHandler(canvas, event) {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        switch (true) {
            case (x > 0 && x < clickableMapSide / 3 && y > 0 && y < clickableMapSide / 3):
                return 0;
            case (x > clickableMapSide / 3 && x < clickableMapSide / 3 * 2 && y > 0 && y < clickableMapSide / 3):
                return 1;
            case (x > clickableMapSide / 3 * 2 && x < clickableMapSide && y > 0 && y < clickableMapSide / 3):
                return 2;
            case (x > 0 && x < clickableMapSide / 3 && y > clickableMapSide / 3 && y < clickableMapSide / 3 * 2):
                return 3;
            case (x > clickableMapSide / 3 && x < clickableMapSide / 3 * 2 && y > clickableMapSide / 3 && y < clickableMapSide / 3 * 2):
                return 4;
            case (x > clickableMapSide / 3 * 2 && x < clickableMapSide && y > clickableMapSide / 3 && y < clickableMapSide / 3 * 2):
                return 5;
            case (x > 0 && x < clickableMapSide / 3 && y > clickableMapSide / 3 * 2 && y < clickableMapSide):
                return 6;
            case (x > clickableMapSide / 3 && x < clickableMapSide / 3 * 2 && y > clickableMapSide / 3 * 2 && y < clickableMapSide):
                return 7;
            case (x > clickableMapSide / 3 * 2 && x < clickableMapSide && y > clickableMapSide / 3 * 2 && y < clickableMapSide):
                return 8;
        }
    }

    function finishGame(nextMoove, char) {
        console.log(`nextMoove.winner in finishGame: ${nextMoove.winner}`);
        if (nextMoove.winner && nextMoove.depth < 2) {
            canvas.removeEventListener('click', gameStarter);
            if ((nextMoove.winner === char)) {
                document.getElementById("result").innerText = "winner";
            } else if (nextMoove.winner !== char) {
                document.getElementById("result").innerText = "looser";
            } else {
                document.getElementById("result").innerText = "looser";
            }
        }
    }

    function trigerCPUMoove() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let nextMoove = cpuMoove();
                resolve(nextMoove);
                reject((err) => {
                    return err;
                });
            }, 1000);
        })
    }

    function playerMoove(clickIndex) {

        return new Promise((resolve, reject) => {

            if (gameState[clickIndex] === '') {
                let coordinates = transformIndexToCoordinate(clickIndex);
                if (toogler.checked === false) {
                    drawX(clickIndex, ...coordinates);
                } else {
                    drawO(clickIndex, ...coordinates);
                }
            }

            resolve();
            reject((err) => {
                return err;
            });
        })

    }

    function cpuMoove() {
        if (isThereSpace(gameState)) {
            if (difficulty.value === 'easy') {
                if (Math.random() < 0.5) {
                    let nextMoove = ticTacToeAiEngine.computeMove(gameState);
                    makeNextMoove(nextMoove);
                    return nextMoove;
                } else {
                    if (toogler.checked) {
                        let nextMoove = getRandomMoove(gameState, 'O');
                        makeNextMoove(nextMoove);
                        return nextMoove;
                    } else {
                        let nextMoove = getRandomMoove(gameState, 'X');
                        makeNextMoove(nextMoove);
                        return nextMoove;
                    }
                }
            }
        }



    }

    function getRandomMoove(gameState, char) {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * (gameState.length + 1));
        } while (gameState[randomIndex] !== '');

        let nextMoove = {
            winner: '',
            depth: 1,
            nextBestGameState: gameState.map((x) => x),
        }

        let result = checkProgress(convertToMatrix(gameState), char);
        console.log(`checkProgress result in randommoove: ${result}`);
        if (result[0] && result[1]) {
            nextMoove.winner = char;
        }

        nextMoove.nextBestGameState[randomIndex] = char;

        console.log('mextMoove in getRandomMoove');
        console.log(nextMoove);
        return nextMoove;
    }

    function isThereSpace(gameState) {
        let space = true;
        for (const char of gameState) {
            if (char === '') {
                return space;
            }
        }
        space = false;
        return space;
    }

    function convertToMatrix(gameState) {
        let stateInMatrix = [];
        for (let z = 0; z < 9; z += 3) {
            stateInMatrix.push(gameState.slice(0 + z, 3 + z));
        }
        return stateInMatrix;
    }

    function checkProgress(gameMatrix, char) {
        console.log(`matrix a checkprogressben:`);
        console.log(gameMatrix);
        let isItOver = false;
        let didIWin = false;
        //check rows
        for (const row of gameMatrix) {
            if (row[0] === row[1] && row[1] === row[2] && row[0]) {
                isItOver = true;
                if (row[0] === char) {
                    didIWin = true;
                    return [isItOver, didIWin];
                }
                return [isItOver, didIWin];
            }
        }
        //check cols
        for (let i = 0; i < 3; i++) {
            if (gameMatrix[0][i] === gameMatrix[1][i] && gameMatrix[1][i] === gameMatrix[2][i] && gameMatrix[0][i]) {
                isItOver = true;
                if (gameMatrix[0][i] === char) {
                    didIWin = true;
                    return [isItOver, didIWin];
                }
                return [isItOver, didIWin];
            }
        }
        //check crosses
        if (((gameMatrix[0][0] === gameMatrix[1][1] && gameMatrix[1][1] === gameMatrix[2][2]) || (gameMatrix[0][2] === gameMatrix[1][1] && gameMatrix[1][1] === gameMatrix[2][0])) && gameMatrix[1][1]) {
            isItOver = true;
            if (gameMatrix[1][1] === char) {
                didIWin = true;
                return [isItOver, didIWin];
            }
            return [isItOver, didIWin];
        }
        return [isItOver, didIWin];
    }

    function makeNextMoove(nextMoove) {

        if (nextMoove.depth === 0) {
            return nextMoove;
        }

        let indexOfNewMoove;
        for (let i = 0; i < 9; i++) {
            if (gameState[i] !== nextMoove.nextBestGameState[i]) {
                indexOfNewMoove = i;
            }
        }

        let coordinates = transformIndexToCoordinate(indexOfNewMoove);

        if (toogler.checked === true) {
            drawX(indexOfNewMoove, ...coordinates);
        } else {
            drawO(indexOfNewMoove, ...coordinates);
        }

    }

    async function gameFlow(canvas, event) {
        if (!difficulty.value) {
            difficulty[1].selected = true;
        }
        if (isItMyTurn) {
            let clickIndex = clickHandler(canvas, event);
            playerMoove(clickIndex);
            let nextMoove = await trigerCPUMoove();
            await finishGame(nextMoove, myChar);
        } else {
            let nextMoove = await trigerCPUMoove();
            let clickIndex = clickHandler(canvas, event);
            playerMoove(clickIndex);
            await finishGame(nextMoove, myChar);
        }
    }


    //event handler functions

    const changeHandler = e => {
        symbolO.classList.toggle('selected');
        symbolX.classList.toggle('selected');
        toogler.removeEventListener('change', changeHandler);
        toogler.disabled = true;
        instruct.style.color = '#14BDAC';
        isItMyTurn = false;
        myChar = "O";
        gameFlow(canvas, e);
    }

    const gameStarter = e => {
        toogler.removeEventListener('change', changeHandler);
        toogler.disabled = true;
        instruct.style.color = '#14BDAC';
        gameFlow(canvas, e);
    }

    canvas.addEventListener('click', gameStarter);
    toogler.addEventListener('change', changeHandler);
});
},{"tic-tac-toe-ai-engine":2}],2:[function(require,module,exports){
"use strict";
const cache = {};

// Insert a valid game state and get an evaluation of the game state.
//
// Input: ['X', 'O', '', '', '', '', '', '', '']
// Output:
// {
//   winner: 'X',
//   depth: 5,
//   nextBestGameState: ['X', 'O', '', 'X', '', '', '', '', '']
// }
//
// ['X', 'O', '', '', '', '', '', '', ''] corresponds to
//  X | O |
//  ---------
//    |   |
//  ---------
//    |  |
//
// Winner: wins the game with perfect play from current position.
// Depth: shows how many moves until the game is finsihed with perfect play
// on both sides.
// NextBestGameState: Gives the next best move for current player.
function computeMove(gameState) {
  if (cache[gameState.toString()]) {
    return cache[gameState.toString()];
  }
  let whoWon = determineWinner(gameState);
  if (whoWon === 'X') {
    return {winner: whoWon, depth: 0, nextBestGameState: gameState};
  } else if (whoWon === 'O') {
    return {winner: whoWon, depth: 0, nextBestGameState: gameState};
  } else {
    let possibleMoves = computePossibleMoves(gameState);
    let bestMove;
    if (possibleMoves.length == 0) {
      bestMove = {winner: '', depth: 0, nextBestGameState: gameState};
    } else {
      bestMove = possibleMoves.map(evaluateGameState).reduce(getBestMove);
    }
    cache[gameState.toString()] = bestMove;
    return bestMove;
  }
}

function evaluateGameState(gameState) {
  let evaluatedPosition = computeMove(gameState);
  return {
    winner: evaluatedPosition.winner,
    depth: evaluatedPosition.depth + 1,
    nextBestGameState: gameState,
  };
}

function getBestMove(bestMoveFound, possibleMove) {
  return numericValue(possibleMove) > numericValue(bestMoveFound)
      ? possibleMove : bestMoveFound;
}

function numericValue(evaluatedState) {
  let currentPlayer = determineTurn(evaluatedState.nextBestGameState);
  let otherPlayer = currentPlayer === 'X' ? 'O' : 'X';
  if (evaluatedState.winner == otherPlayer) {
    return 20 - evaluatedState.depth;
  } else if (evaluatedState.winner == currentPlayer) {
    return -10 + evaluatedState.depth;
  } else {
    return evaluatedState.depth;
  }
}

function computePossibleMoves(gameState) {
  let player = determineTurn(gameState);
  let indexValues = Array.from(Array(gameState.length).keys());
  let emptyLocations = indexValues.filter(x => gameState[x] === '');
  return emptyLocations.map(x => copyAssignReturn(gameState, x, player));
}

function copyAssignReturn(inputArray, location, value) {
  let returnArray = inputArray.slice();
  returnArray[location] = value;
  return returnArray;
}

function determineTurn(gameState) {
  let numberOfXs = countOccurenceOfElement(gameState, 'X');
  let numberOfOs = countOccurenceOfElement(gameState, 'O');

  return numberOfOs === numberOfXs ? 'X' : 'O';
}

function countOccurenceOfElement(elements, element) {
  return elements.filter(square => square === element).length
}

function determineWinner(gameState) {
  // Check vertical wins
  for (let i = 0;i < 3;i++) {
    if (gameState[i] === gameState[i + 3]
      && gameState[i + 3] === gameState[i + 6]
      && gameState[i + 6] !== '') {
      return gameState[i];
    }
  }

  // Check horizontal wins
  for (let i = 0;i < 9;i += 3) {
    if (gameState[i] === gameState[i + 1]
      && gameState[i + 1] === gameState[i + 2]
      && gameState[i + 2] !== '') {
      return gameState[i];
    }
  }

  // Check cross wins
  if (gameState[0] === gameState[4]
    && gameState[4] === gameState[8]
    && gameState[8] !== '') {
    return gameState[0];
  }
  if (gameState[2] === gameState[4]
    && gameState[4] === gameState[6]
    && gameState[6] !== '') {
    return gameState[2];
  }
}

module.exports = {
   determineTurn,
   computePossibleMoves,
   determineWinner,
   computeMove,
}

},{}]},{},[1]);
