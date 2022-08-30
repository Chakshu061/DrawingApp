const canvas = document.getElementById("canvas");
const sizeEl = document.getElementById("size");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const ctx = canvas.getContext("2d"); //context od our canvas
//use ctx to draw on the canvas

//ctx.fillStyle = "red";
//ctx.fillRect(100, 100, 100, 100);
//helps in creating a rectamngle

let prevX = null; //previous mouse positions
let prevY = null;



let size = 30;

let draw = false;



//selecting all the div that has a class of clr
let clrs = document.querySelectorAll(".clr");
//converting NodeList to Array 
clrs = Array.from(clrs);

clrs.forEach(clr => {
    clr.addEventListener("click", () => {
        ctx.strokeStyle = clr.dataset.clr;
    })
});

//pen size increase
increaseBtn.addEventListener("click", () => {
    size += 10;

    if (size > 50) {
        size = 50;
    }

    updateSizeOnScreen();
});

//pex size decrease
decreaseBtn.addEventListener("click", () => {
    size -= 5;

    if (size < 5) {
        size = 5;
    }

    updateSizeOnScreen();
});

//clearing the canvas
let clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});


let saveBtn = document.querySelector(".save")
saveBtn.addEventListener("click", () => {
    let data = canvas.toDataURL("imag/png")
    let a = document.createElement("a")
    a.href = data
    // what ever name you specify here
    // the image will be saved as that name
    a.download = "sketch.png"
    a.click()
});


window.addEventListener("mousedown", (e) => {
    draw = true;
    //thickness of line
    ctx.lineWidth = 5;
});

window.addEventListener("mouseup", (e) => {
    draw = false;
    //thickness of line
    ctx.lineWidth = 5;
});

window.addEventListener("mousemove", (e) => {
    //initially previous mouse positions are null so cant draw a line

    if(prevX == null || prevY == null || !draw){
        prevX = e.clientX;
        prevY = e.clientY;
        return;
    }

    //current mouse positions
    let currentX = e.clientX;
    let currentY = e.clientY;

    //drawing a line from the previous mouse position to the current mouse position
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();
    

    // Update previous mouse position
    prevX = currentX;
    prevY = currentY;
})

function updateSizeOnScreen() {
    sizeEl.innerText = size;
}

