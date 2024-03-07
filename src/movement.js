let inBattle;

eventTarget.addEventListener("keydown", (event) => {
  switch(event.keyCode){
    case 38:
      playerWorld.x = playerWorld.speed;
    case 40:
      playerWorld.x = (playerWorld.speed * -1);
    case 37:
      playerWorld.y = (playerWorld.speed * -1);
    case 39:
      playerWorld.y = (playerWorld.speed);
}});
