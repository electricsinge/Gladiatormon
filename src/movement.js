let inBattle = false;
let negativeSpeed = playerWorld.speed * -1;
let firstTime = true;
let movingFunction = false;

topLeft = [-138, -300];

isMoving[1] = 300;

backgroundTransform[0] -= isMoving[0];
gameContainer.style.backgroundPositionX = `${backgroundTransform[0]}px`
backgroundTransform[1] -= isMoving[1];
gameContainer.style.backgroundPositionY = `${backgroundTransform[1]}px`

isMoving = [0,0];

function move(){
  //for x: -140
  //for y: -320
  //for Background Transform: down is down
  //for Background Transform: up is up
  playerWorld.location = [Math.abs(Math.floor(((backgroundTransform[0]-140)/1480)*70)), Math.abs(Math.floor(((backgroundTransform[1]-320)/820)*40))];
  console.log("location", playerWorld.location)
  console.log("background", [((backgroundTransform[0]-140)/1480)*70, ((backgroundTransform[1]-320)/820)*40])
  console.log("1val",Math.abs(Math.floor(((backgroundTransform[1]+isMoving[1]-320)/820)*40)-1))
  console.log(collisionsMap[Math.abs(Math.floor(((backgroundTransform[1]+isMoving[1]-320)/820)*40)-1)][Math.abs(playerWorld.location[0])-1]);
  console.log("isMoving", isMoving);

  if(collisionsMap[Math.abs(39-playerWorld.location[1])][Math.abs(39-(Math.floor(((backgroundTransform[0]-isMoving[0]-140)/1480)*70)-1))]==1494){
    console.log("xcompromised");
    isMoving[0]=0;
  }

  if(collisionsMap[Math.abs(39-(Math.floor(((backgroundTransform[1]-isMoving[1]-320)/820)*40)-1))][Math.abs(39-playerWorld.location[0])-1]==1494){
    console.log("ycompromised");
    isMoving[1]=0;
  }

  movingFunction = true;
  backgroundTransform[0] -= isMoving[0];
  gameContainer.style.backgroundPositionX = `${backgroundTransform[0]}px`
  backgroundTransform[1] -= isMoving[1];
  gameContainer.style.backgroundPositionY = `${backgroundTransform[1]}px`
  if(isMoving[0] != 0 && isMoving[1] != 0){
    requestAnimationFrame(move);
  }
  else{
    movingFunction = false;
  }
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
      /*movingUp = setInterval(function(){
        backgroundTransform[1] -= isMoving[1];
        gameContainer.style.backgroundPositionY = `${backgroundTransform[1]}px`
      },5000);*/
      break;
    case "ArrowDown":
      firstMovement = true;
      //fastInterval = setInterval(function(){moveFast([0, playerWorld.speed])}, 5);
      isMoving[1] = playerWorld.speed;
      /*movingDown = setInterval(function(){
        backgroundTransform[1] -= isMoving[1];
        gameContainer.style.backgroundPositionY = `${backgroundTransform[1]}px`
      },5000);*/
      break;
    case "ArrowLeft":
      firstMovement = true;
      //fastInterval = setInterval(function(){moveFast([negativeSpeed, 0])}, 5);
      isMoving[0] = negativeSpeed;
      /*movingLeft = setInterval(function(){
        backgroundTransform[0] -= isMoving[0];
        gameContainer.style.backgroundPositionX = `${backgroundTransform[0]}px`
      },5000);*/
      break;
    case "ArrowRight":
      firstMovement = true;
      isMoving[0] = playerWorld.speed;
      /*movingRight = setInterval(function(){
        backgroundTransform[0] -= isMoving[0];
        console.log(backgroundTransform);
        gameContainer.style.backgroundPositionX = `${backgroundTransform[0]}px`
      },5000);*/
      //fastInterval = setInterval(function(){moveFast([playerWorld.speed, 0]);}, 5);
      break;
}

if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(event.code) > -1 && movingFunction == false){
  move();
}});

document.addEventListener("keyup", (event) => {

  if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(event.code) > -1) {
        event.preventDefault();
   }
  

  switch(event.key){
    case "ArrowUp":
      //fastInterval = setInterval(function(){moveFast([0, negativeSpeed]);}, 5);
      isMoving[1] = 0;
      //clearInterval(movingUp);
      break;
    case "ArrowDown":
      //fastInterval = setInterval(function(){moveFast([0, playerWorld.speed])}, 5);
      isMoving[1] = 0;
      //clearInterval(movingDown);
      break;
    case "ArrowLeft":
      //fastInterval = setInterval(function(){moveFast([negativeSpeed, 0])}, 5);
      isMoving[0] = 0;
      //clearInterval(movingLeft);
      break;
    case "ArrowRight":
      isMoving[0] = 0;
      //clearInterval(movingRight);
      //fastInterval = setInterval(function(){moveFast([playerWorld.speed, 0]);}, 5);
      break;
}});

/*function update(){
  //playerWorld.location = [Math.abs(Math.floor((backgroundTransform[0]+ 160)/70)), Math.abs(Math.floor((parseInt(gameContainer.style.backgroundPositionY)+326)/40))];
  console.log(playerWorld.location);
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
  }
  
  if(firstTime==true){
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
  if(firstTime==true){
    isMoving = [0,0];
  }

  else{
    playerWorld.location[0] += isMoving[0]/70;
    playerWorld.location[1] += isMoving[1]/70;
  }
 // else{playerWorld.y = isMoving[1];}
  firstTime = false;
  
  requestAnimationFrame(update);
}

//update();*/
