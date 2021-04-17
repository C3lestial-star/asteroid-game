const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');

canvas.width = 1600;
canvas.height = 800;
let frames = 0;
let astroidsArr = [];


function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}



function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor((Math.random() * (max - min + 1) + min));
}


function generateAsteroids(){
    
    let radius = randomIntFromInterval(20, 35)
    let x = canvas.width - radius
    let y = randomIntFromInterval(radius, (canvas.height - radius))
    let velocityX = randomIntFromInterval(1,6)
    let velocityY = randomIntFromInterval(-2,2)    
    astroidsArr.push(new Astroids(x, y, radius, velocityX, velocityY))    
}

function clearArea(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
} 


function animate(){
    requestAnimationFrame(animate);
    clearArea();
    frames += 1;

    const rangeFrames = randomIntFromInterval(120, 300); 
    if(frames % rangeFrames === 0){
        generateAsteroids();
    }

    for(let i=0; i < astroidsArr.length; i++){
        astroidsArr[i].update();
    }
    


}
 
window.addEventListener('mousemove', function(event){

    x = getMousePos(canvas, event).x;
    y = getMousePos(canvas, event).y;
    spaceShip(event, x, y);    
}
)


function spaceShip(e, x, y){
    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    ctx.moveTo(x,y);
    ctx.lineTo(x+50, y+50);
    ctx.lineTo(x+150, y+150);
    ctx.closePath();
    ctx.stroke();
}


animate();




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

//     x = getMousePos(canvas, event).x;
//     y = getMousePos(canvas, event).y;

    
//     draw1(event, x, y);


    
// })


// function draw1(event, x, y){

//     ctx.beginPath();
//     ctx.lineWidth = 10;
//     ctx.lineCap = 'round';
//     ctx.strokeStyle = 'black';
//     ctx.lineTo(x, y)
//     ctx.stroke();

// }

