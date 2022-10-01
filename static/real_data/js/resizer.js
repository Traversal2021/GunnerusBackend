var mapContainer = document.getElementById("left");
var topicContainer= document.getElementById("rightSelection");
var resetBox= document.getElementById("resetButton");
var figureContainer = document.getElementById("rightResults");
var showCount = 0;

function ShowRightDiv(){
    if(showCount==0){
        topicContainer.style.display='block';
        topicContainer.style.width='30%';
        figureContainer.style.width='30%';
        mapContainer.style.width='70%';
        showCount=1;
    }
    else{
        topicContainer.style.display='none';
        resetBox.style.display='none';
        figureContainer.style.display='none';
        mapContainer.style.width='100%';
        showCount=0;
    }
}

document.getElementById("RealTimeButton").onclick= function() {
    showCount = 0;
    ShowRightDiv();
}
document.getElementById("HistoricalButton").onclick= function() {
    showCount = 0;
    ShowRightDiv();
}



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
    const LeftStyles = window.getComputedStyle(mapContainer);
    const RightStyles = window.getComputedStyle(topicContainer);
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
    mapContainer.style.width = `${newLeftWidth}px`;
    topicContainer.style.width = `${newRightWidth}px`;
    resetBox.style.width = `${newRightWidth}px`;
    figureContainer.style.width = `${newRightWidth}px`;

};

const mouseUpHandler = function () {
    // Remove the handlers of `mousemove` and `mouseup`
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
};

document.getElementById("resizer").addEventListener('mousedown', mouseDownHandler)