const c = document.getElementById("cubes");
const ctx = c.getContext("2d");
const resolution_multiplier = window.devicePixelRatio;

const l = 75;
const h = l*Math.sin(Math.PI/3);
const gap = 0.5;
const mouseRad = 120;
const mouseRadMin = 70;

const mass = 0.003;

let mouseX = -1;
let mouseY = -1;
window.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
})

let anim;

let leaves;
window.addEventListener("resize", drawCubes); //redraw screen when it has been resized
function drawCubes() {
    if (anim !== undefined) window.cancelAnimationFrame(anim);

    c.width  = Math.floor(c.offsetWidth*resolution_multiplier);
    c.height = Math.floor(c.offsetHeight*resolution_multiplier);
    ctx.scale(resolution_multiplier, resolution_multiplier);

    ctx.clearRect(0, 0, c.width, c.height);

    const horiz_dist = h+gap;
    const vert_dist = horiz_dist*Math.sin(Math.PI/3);

    leaves = new Array(); // 2d array: x, y, rot, scale

    let newElem;
    for (let i = 0; i <= c.height/(2*vert_dist) + 1; i++) {
        for (let j = 0; j <= c.width/(2*horiz_dist) + 1; j++){
            newElem = [horiz_dist*j*2 - i%2*horiz_dist, vert_dist*i*2, 0, 1];
            leaves.push(newElem)
            drawLeaf.apply(null, newElem);

            newElem = [horiz_dist*(j*2+1) - i%2*horiz_dist, vert_dist*i*2, 1, 1];
            leaves.push(newElem)
            drawLeaf.apply(null, newElem);

            newElem = [horiz_dist*(j*2+0.5) - i%2*horiz_dist, vert_dist*(i*2+1), 2, 1];
            leaves.push(newElem)
            drawLeaf.apply(null, newElem);
        }
    }

    anim = window.requestAnimationFrame(animate); //start animation
}

let prevFrame = 0;
let elapsed = 0;
function animate(t) {

    if (t !== undefined) {
        elapsed = t - prevFrame;
        prevFrame = t;
    }
    
    ctx.clearRect(0, 0, c.width, c.height);
    
    for (let i = 0; i < leaves.length; i++) {
        
        leaves[i][3] += (pointerSize(leaves[i][0], leaves[i][1]) - leaves[i][3]) * mass * elapsed;
        leaves[i][3] = Math.min(1, leaves[i][3]);

        // finally, draw the leaf
        drawLeaf.apply(null, leaves[i]);
    }

    anim = window.requestAnimationFrame(animate);
}

function pointerSize(x, y) { //returns size coefficient from 0 to 1
    if (mouseX < 0 || mouseY < 0) return 1;
    let dist = Math.sqrt((x-mouseX)*(x-mouseX) + (y-mouseY)*(y-mouseY));
    return Math.min(Math.max(dist, mouseRadMin), mouseRad)/mouseRad;
}

function drawLeaf(x, y, rot, scale) { //draws from center points, with 3 types of rotation

    let scaledL = scale*l;
    let scaledH = scale*h;

    ctx.save();
    
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.rotate(Math.PI/6);
    ctx.rotate(-rot * Math.PI/3);
    ctx.translate(0, scaledH);
    ctx.rotate(-Math.PI/6);
    ctx.moveTo(0, 0);
    ctx.translate(0, -scaledL);
    ctx.lineTo(0, 0);
    ctx.rotate(Math.PI/3);
    ctx.translate(0, -scaledL);
    ctx.lineTo(0, 0);
    ctx.rotate(-Math.PI/3)
    ctx.lineTo(0, scaledL);
    ctx.closePath();

    ctx.fillStyle = "black";
    ctx.fill();

    ctx.restore();
}

drawCubes();