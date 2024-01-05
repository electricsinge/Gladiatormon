let effects = [];
let attacks = [];
let weapons = [];
let skills = [];
let player = {};
let exampleimg = [];
exampleimg[0] = 'https://png.pngtree.com/element_our/20190603/ourmid/pngtree-metal-sword-cartoon-weapon-image_1445214.jpg';
let enemies = [];


function reduce(number,denomin){ 
var gcd = function gcd(a,b){ 
    return b ? gcd(b, a%b) : a; 
}; 
gcd = gcd(number,denomin); 
return [number/gcd, denomin/gcd]; 
}

function closest(num, arr) {
   var curr = arr[0];
   var diff = Math.abs(num - curr);
   for (var val = 0; val < arr.length; val++) {
       var newdiff = Math.abs(num - arr[val]);
       if (newdiff < diff) {
           diff = newdiff;
           curr = arr[val];
       }
   }
   return curr;
}


function findLevel(xp){
  xp/=2;
  xp = Math.sqrt(xp);
  xp = Math.abs(xp);
  xp = Math.floor(xp);
  return xp;
}

function findXP(level){
  level = Math.pow(level, 2)
  level*=2;
}

function setText(textReference, newText){
  textReference.innerText = newText;
}

function setPlayerLevelText(){
  setText(document.getElementById("level"), findLevel(player.xp));
}

function setPlayerNameText(){
  setText(document.getElementById("name"), player.name);
}


class effect{
  constructor(naming, d, colorofe, allowmove){
    this.name = naming;
    this.damage = d;
    this.color = colorofe;
    this.canmove = allowmove;
  }
}

effects[0] = new effect("Net", 0, "#808080", false);

class weapon{
  constructor(n, d, i) {
    this.name = n;
    this.plusdamage = d;
    this.img = i;
    this.reference = document.getElementById("weapon");
  }
  
  findSlope(p1, p2){
     let y = p2[0] - p1[0];
     let x = p2[1] - p1[1];
     x/=100;
     y/=100;
     return [y, x];
  }

  movePlayer(p, s){
     p.reference.style.transform = `translate(${s[1]}px, ${s[0]}px)`;
  }


  inflictDamage(enemy, attack){
    enemy.health -= attack.damage;
    enemy.effect = attack.effect;
  }

  
  startMoveSword(player, enemy, attack){
     let slope = this.findSlope([this.reference.getBoundingClientRect().top, this.reference.getBoundingClientRect().left], [enemy.reference.getBoundingClientRect().top + enemy.reference.getBoundingClientRect().height/2, enemy.reference.getBoundingClientRect().left + enemy.reference.getBoundingClientRect().width/2]);
  let iterationsofinterval = 0;
  let changingslope = [0,0];
  let swordslope = [0,0];
  let originaltoppos = this.reference.getBoundingClientRect().top;
    
  let intervalId = setInterval(() => {
     if (player.reference.getBoundingClientRect().left <= enemy.reference.getBoundingClientRect().left + enemy.reference.getBoundingClientRect().width/2) {
       iterationsofinterval = 0;
     this.inflictDamage(enemy, attack);
       let goBack = setInterval(() => {
          if (this.reference.getBoundingClientRect().top == originaltoppos) {
            turn = !turn;
	    clearInterval(goBack);
          } else {
            iterationsofinterval++;
            changingslope[0] -= slope[0];
            changingslope[1] -= slope[1];
            this.movePlayer(player, changingslope);
          }
       }, 5);
       clearInterval(intervalId);
     } else {
       iterationsofinterval++;
       let sworditerations = 0;
       changingslope[0] = slope[0]*iterationsofinterval;
       changingslope[1] = slope[1]*iterationsofinterval;

       
       this.movePlayer(player, changingslope);
     }
  }, 5); // 100 milliseconds = 0.1 seconds

    
  }

}

weapons[0] = new weapon("Dagger", 5, [attacks[0], attacks[1]], exampleimg[0]);
weapons[1] = new weapon("Net", 2, attacks[2], exampleimg[0]);


class attack{
  constructor(naming, d, effects, chanceofhit, w, r) {
    this.name = naming;
    this.damage = d;
    this.effect = effects;
    this.hitPercent = chanceofhit;
    this.weapon = w;
    this.type = {};
	this.risk = r;
  }
}

attacks[0] = new attack("Slash", 5, {}, 70, [weapons[0]]);;
attacks[1] = new attack("Stab", 8, {}, 40, [weapons[0]]);
attacks[2] = new attack("Throw Net", 2, effects[0], 70, [weapons[1]]);

class skill{
  constructor(n, w, hp){
    this.name = n;
    this.weapon = w;
    this.plushealth = hp;
  }
}

class character{
  constructor(n, s, xp, r, hp){
    this.name = n;
    this.skill = s;
    this.reference = r;
    this.attacks = [];
    this._effect;
    this._health = hp + s.plushealth;
    this.gold = 0;
    this.weapon = s.weapon;
    this.exp = xp;
  }

  get health(){
    return this._health;
  }

  set health(value){
    console.log(value);
    this._health = value;
    if(value<=0){
      
    }
  }
  
  get effect(){
    return this._effect;
  }
  set effect(e){
    this._effect = e;
  }
}

class playerCharacter extends character{
  constructor(n, s){
    super(n,s, 2, document.getElementById("battlecharacter"));
  }
    
   get xp() {
       return this.exp;
   }

   set xp(value) {
     setPlayerLevelText();
     this.exp = value;
   }
}

class enemy extends character{
  constructor(n, s, l, hp, i, r){
    super(n,s, findXP(l), document.getElementById("battlecharacter"), hp);
    this.level = l;
    this.skill = i;
    this.riskLevel = r;
  }
  
  chooseAction(){
    let actions = this.attacks;
    let attacks = [];
	let scores = [];

    for(let i = 0; i < actions.length; i++){
       attacks[i] = {
          attack: actions[i],
	  score: 0
       }

       attacks.score += actions[i].damage;

       attacks.score -= Math.abs(this.riskLevel - actions[i].risk);
	    
	attacks.score -= Math.abs(this.skill - actions[i].hitPercent);

	scores[i] = attacks[i].score;
    }

	let finalAttack = attacks[closest(this.intelligence + Math.floor(Math.random() * 50), scores)].attack;
	return finalAttack;
  }


	attack(){
		let finalAttack = chooseAction();
		console.log(finalAttack);
	}

}

skills[0] = new skill("Retiarius", [weapons[0], weapons[1]], 1);
player = new playerCharacter("Elliott", skills[0]);
enemies[0] = new enemy("Test Dummy", skills[0], 20, 0, 50);
