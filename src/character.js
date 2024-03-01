let effects = [];
let attacks = [];
let weapons = [];
let skills = [];
let playerBattleData = {};
let exampleimg = [];
exampleimg[0] = 'https://png.pngtree.com/element_our/20190603/ourmid/pngtree-metal-sword-cartoon-weapon-image_1445214.jpg';
let enemies = [];
const playerWeapon = document.getElementById("weaponId");
const enemyWeapon = document.getElementById("enemyWeaponId");

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
var arrnum = 0;
   for (var val = 0; val < arr.length; val++) {
       var newdiff = Math.abs(num - arr[val]);
       if (newdiff < diff) {
           diff = newdiff;
           curr = arr[val];
	   arrnum = val;
       }
   }
   return arrnum;
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
  setText(document.getElementById("level"), findLevel(playerBattleData.xp));
}

function setPlayerNameText(){
  setText(document.getElementById("name"), playerBattleData.name);
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
  constructor(n, d, a, i, r) {
    this.name = n;
    this.plusdamage = d;
    this.attacks = a;
    this.img = i;
    this.reference = r;
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
    turn =! turn;
  }

  
  startMoveSword(attacker, victim, attack, isPlayer){
    console.log("ref", this.reference);
     let slope = this.findSlope([this.reference.getBoundingClientRect().top, this.reference.getBoundingClientRect().left], [victim.reference.getBoundingClientRect().top + victim.reference.getBoundingClientRect().height/2, victim.reference.getBoundingClientRect().left + victim.reference.getBoundingClientRect().width/2]);
  let iterationsofinterval = 0;
  let changingslope = [0,0];
  let swordslope = [0,0];
  let initialAttackerTopPosition = this.reference.getBoundingClientRect().top;
    
  let intervalId = setInterval(() => {
     if (attacker.reference.getBoundingClientRect().left <= victim.reference.getBoundingClientRect().left + victim.reference.getBoundingClientRect().width/2 && isPlayer==true || attacker.reference.getBoundingClientRect().left >= victim.reference.getBoundingClientRect().left - victim.reference.getBoundingClientRect().width/2 && isPlayer==false) {
	     console.log("WHAT", attacker.reference, victim.reference);
       iterationsofinterval = 0;
     this.inflictDamage(victim, attack);
       let goBack = setInterval(() => {
          if (this.reference.getBoundingClientRect().top == initialAttackerTopPosition) {
	    if(turn==false){
		    currentEnemy.attack();
	    }
	    clearInterval(goBack);
          } else {
            iterationsofinterval++;
            changingslope[0] -= slope[0];
            changingslope[1] -= slope[1];
            this.movePlayer(attacker, changingslope);
          }
       }, 5);
       clearInterval(intervalId);
     } else {
       iterationsofinterval++;
       let sworditerations = 0;
       changingslope[0] = slope[0]*iterationsofinterval;
       changingslope[1] = slope[1]*iterationsofinterval;

       
       this.movePlayer(attacker, changingslope);
	     console.log("slope", changingslope);
     }
  }, 5); // 100 milliseconds = 0.1 seconds

    
  }

}

weapons[0] = new weapon("Dagger", 5, [attacks[0], attacks[1]], exampleimg[0], playerWeapon);
weapons[1] = new weapon("Net", 2, attacks[2], exampleimg[0], enemyWeapon);


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
  constructor(n, w, hp, a){
    this.name = n;
    this.weapon = w;
    this.plushealth = hp;
    this.attacks = a;
  }
}

class character{
  constructor(n, s, xp, r, hp){
    this.name = n;
    this.skill = s;
    this.reference = r;
    this.attacks = s.attacks;
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
    super(n,s, findXP(l), document.getElementById("battleopponent"), hp);
    this.level = l;
    this.intelligence = i;
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
  let closestValue = closest((this.skill + Math.floor(Math.random() * 50)), scores);
  console.log("value", closestValue);
  console.log("attacks", attacks);
	let finalAttack = attacks[closestValue].attack;
	console.log("closest", attacks[closest(this.skill, scores)]);
	return finalAttack;
  }


	attack(){
		let finalAttack = this.chooseAction();
		this.skill.weapon.startMoveSword(this, playerBattleData, finalAttack, false);
	}

}

skills[0] = new skill("Retiarius", weapons[0], 1, [attacks[0], attacks[1], attacks[2]]);
skills[1] = new skill("Dummy", weapons[1], 1, [attacks[0], attacks[1], attacks[2]]);
playerBattleData = new playerCharacter("Elliott", skills[0]);
enemies[0] = new enemy("Test Dummy", skills[1], 20, 10, 50, 5);
