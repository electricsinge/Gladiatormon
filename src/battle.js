let background = "";
let buttonAttacks = [attacks[0], attacks[1], attacks[2]];
let options = ["Attack","Defend","Spare"];
let turn = true;
let currentEnemy = enemies[0];
let gameContainer = document.getElementById("game-container");
let playerWalking = document.createElement("div");
playerWalking.style.Id = "playerModel";
gameContainer.appendChild(playerWalking);

function enterBattle(){
  for (var i = 0; i < gameContainer.children.length; i++) { 
    gameContainer.children[i].style.visibility = "visible";
  }
  playerWalking.style.visibility = "hidden";
  gameContainer.innerHTML = `<div id="battlecharacter"><div id="weaponId" class="weapons"></div></div><div id="battleopponent"><div id="enemyWeaponId" class="weapons"></div></div><div id="infosection"><info id="name"></info><br><info>Level: <info id="level"></info></info><div id="btn-group"><button onclick=clickButton(0)></button><button onclick=clickButton(1)></button><button onclick=clickButton(2)></button></div></div><button id="backarrow" onclick=backclick()></button></div>`;
}

function leaveBattle(){
  for (var i = 0; i < gameContainer.children.length; i++) { 
    gameContainer.children[i].style.visibility = "hidden";
  }
  playerWalking.style.visibility = "visible";
  gameContainer.style.backgroundImage = "url('Images/Gladiatormon-WorldMap.png')";
  gameContainer.style.backgroundSize = "500%";
}

leaveBattle();

let attackonbuttons = false;
let attacking = false;

let buttonText = {
 _text: [],

 get text() {
    return this._text;
 },

 set text(value) {
   this._text = value;
   for (let i = 0; i < document.getElementById('btn-group').querySelectorAll('button').length; i++) {
      document.getElementById('btn-group').querySelectorAll('button')[i].innerText = this._text[i].name;
      if(this._text[i].name == undefined){
        document.getElementById('btn-group').querySelectorAll('button')[i].innerText = this._text[i];
      }
   }
 }
};



function pressAttack(attack){
  weapons[0].startMoveSword(playerBattleData, currentEnemy, attack, true);
}


  
function clickButton(index){
  if(!attacking){
    if(index==0){
      document.getElementById("backarrow").style.visibility = "visible";
      buttonText.text = attackoptions();
      attacking = true;
    }
  }
  else if(attacking){
    if(turn==true){
      pressAttack(buttonAttacks[index]);
    }
  }
}

 function attackoptions(){
  attackonbuttons = attackonbuttons ? false : true;
  return attackonbuttons ? options : buttonAttacks;
}



function backclick(){
  attacking = false;
  document.getElementById("backarrow").style.visibility = "hidden";
  buttonText.text = attackoptions();
}

function battleBegin(){

  setPlayerLevelText();
  setPlayerNameText();
  buttonText.text = attackoptions();

}

battleBegin();
