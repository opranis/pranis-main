var c = document.getElementById("cubes");
var ctx = c.getContext("2d");
var anim;

drawCubes();
window.addEventListener('resize', drawCubes);

function drawCubes() {
    c.width  = c.offsetWidth*4;
    c.height = c.offsetHeight*4;
    // window.cancelAnimationFrame(anim);
    animate();
}

function drawGradient() {
    // Create gradient from corner to corner
    var grd = ctx.createLinearGradient(0, 0, c.width, c.height);
    grd.addColorStop(0, "#fa6a0f");
    grd.addColorStop(1, "#a0fa0f");
    
    // Fill all canvas with gradient
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, c.width, c.height);
}

var start;

function animate(t) {
    if (start === undefined) start = t;
    const elapsed = t - start;

    drawGradient();

    // let l = 400;
    // let gap = 3;

    let l = elapsed/100;
    let gap = 30 - elapsed/5000;

    let h = l*Math.sin(Math.PI/3);
    let horiz_dist = h+gap;
    let vert_dist = horiz_dist*Math.sin(Math.PI/3);

    for (let i = 0; i <= c.height/(2*vert_dist) + 1; i++) {
        for (let j = 0; j <= c.width/(2*horiz_dist) + 1; j++){
            drawLeaf(horiz_dist*j*2 - i%2*horiz_dist, vert_dist*i*2, l, 0, h);
            drawLeaf(horiz_dist*(j*2+1) - i%2*horiz_dist, vert_dist*i*2, l, 1, h);
            drawLeaf(horiz_dist*(j*2+0.5) - i%2*horiz_dist, vert_dist*(i*2+1), l, 2, h);
        }
    }

    anim = window.requestAnimationFrame(animate);
}

function drawLeaf(x, y, l, rot, h) {
    ctx.save();
    
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.rotate(Math.PI/6);
    ctx.rotate(-rot * Math.PI/3);
    ctx.translate(0, h);
    ctx.rotate(-Math.PI/6);
    ctx.moveTo(0, 0);
    ctx.translate(0, -l);
    ctx.lineTo(0, 0);
    ctx.rotate(Math.PI/3);
    ctx.translate(0, -l);
    ctx.lineTo(0, 0);
    ctx.rotate(-Math.PI/3)
    ctx.lineTo(0, l);
    ctx.closePath();

    ctx.fillStyle = "black";
    ctx.fill();

    ctx.restore();
}