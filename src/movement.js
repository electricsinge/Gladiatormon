let inBattle;
const negativeSpeed = playerWorld.speed * -1;
let moveFastIncrement = 0;
let fastInterval = {};
let speedIncrement = 5;
let isMoving = [0, 0];
let backgroundTransform = [0, 0];
let moveScreen = 0;
let firstMovement = false;
let collided = false;

function moveFast(value){
  isMoving = true;
  console.log(moveFastIncrement);
    playerWorld.x = value[0]/speedIncrement;
    playerWorld.y = value[1]/speedIncrement;
    
    if(moveFastIncrement === 50){
        clearInterval(fastInterval);
        isMoving = false;
        moveFastIncrement = 0;
    }
    moveFastIncrement++;
}


document.addEventListener("keydown", (event) => {

  if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(event.code) > -1) {
        event.preventDefault();
   }
  switch(event.key){
    case "ArrowUp":
      firstMovement = true;
      //fastInterval = setInterval(function(){moveFast([0, negativeSpeed]);}, 5);
      isMoving[1] = negativeSpeed;
      break;
    case "ArrowDown":
      firstMovement = true;
      //fastInterval = setInterval(function(){moveFast([0, playerWorld.speed])}, 5);
      isMoving[1] = playerWorld.speed;
      break;
    case "ArrowLeft":
      firstMovement = true;
      //fastInterval = setInterval(function(){moveFast([negativeSpeed, 0])}, 5);
      isMoving[0] = negativeSpeed;
      break;
    case "ArrowRight":
      firstMovement = true;
      isMoving[0] = playerWorld.speed;
      //fastInterval = setInterval(function(){moveFast([playerWorld.speed, 0]);}, 5);
      break;
}});

document.addEventListener("keyup", (event) => {

  if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(event.code) > -1) {
        event.preventDefault();
   }
  

  switch(event.key){
    case "ArrowUp":
      //fastInterval = setInterval(function(){moveFast([0, negativeSpeed]);}, 5);
      isMoving[1] = 0;
      break;
    case "ArrowDown":
      //fastInterval = setInterval(function(){moveFast([0, playerWorld.speed])}, 5);
      isMoving[1] = 0;
      break;
    case "ArrowLeft":
      //fastInterval = setInterval(function(){moveFast([negativeSpeed, 0])}, 5);
      isMoving[0] = 0;
      break;
    case "ArrowRight":
      isMoving[0] = 0;
      //fastInterval = setInterval(function(){moveFast([playerWorld.speed, 0]);}, 5);
      break;
}});

//backgroundTransform[1] -= 200;
//gameContainer.style.backgroundPositionY = `${backgroundTransform[1]}px`

function update(first){
  //let location = [Math.abs(Math.floor((backgroundTransform[0]+ 160)/70)), Math.abs(Math.floor((parseInt(gameContainer.style.backgroundPositionY)+326)/40))];
  console.log(location);
  console.log("Background", gameContainer.style.backgroundPosition)
  //console.log(isMoving);
  //console.log(collisionsMap[location[0]][location[1]]);
  //console.log("Collisoin", collisionsMap)
 /* if(collisionsMap[Math.abs(location[1])][Math.floor((parseInt(backgroundTransform[0], 10) + isMoving[0] + (window.screen.width/2))/70)]!=0){
    //console.log("xcompromised");
    isMoving[0]=0;
  }s
  if(collisionsMap[Math.floor((parseInt(backgroundTransform[1], 10) + isMoving[1] + (window.screen.height/2))/40)][Math.abs(location[0])]!=0){
    //console.log("ycompromised");
    isMoving[1]=0;
  }*/
  
  if(first==true){
    isMoving[0]=-138;
    isMoving[1]=-300;
  }

  //if(playerWorld.playerTransform[0] + isMoving[0] >= moveScreen || playerWorld.playerTransform[0] + isMoving[0] <= (-1*moveScreen)){
    backgroundTransform[0] -= isMoving[0];
    gameContainer.style.backgroundPositionX = `${backgroundTransform[0]}px`
 // }
 // else{playerWorld.x = isMoving[0];}

 // if(playerWorld.playerTransform[1] + isMoving[1] >= moveScreen || playerWorld.playerTransform[1] + isMoving[1] <= (-1*moveScreen)){
    backgroundTransform[1] -= isMoving[1];
    gameContainer.style.backgroundPositionY = `${backgroundTransform[1]}px`
//  }
  if(first==true){
    isMoving = [0,0];
    location = [0,0];
  }

  else{
    playerWorld.location[0] += isMoving[0]/70;
    playerWorld.location[1] += isMoving[1]/70;
  }
 // else{playerWorld.y = isMoving[1];}
  requestAnimationFrame(update);
}

update(true);

