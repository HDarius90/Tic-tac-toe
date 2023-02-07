window.addEventListener("load", (game) => {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext("2d");
    let isItMyTurn = true;
    game = [["", "", ""], ["", "", ""], ["", "", ""]];

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

    function drawX(rowIndex, colIndex, x, y,) {
        ctx.strokeStyle = '#545454';
        ctx.beginPath();
        ctx.moveTo(x + clickableMapSide / 17.575, y + clickableMapSide / 17.575);
        ctx.lineTo(x + clickableMapSide / 3.7217, y + clickableMapSide / 3.7217);
        ctx.moveTo(x + clickableMapSide / 3.7217, y + clickableMapSide / 17.575);
        ctx.lineTo(x + clickableMapSide / 17.575, y + clickableMapSide / 3.7217);
        ctx.stroke();
        ctx.closePath();
        game[rowIndex][colIndex] = 'X';
    }

    function drawO(x, y) {
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.arc(x + clickableMapSide / 6, y + clickableMapSide / 6, clickableMapSide / 10, 0, 2 * Math.PI);
        ctx.stroke();
    }

    function randomNumber() {
        return Math.floor((Math.random() * 3));
    }

    function transformIndexToCoordinate(indexOfRow, indexOfCCol) {
        switch (true) {
            case (indexOfRow === 0 && indexOfCCol === 0):
                return [0, 0];
            case (indexOfRow === 0 && indexOfCCol === 1):
                return [clickableMapSide / 3, 0];
            case (indexOfRow === 0 && indexOfCCol === 2):
                return [clickableMapSide / 3 * 2, 0];
            case (indexOfRow === 1 && indexOfCCol === 0):
                return [0, clickableMapSide / 3];
            case (indexOfRow === 1 && indexOfCCol === 1):
                return [clickableMapSide / 3, clickableMapSide / 3];
            case (indexOfRow === 1 && indexOfCCol === 2):
                return [clickableMapSide / 3 * 2, clickableMapSide / 3];
            case (indexOfRow === 2 && indexOfCCol === 0):
                return [0, clickableMapSide / 3 * 2];
            case (indexOfRow === 2 && indexOfCCol === 1):
                return [clickableMapSide / 3, clickableMapSide / 3 * 2];
            case (indexOfRow === 2 && indexOfCCol === 2):
                return [clickableMapSide / 3 * 2, clickableMapSide / 3 * 2];
        }
    }

    function clickHandler(canvas, event) {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        switch (true) {
            case (x > 0 && x < clickableMapSide / 3 && y > 0 && y < clickableMapSide / 3):
                return [0, 0];
            case (x > clickableMapSide / 3 && x < clickableMapSide / 3 * 2 && y > 0 && y < clickableMapSide / 3):
                return [0, 1];
            case (x > clickableMapSide / 3 * 2 && x < clickableMapSide && y > 0 && y < clickableMapSide / 3):
                return [0, 2];
            case (x > 0 && x < clickableMapSide / 3 && y > clickableMapSide / 3 && y < clickableMapSide / 3 * 2):
                return [1, 0];
            case (x > 0 && x < clickableMapSide / 3 && y > clickableMapSide / 3 * 2 && y < clickableMapSide):
                return [2, 0];
            case (x > clickableMapSide / 3 * 2 && x < clickableMapSide && y > clickableMapSide / 3 && y < clickableMapSide / 3 * 2):
                return [1, 2];
            case (x > clickableMapSide / 3 && x < clickableMapSide / 3 * 2 && y > clickableMapSide / 3 * 2 && y < clickableMapSide):
                return [2, 1];
            case (x > clickableMapSide / 3 && x < clickableMapSide / 3 * 2 && y > clickableMapSide / 3 && y < clickableMapSide / 3 * 2):
                return [1, 1];
            case (x > clickableMapSide / 3 * 2 && x < clickableMapSide && y > clickableMapSide / 3 * 2 && y < clickableMapSide):
                return [2, 2];
        }
    }

    function finishGame() {
        if (checkProgress(game)[0]) {
            canvas.removeEventListener('click', handler);
            if (checkProgress(game)[1]) {
                document.getElementById("result").innerText = "winner";
            } else if (!checkProgress(game)[1]) {
                document.getElementById("result").innerText = "looser";
            }
        }
    }

    function trigerCPUMoove() {
        setTimeout(() => {
            cpuMoove();
            finishGame();
        }, 1000);
    }

    function playerMoove(rowIndex, colIndex) {
        if (game[rowIndex][colIndex] === '') {
            let coordinates = transformIndexToCoordinate(rowIndex, colIndex);
            drawX(rowIndex, colIndex, ...coordinates);
            isItMyTurn = false;
        }
    }

    function checkProgress() {
        let isItOver = false;
        let didIWin = false;

        //check rows
        for (const row of game) {
            if (row[0] === row[1] && row[1] === row[2] && row[0]) {
                isItOver = true;
                if (row[0] === 'X') {
                    didIWin = true;
                    return [isItOver, didIWin];
                }
                return [isItOver, didIWin];
            }
        }

        //check cols
        for (let i = 0; i < 3; i++) {
            if (game[0][i] === game[1][i] && game[1][i] === game[2][i] && game[0][i]) {
                isItOver = true;
                if (game[0][i] === 'X') {
                    didIWin = true;
                    return [isItOver, didIWin];
                }
                return [isItOver, didIWin];
            }
        }

        //check crosses
        if (((game[0][0] === game[1][1] && game[1][1] === game[2][2]) || (game[0][2] === game[1][1] && game[1][1] === game[2][0])) && game[1][1]) {
            isItOver = true;
            if (game[1][1] === 'X') {
                didIWin = true;
                return [isItOver, didIWin];
            }
            return [isItOver, didIWin];
        }
        return [isItOver, didIWin];
    }

    function cpuMoove() {
        if (checkProgress(game)[0]) {
            return;
        }

        //chechk if there is free space
        let allMooves = [...game[0], ...game[1], ...game[2]];
        if (!allMooves.includes('')) {
            return;
        }

        do {
            indexOfRow = randomNumber();
            indexOfCCol = randomNumber();
        } while (game[indexOfRow][indexOfCCol] !== "");




        for (let i = 0; i < 3; i++) {
            let lineOfX = game[i].filter(cell => cell === 'X');
            if (JSON.stringify(lineOfX) === JSON.stringify(["X", "X"])) {
                for (let j = 0; j < 3; j++) {
                    if (game[i][j] === '') {
                        indexOfRow = i;
                        indexOfCCol = j;
                    }
                }
            }
        }
        let coordinates = transformIndexToCoordinate(indexOfRow, indexOfCCol);
        drawO(...coordinates);
        game[indexOfRow][indexOfCCol] = 'O';
        isItMyTurn = true;
    }

    function gameFlow(canvas, event) {
        let testmode = document.getElementById('testmode').checked;
        if(isItMyTurn){
            let clickIndex = clickHandler(canvas, event);
            playerMoove(...clickIndex);
        }
        if(!testmode){
            trigerCPUMoove();         
        }       
    }




    const handler = e => gameFlow(canvas, e);

    canvas.addEventListener('click', handler);
});