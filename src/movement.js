let inBattle = false;
let negativeSpeed = playerWorld.speed * -1;
let firstTime = true;
let movingFunction = false;
let beingCalled = false;

console.log(gameContainer.getBoundingClientRect())

var characterPosition = {
  x: 0,
  y: 0
};

// Assuming character size is known:
var characterWidth = 42; // 420 pixels scaled by 500%
var characterHeight = 24; // 240 pixels scaled by 500%

// Calculate character's next position based on movement
var nextPosition = {
  x: characterPosition.x + isMoving[0],
  y: characterPosition.y + isMoving[1]
};

// Check for collision at the next position
function isColliding(nextX, nextY) {
  // Calculate the index of the cell in the collision map
  var cellX = Math.floor(nextX / (420 / 70)); // Assuming 420 is the width of your background image
  var cellY = Math.floor(nextY / (240 / 40)); // Assuming 240 is the height of your background image

  // Check if the next position is within bounds
  if (cellX >= 0 && cellX < collisionMap[0].length && cellY >= 0 && cellY < collisionMap.length) {
      // Check if the cell contains a collision
      return collisionMap[cellY][cellX] === 1494;
  }
  // If next position is out of bounds, consider it as collision
  return true;
}

// Check if the character is about to collide at the next position
function willCollide() {
  // Calculate the bounding box of the character at the next position
  var nextBoundingBox = {
      left: nextPosition.x,
      right: nextPosition.x + characterWidth,
      top: nextPosition.y,
      bottom: nextPosition.y + characterHeight
  };

  // Check for collision with each corner of the character's bounding box
  return (
      isColliding(nextBoundingBox.left, nextBoundingBox.top) ||
      isColliding(nextBoundingBox.right, nextBoundingBox.top) ||
      isColliding(nextBoundingBox.left, nextBoundingBox.bottom) ||
      isColliding(nextBoundingBox.right, nextBoundingBox.bottom)
  );
}



function isColliding(location){
  console.log(location);
  /*if(collisionsMap[location[1]][location[0]] == 1494){
    //return true;
  }*/
  
  return false;
}


let movingBackground = {

  _x: 0,
  _y: 0,

  set x(xValue){


    if(willCollide()){}//if(isColliding([Math.abs(Math.floor(((this._x-xValue-(gameContainer.getBoundingClientRect().width*5/2)))/30)), Math.abs(Math.floor(((this._y-(gameContainer.getBoundingClientRect().height*5/2)))/30))])==true){}
    else{
      characterPosition = nextPosition;

      this._x -= xValue;
      playerWorld.location[0] = Math.abs(Math.floor(((this._x-(gameContainer.getBoundingClientRect().width*5/2)))/30));
      gameContainer.style.backgroundPositionX = `${this._x}px`
      console.log("equal", gameContainer.style.backgroundPosition)
    }
    return;
  },

  get x(){
    return this._x;
  },

  set y(yValue){
  
    //console.log(yValue)

    //console.log("y-pixel", (this._y-yValue-(gameContainer.getBoundingClientRect().height)/2))

    if(willCollide()){}//if(isColliding([Math.abs(Math.floor(((this._x-(gameContainer.getBoundingClientRect().width*5/2)))/30)), Math.abs(Math.floor(((this._y-yValue-(gameContainer.getBoundingClientRect().height*5/2)))/30))])==true){}
    else{
      characterPosition = nextPosition;
      this._y -= yValue;
      playerWorld.location[1] = Math.abs(Math.floor(((this._y-(gameContainer.getBoundingClientRect().height*5/2)))/30));
      gameContainer.style.backgroundPositionY = `${this._y}px`;
   }
  },

  get y(){
    return this._y
  }

};

const topLeft = [-138, -300];

/*isMoving[1] = 300;
backgroundTransform[0] -= isMoving[0];
gameContainer.style.backgroundPositionX = `${backgroundTransform[0]}px`
backgroundTransform[1] -= isMoving[1];
gameContainer.style.backgroundPositionY = `${backgroundTransform[1]}px`
isMoving = [0,0]*/

movingBackground.y = 300;

function move(){

  let pixelLocation = [movingBackground.x + (gameContainer.getBoundingClientRect().width/2), movingBackground.y + (gameContainer.getBoundingClientRect().height/2)]

  console.log(movingBackground);

  console.log(pixelLocation, "location", [Math.floor(pixelLocation[0]/30), Math.floor(pixelLocation[1]/30)]);

  //console.log("location", playerWorld.location)
  //for x: -140
  //for y: -320
  //for Background Transform: down is down
  //for Background Transform: up is up
  /*playerWorld.location = [Math.abs(Math.floor(((backgroundTransform[0]-140)/1480)*70)), Math.abs(Math.floor(((backgroundTransform[1]-320)/820)*40))];
  console.log("location", playerWorld.location)
  console.log("background", [((backgroundTransform[0]-140)/1480)*70, ((backgroundTransform[1]-320)/820)*40])
  console.log("1val",Math.abs(Math.floor(((backgroundTransform[1]+isMoving[1]-320)/820)*40)-1))
  console.log(collisionsMap[Math.abs(Math.floor(((backgroundTransform[1]+isMoving[1]-320)/820)*40)-1)][Math.abs(playerWorld.location[0])-1]);
  console.log("isMoving", isMoving);

  if(collisionsMap[Math.abs(39-playerWorld.location[1])][Math.abs(39-(Math.floor(((backgroundTransform[0]-isMoving[0]+140)/1480)*70)))]==1494){
    console.log("xcompromised");
    isMoving[0]=0;
  }

  if(collisionsMap[Math.abs(39-(Math.floor(((backgroundTransform[1]-isMoving[1]+320)/820)*40)))][Math.abs(39-playerWorld.location[0])]==1494){
    console.log("ycompromised");
    isMoving[1]=0;
  }

  movingFunction = true;
  backgroundTransform[0] -= isMoving[0];
  gameContainer.style.backgroundPositionX = `${backgroundTransform[0]}px`
  backgroundTransform[1] -= isMoving[1];
  gameContainer.style.backgroundPositionY = `${backgroundTransform[1]}px`*/



  movingBackground.x = isMoving[0];
  movingBackground.y = isMoving[1];
  
  if(isMoving[0] == 0 && isMoving[1] == 0){
    movingFunction = false;
    beingCalled = false;
  }
  else{
    requestAnimationFrame(move);
  }
}

document.addEventListener("keydown", (event) => {

  if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(event.code) > -1) {
        event.preventDefault();
        console.log("hello")
   }

  switch(event.key){
    case "ArrowUp":
      if(isMoving[1]!=negativeSpeed){
        firstMovement = true;
        //fastInterval = setInterval(function(){moveFast([0, negativeSpeed]);}, 5);
        isMoving[1] = negativeSpeed;
        /*movingUp = setInterval(function(){
          backgroundTransform[1] -= isMoving[1];
          gameContainer.style.backgroundPositionY = `${backgroundTransform[1]}px`
        },5000);*/
      }
      break;
    case "ArrowDown":
      if(isMoving[1]!=playerWorld.speed){
        firstMovement = true;
        //fastInterval = setInterval(function(){moveFast([0, playerWorld.speed])}, 5);
        isMoving[1] = playerWorld.speed;
        /*movingDown = setInterval(function(){
          backgroundTransform[1] -= isMoving[1];
          gameContainer.style.backgroundPositionY = `${backgroundTransform[1]}px`
        },5000);*/
      }
      break;
    case "ArrowLeft":
      if(isMoving[0]!=negativeSpeed){
        firstMovement = true;
        //fastInterval = setInterval(function(){moveFast([negativeSpeed, 0])}, 5);
        isMoving[0] = negativeSpeed;
        /*movingLeft = setInterval(function(){
          backgroundTransform[0] -= isMoving[0];
          gameContainer.style.backgroundPositionX = `${backgroundTransform[0]}px`
        },5000);*/
      }
      break;
    case "ArrowRight":
      if(isMoving[0]!=playerWorld.speed){
        firstMovement = true;
        isMoving[0] = playerWorld.speed;
        /*movingRight = setInterval(function(){
          backgroundTransform[0] -= isMoving[0];
          console.log(backgroundTransform);
          gameContainer.style.backgroundPositionX = `${backgroundTransform[0]}px`
        },5000);*/
        //fastInterval = setInterval(function(){moveFast([playerWorld.speed, 0]);}, 5);
      }
      break;
}

if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(event.code) > -1 && movingFunction == false){
  if(beingCalled==false){
    beingCalled = true;
    move();
  }
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
