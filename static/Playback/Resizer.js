const leftEle = document.getElementById('left');
const rightUpEle = document.getElementById('rightUp');
const rightDownEle = document.getElementById('rightDown');
const drawButton + document.getElementById("drawButton")
var selectBox= document.getElementById("rightUp");
var resetBox= document.getElementById("resetButton");
var figureBox = document.getElementById("rightDown");

// The current position of mouse
let MouseX = 0;
let MouseY = 0;
// The dimension of the element
let LeftWidth = 0;
let RightWidth = 0;

// Handle the mousedown event
// that's triggered when user drags the resizer
const mouseDownHandler = function (e) {
    // Get the current mouse position
    MouseX = e.clientX;
    MouseY = e.clientY;

    // Calculate the dimension of element
    const LeftStyles = window.getComputedStyle(leftEle);
    const RightStyles = window.getComputedStyle(rightUpEle);
    LeftWidth = parseInt(LeftStyles.width);
    RightWidth = parseInt(RightStyles.width);

    // Attach the listeners to `document`
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
};


const mouseMoveHandler = function (e) {
    // How far the mouse has been moved
    const dx = e.clientX - MouseX;
    const dy = e.clientY - MouseY;

    // Adjust the dimension of element
    let newLeftWidth = LeftWidth + dx;
    let newRightWidth = window.innerWidth -newLeftWidth;
    leftEle.style.width = `${newLeftWidth}px`;
    rightUpEle.style.width = `${newRightWidth}px`;
    drawButton.style.width = `${newRightWidth}px`;
    resetBox.style.width = `${newRightWidth}px`;
    rightDownEle.style.width = `${newRightWidth}px`;

};

const mouseUpHandler = function () {
    // Remove the handlers of `mousemove` and `mouseup`
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
};
// Query all resizers
const resizers = leftEle.querySelectorAll('.resizer-r');


// Loop over them
[].forEach.call(resizers, function (resizer) {
    resizer.addEventListener('mousedown', mouseDownHandler);
});
