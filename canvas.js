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

    function drawX (x,y){
        ctx.moveTo(x+40,y+40);
        ctx.lineTo(x+193,y+193);
        ctx.moveTo(x+193,y+40);
        ctx.lineTo(x+40,y+193);
        ctx.stroke();

    }

    drawX(0,0);
    drawX(233,0);
    drawX(466,0);
    drawX(0,233);
    drawX(0,466);
    drawX(466,233);
    drawX(233,466);
    drawX(233,233);
    drawX(466,466);


    



    function getCursorPosition(canvas, event) {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        console.log("x: " + x + " y: " + y)
    }

    //EventListeners
    canvas.addEventListener('mousedown', function(e) {
       console.log(getCursorPosition(canvas, e)); 
    })
});