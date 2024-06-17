let body = document.querySelector('body');

let container = document.createElement('div');
container.className = 'container';
body.appendChild(container);
body.style.cursor = 'none';

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
let cursorColor = 'black';

cursor.style.position = 'absolute';
cursor.style.width = cursorWidth + 'px';
cursor.style.height = cursorWidth + 'px';
cursor.style.borderRadius = '50%';
cursor.style.backgroundColor = cursorColor;
cursor.style.pointerEvents = 'none';
cursor.style.transform = 'translate(-35%, -35%)';

let drawing = false;
window.addEventListener('mousemove', e => {
    //moving the cursor
    let lastX = e.clientX;
    let lastY = e.clientY;
    cursor.style.left= (lastX) + 'px';
    cursor.style.top= (lastY) + 'px';

    //drawing on the canvas
    if (!drawing) return;

    ctx.lineWidth = cursorWidth;
    ctx.lineCap = 'round';
    ctx.strokeStyle = cursorColor;

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
    draw(e);
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