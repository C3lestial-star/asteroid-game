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
    setTimeout(() => {
        animate();
    }, 1000);

    canvasCursor.style.cursor = 'none';
    mainthemeSound();
    
})

let frames = 0;
let astroidsArr = []; 
let beamArr = [];
const image = new Image(30, 30);
image.src = 'img/download.png';
let lives = 5;
console.log({lives})
let collision = false;
const explosionSound = null;
const mainSound = null;
let stopId = null;


function startAnimation(){

    stopId = requestAnimationFrame(animate)
}


function stopAnimation(){

    cancelAnimationFrame(stopId);
}

// explosion sound 

function mainthemeSound(){
    const mainSound = new Audio()
    mainSound.src = './sounds/main.mp3'
    mainSound.play();

}


function explosion(){
   
    const explosionSound = new Audio()
    explosionSound.src = './sounds/explosion.mp3'
    explosionSound.play();

}


// function that sets back the collision back to false

function detectCollisions(){

    astroidsArr.forEach((element, index, arr) => { 
        if(element.collision === true){
            astroidsArr.splice(index, 1);
            
        }        
    });
}

// function that counts lives

function countingLives(){
    if(collision === true){
        lives -= 1;
        collision = false;
    }
}

// function that stops the game when no lives are left

function noLivesLeft(){

    if(lives === 0){
        stopAnimation();

        setTimeout(() => {
            clearArea();
        }, 1000);

    }
}




// function to draw the image on the canvas

function imageLoad() {
    //draw background image
    ctx.drawImage(image, mouseX-35, mouseY-35, 70, 70);
}

// eventlistener that resizes the canvas based on the size of the window

window.addEventListener('resize', function(){
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
        mouseX = (getMousePos(canvas, event).x) > canvas.width ? canvas.width : (getMousePos(canvas, event).x) < 0 ? 0 : getMousePos(canvas, event).x;
        mouseY = (getMousePos(canvas, event).y) > canvas.height? canvas.height : (getMousePos(canvas, event).y) < 0 ? 0 : getMousePos(canvas, event).y;
    }
})

window.addEventListener('click', function(event){
    if(canvas){
        beamArr.push(new Beam(mouseX, mouseY, 10));
    }
} )




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

// this function is to remove beam objects from the array when they leave the canvas

function clearBeams(){

    beamArr.forEach((element, index, arr) => { 
        if(element.x > canvas.width){
            astroidsArr.splice(index, 1);
        }        
    });

}

// the animate function that draws everything on the canvas

function animate(){
    clearArea();
    startAnimation();
    frames += 1;

    const rangeFrames = randomIntFromInterval(10, 30); 
    if(frames % rangeFrames === 0){
        generateAsteroids();
    }
    clearObject();
    for(let i=0; i < astroidsArr.length; i++){
        astroidsArr[i].update();
        astroidsArr[i].crashWith(mouseX, mouseY);
    }

    for(let i=0; i < beamArr.length; i++){
        beamArr[i].draw();
        beamArr[i].crashWith();
    }

    detectCollisions()
    countingLives()
    spaceShip(mouseX, mouseY);
    imageLoad();
    noLivesLeft();

}
 
let mouseX = null;
let mouseY = null;



