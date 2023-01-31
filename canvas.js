window.addEventListener("load", () => {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext("2d");

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
    }

    function drawO(x, y) {
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.arc(x+116.5, y+116.5, 70, 0, 2 * Math.PI);
        ctx.stroke();
    }

    //drawO(0,0);







    function getCursorPosition(canvas, event) {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        console.log("x: " + x + " y: " + y)


        if (x > 0 && x < 233 && y > 0 && y < 233) {
            drawX(0, 0);
        } else if (x > 233 && x < 466 && y > 0 && y < 233) {
            drawO(233, 0);
        } else if (x > 466 && x < 699 && y > 0 && y < 233) {
            drawX(466, 0);
        } else if (x > 0 && x < 233 && y > 233 && y < 466) {
            drawO(0, 233);
        } else if (x > 0 && x < 233 && y > 466 && y < 699) {
            drawX(0, 466);
        } else if (x > 466 && x < 699 && y > 233 && y < 466) {
            drawO(466, 233);
        } else if (x > 233 && x < 466 && y > 466 && y < 699) {
            drawX(233, 466);
        } else if (x > 233 && x < 466 && y > 233 && y < 466) {
            drawO(233, 233);
        } else if (x > 466 && x < 699 && y > 466 && y < 699) {
            drawX(466, 466);
        }
    }



    //EventListeners
    canvas.addEventListener('click', function (e) {
        console.log(getCursorPosition(canvas, e));

    })
});