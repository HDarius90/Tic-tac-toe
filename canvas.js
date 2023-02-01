window.addEventListener("load", () => {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext("2d");
    let isItMyTurn = true;
    let game = [[], [], []];

    //Resizing
    canvas.height = 699;
    canvas.width = 699;


    ctx.strokeStyle = '#0DA192';
    ctx.lineWidth = 15;



    ctx.beginPath();
    ctx.moveTo(233, 20);
    ctx.lineTo(233, 679);
    ctx.moveTo(466, 20);
    ctx.lineTo(466, 679);
    ctx.moveTo(20, 233);
    ctx.lineTo(679, 233);
    ctx.moveTo(20, 466);
    ctx.lineTo(679, 466);
    ctx.closePath();

    ctx.stroke();

    function drawX(x, y) {
        ctx.strokeStyle = '#545454';
        ctx.beginPath();
        ctx.moveTo(x + 40, y + 40);
        ctx.lineTo(x + 193, y + 193);
        ctx.moveTo(x + 193, y + 40);
        ctx.lineTo(x + 40, y + 193);
        ctx.stroke();
        ctx.closePath();
        isItMyTurn = false;
    }

    function drawO(x, y) {
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.arc(x + 116.5, y + 116.5, 70, 0, 2 * Math.PI);
        ctx.stroke();
        isItMyTurn = true;
    }


    function gameFlow(canvas, event, isItMyTurn, game) {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top


        if (x > 0 && x < 233 && y > 0 && y < 233) {
            if (isItMyTurn) {
                drawX(0, 0);
                game[0][0] = 'X';
            } else {
                drawO(0, 0);
                game[0][0] = 'O';
            }

        } else if (x > 233 && x < 466 && y > 0 && y < 233) {
            if (isItMyTurn) {
                drawX(233, 0);
                game[0][1] = 'X';
            } else {
                drawO(233, 0);
                game[0][1] = 'O';
            }

        } else if (x > 466 && x < 699 && y > 0 && y < 233) {
            if (isItMyTurn) {
                drawX(466, 0);
                game[0][2] = 'X';
            } else {
                drawO(466, 0);
                game[0][2] = 'O';
            }

        } else if (x > 0 && x < 233 && y > 233 && y < 466) {
            if (isItMyTurn) {
                drawX(0, 233);
                game[1][0] = 'X';
            } else {
                drawO(0, 233);
                game[1][0] = 'O';
            }

        } else if (x > 0 && x < 233 && y > 466 && y < 699) {
            if (isItMyTurn) {
                drawX(0, 466);
                game[2][0] = 'X';
            } else {
                drawO(0, 466);
                game[2][0] = 'O';
            }

        } else if (x > 466 && x < 699 && y > 233 && y < 466) {
            if (isItMyTurn) {
                drawX(466, 233);
                game[1][2] = 'X';
            } else {
                drawO(466, 233);
                game[1][2] = 'O';
            }

        } else if (x > 233 && x < 466 && y > 466 && y < 699) {
            if (isItMyTurn) {
                drawX(233, 466);
                game[2][1] = 'X';
            } else {
                drawO(233, 466);
                game[2][1] = 'O';
            }

        } else if (x > 233 && x < 466 && y > 233 && y < 466) {
            if (isItMyTurn) {
                drawX(233, 233);
                game[1][1] = 'X';
            } else {
                drawO(233, 233);
                game[1][1] = 'O';
            }

        } else if (x > 466 && x < 699 && y > 466 && y < 699) {
            if (isItMyTurn) {
                drawX(466, 466);
                game[2][2] = 'X';
            } else {
                drawO(466, 466);
                game[2][2] = 'O';
            }
        }
        console.log(game);
        console.log(cpMoove(game)); 
        if (checkProgress(game)) {
            if (checkProgress(game)[1] === true) {
                document.getElementById("result").innerText = "winner";
            } else {
                document.getElementById("result").innerText = "looser";

            }
            canvas.removeEventListener('click', handler);

        }
    }

    

    function checkProgress(game) {
        let isItOver = false;
        let didIWin = false;
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

        if (((game[0][0] === game[1][1] && game[1][1] === game[2][2]) || (game[0][2] === game[1][1] && game[1][1] === game[2][0])) && game[1][1]) {
            isItOver = true;
            if (game[1][1] === 'X') {
                didIWin = true;
                return [isItOver, didIWin];
            }
            return [isItOver, didIWin];
        }
    }

    function cpMoove(currentGame){
        let indexOfRow = Math.floor((Math.random() * 3));
        let indexOfCCol = Math.floor((Math.random() * 3));
      
        while(currentGame[indexOfRow][indexOfCCol]){
            indexOfRow = Math.floor((Math.random() * 3));
            indexOfCCol = Math.floor((Math.random() * 3));
        }
        return [indexOfRow, indexOfCCol];
    }



    var handler = function (e) {
        gameFlow(canvas, e, isItMyTurn, game);

    }
    //EventListeners
    canvas.addEventListener('click', handler);

});