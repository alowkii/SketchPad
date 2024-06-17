let body = document.querySelector('body');

let container = document.createElement('div');
container.className = 'container';
body.appendChild(container);
body.style.cursor = 'none';
body.style.overflow = 'hidden';

container.style.width = '100vw';
container.style.height = '100vh';
container.style.backgroundColor = '#1D2937';
container.style.color = 'white';
container.style.display = 'flex';
container.style.justifyContent = 'center';
container.style.alignItems = 'center';

let canvas = document.createElement('canvas');
container.appendChild(canvas);
let ctx = canvas.getContext('2d');

canvas.style.position = 'relative';
canvas.style.width = '80vw';
canvas.style.height = '80vh';
canvas.style.backgroundColor = 'white';
canvas.style.borderRadius = '20px';
canvas.style.border = '5px solid purple';

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let cursor = document.createElement('div');
cursor.className = 'cursor';
container.appendChild(cursor);
let cursorWidth = 10;
let currentColor = 'black';

cursor.style.position = 'absolute';
cursor.style.borderRadius = '50%';
cursor.style.pointerEvents = 'none';

let drawing = false;
window.addEventListener('mousemove', e => {
    //moving the cursor
    let lastX = e.clientX;
    let lastY = e.clientY;
    cursor.style.left= (lastX - cursorWidth/2) + 'px';
    cursor.style.top= (lastY - cursorWidth/2) + 'px';
    cursor.style.width = cursorWidth + 'px';
    cursor.style.height = cursorWidth + 'px';
    cursor.style.backgroundColor = currentColor;

    //drawing on the canvas
    if (!drawing) return;

    ctx.lineWidth = cursorWidth;
    ctx.lineCap = 'round';
    ctx.strokeStyle = currentColor;

    ctx.lineTo(lastX - canvas.offsetLeft, lastY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(lastX - canvas.offsetLeft, lastY - canvas.offsetTop);

    //stops overflow of the drawing cursor
    rect = canvas.getBoundingClientRect();
    if(lastX < rect.left || lastX > rect.right || lastY < rect.top || lastY > rect.bottom) {
        drawing = false;
        ctx.beginPath();
    }
});

canvas.addEventListener('mousedown', e => {
    drawing = true;
});

canvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.beginPath();
});

let clearBtn = document.createElement('button');
container.appendChild(clearBtn);
clearBtn.textContent = 'Clear';
clearBtn.style.width = '100px';
clearBtn.style.height = '50px';
clearBtn.style.borderRadius = '5px';
clearBtn.style.position = 'relative';
clearBtn.style.top = '37.5vh';
clearBtn.style.cursor = 'pointer';

clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

//Color Palette
let colorPalette = document.createElement('canvas');
colorPalette.id = 'colorPalette';
container.appendChild(colorPalette);
colorPalette.width = 200;
colorPalette.height = 200;
colorPalette.style.position = 'relative';
colorPalette.style.backgroundColor = 'grey';
colorPalette.style.right = '3vw';
colorPalette.style.cursor = 'pointer';

colorCtx = colorPalette.getContext("2d");
let width = colorPalette.width;
let height = colorPalette.height;
let numCols = 16; // Number of columns
let numRows = 16; // Number of rows
let cellWidth = width / numCols;
let cellHeight = height / numRows;

for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
        let red = Math.floor(255 * (j / (numCols - 1)));
        let green = Math.floor(255 * (i / (numRows - 1)));
        let blue = 128;

        colorCtx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
        colorCtx.fillRect(j * cellWidth, i * cellHeight, cellWidth, cellHeight);
    }
}

//Black and White with Current Palette
let bnw = document.createElement('canvas');
bnw.id = 'blackNdWhite';
container.appendChild(bnw)

bnw.width = 200;
bnw.height = 40;
bnw.style.position = 'absolute';
bnw.style.backgroundColor = 'white';
bnw.style.right = '3vw';
bnw.style.bottom = '25vh';
bnw.style.border = '2px solid black';
bnw.style.cursor = 'pointer';

const bnwCtx = bnw.getContext("2d");
let portionWidth = bnw.width / 3;

bnwCtx.fillStyle = 'black';
bnwCtx.fillRect(0,0,portionWidth, bnw.height);
bnwCtx.fillStyle = 'white';
bnwCtx.fillRect(portionWidth,0,portionWidth, bnw.height);

function getRGB(x, y){
    let imageData = colorCtx.getImageData(x,y,1,1);
    let data = imageData.data;
    
    return `rgb(${data[0]}, ${data[1]}, ${data[2]})`
}

colorPalette.addEventListener('click', e => {
    let rect = colorPalette.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    
    currentColor = getRGB(x, y);
    bnwCtx.fillStyle = `${currentColor}`;
    bnwCtx.fillRect(2*portionWidth,0,portionWidth, bnw.height);
});

bnw.addEventListener('click', e => {
    let rect = bnw.getBoundingClientRect();
    let x = e.clientX - rect.left;

    if(x < portionWidth){
        bnwCtx.fillStyle = 'black';
        bnwCtx.fillRect(0,0,portionWidth, bnw.height);
    }
    if(x > portionWidth){
        bnwCtx.fillStyle = 'white';
        bnwCtx.fillRect(portionWidth,0,portionWidth, bnw.height);
    }
})
