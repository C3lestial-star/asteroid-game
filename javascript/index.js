let canvas = null;
const intro = document.getElementById('intro');
let ctx = null;
const startButton = document.getElementById('start');
const canvasCursor = document.getElementById('no-cursor');
startButton.addEventListener('click', function(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;
    intro.style.display = 'none';
    canvas.style.display = 'block'; 
    animate();
    canvasCursor.style.cursor = 'none';    
    
})

let frames = 0;
let astroidsArr = [];
const image = new Image(30, 30);
image.src = 'img/download.png';
let lives = 300;
console.log({lives})

// function to draw the image on the canvas

function imageLoad() {
    //draw background image
    ctx.drawImage(image, mouseX-35, mouseY-35, 70, 70);
}

// eventlistener that resizes the canvas based on the size of the window

window.addEventListener('resize', function(){
    console.log('works')
    if(canvas){
        canvas.width = window.innerWidth * 0.8;
        canvas.height = window.innerHeight * 0.8;
    }
})

// this function corrects the mouse coordinates on the canvas substracting the x and y space between the window and the canvas

function getMousePos(canvas, evt) {
    
    if(canvas){
        let rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
}



function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor((Math.random() * (max - min + 1) + min));
}

// generate asteroids function

function generateAsteroids(){
    
    let radius = randomIntFromInterval(20, 35)
    let x = canvas.width - radius
    let y = randomIntFromInterval(radius, (canvas.height - radius))
    let velocityX = randomIntFromInterval(1,6)
    let velocityY = randomIntFromInterval(-2,2)    
    astroidsArr.push(new Astroids(x, y, radius, velocityX, velocityY))    
}

// function to clear the canvas which is called within the animate function

function clearArea(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
} 

// eventlistener for the x and y mouse position correction

window.addEventListener('mousemove', function(event){

    if(canvas){
        mouseX = getMousePos(canvas, event).x;
        mouseY = getMousePos(canvas, event).y;
    }
})

// circle below the spaceship image to use for the object collision detection

function spaceShip(x, y){
    ctx.beginPath(); 
    ctx.arc(x,y, 30, 0, Math.PI * 2, false);
    ctx.strokeStyle = 'white';
    ctx.stroke();
}

// this function is to remove asteroids objects from the array when they leave the canvas

function clearObject(){

    astroidsArr.forEach((element, index, arr) => { 
        if(element.x < 0){
            astroidsArr.splice(index, 1);
        }        
    });

}


// the animate function that draws everything on the canvas

function animate(){
    requestAnimationFrame(animate);
    clearArea();
    frames += 1;

    const rangeFrames = randomIntFromInterval(120, 300); 
    if(frames % rangeFrames === 0){
        generateAsteroids();
    }
    clearObject();
    for(let i=0; i < astroidsArr.length; i++){
        astroidsArr[i].update();
        astroidsArr[i].crashWith(mouseX, mouseY);
    }



    spaceShip(mouseX, mouseY);
    
    imageLoad();
}
 
let mouseX = null;
let mouseY = null;






// function animate() {
//     requestAnimationFrame(animate);
//     let radius = randomIntFromInterval(20, 35)
//     let x = canvas.width - radius
//     let y = randomIntFromInterval(0, canvas.height)
    // ctx.beginPath();
    // ctx.strokeStyle = 'blue'
//     ctx.arc(x,y, radius, 0, Math.PI * 2, false)
//     ctx.stroke();

//     x= x +10; 
// }





// window.addEventListener('mousemove', function(event){
//     clearArea();
//     x = getMousePos(canvas, event).x;
//     y = getMousePos(canvas, event).y;

    
//     draw1(x, y);


    
// })


// function draw1(x, y){

//     ctx.beginPath();
//     ctx.lineWidth = 10;
//     ctx.lineCap = 'round';
//     ctx.strokeStyle = 'black';
//     ctx.lineTo(x, y)
//     ctx.stroke();

// }

