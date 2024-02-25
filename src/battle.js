let background = "";
let buttonAttacks = [attacks[0], attacks[1], attacks[2]];
let options = ["Attack","Defend","Spare"];
let turn = true;
let currentEnemy = enemies[0];



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
  weapons[0].startMoveSword(player, currentEnemy, attack, true);
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
