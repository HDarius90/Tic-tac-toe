window.addEventListener("load", () => {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext("2d");

    //Resizing
    canvas.height = window.innerHeight/1.1;
    canvas.width = window.innerWidth/2;

    //ctx.fillStyle = 'blue';
   // ctx.fillRect(50, 50, 200, 200);
    ctx.strokeStyle = '#0DA192';
    //ctx.strokeRect(250, 250, 300, 300)

    ctx.lineWidth = 15;

    ctx.beginPath();
    ctx.moveTo(320, 20);
    ctx.lineTo(320, 826);
    ctx.moveTo(640, 20);
    ctx.lineTo(640, 826);
    ctx.moveTo(20, 282);
    ctx.lineTo(940, 282);
    ctx.moveTo(20, 564);
    ctx.lineTo(940, 564);
    ctx.closePath();

    ctx.stroke();


    //variables
    let painting = false;


    function startPosition() {
        painting = true;
    }
    function finishPosition() {
        painting = false;
    }
    function draw(e) {
        if (!painting) return;
        ctx.lineWidth = 10;
        ctx.lineCap = 'round';

        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();

    }
    //EventListeners
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', finishPosition);
    canvas.addEventListener('mousemove', draw);
});