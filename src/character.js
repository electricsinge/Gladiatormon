var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var effects = [];
var attacks = [];
var weapons = [];
var skills = [];
var player = {};
var exampleimg = [];
exampleimg[0] = 'https://png.pngtree.com/element_our/20190603/ourmid/pngtree-metal-sword-cartoon-weapon-image_1445214.jpg';
var enemies = [];
function reduce(number, denomin) {
    var gcd = function gcd(a, b) {
        return b ? gcd(b, a % b) : a;
    };
    gcd = gcd(number, denomin);
    return [number / gcd, denomin / gcd];
}
function findLevel(xp) {
    xp /= 2;
    xp = Math.sqrt(xp);
    xp = Math.abs(xp);
    xp = Math.floor(xp);
    return xp;
}
function setText(textReference, newText) {
    textReference.innerText = newText;
}
function setPlayerLevelText() {
    setText(document.getElementById("level"), findLevel(player.xp));
}
function setPlayerNameText() {
    setText(document.getElementById("name"), player.name);
}
var effect = /** @class */ (function () {
    function effect(naming, d, colorofe, allowmove) {
        this.name = naming;
        this.damage = d;
        this.color = colorofe;
        this.canmove = allowmove;
    }
    return effect;
}());
effects[0] = new effect("Net", 0, "#808080", false);
var weapon = /** @class */ (function () {
    function weapon(n, d, i) {
        this.name = n;
        this.plusdamage = d;
        this.img = i;
        this.reference = document.getElementById("weapon");
    }
    weapon.prototype.findSlope = function (p1, p2) {
        var y = p2[0] - p1[0];
        var x = p2[1] - p1[1];
        x /= 100;
        y /= 100;
        return [y, x];
    };
    weapon.prototype.movePlayer = function (p, s) {
        p.reference.style.transform = "translate(".concat(s[1], "px, ").concat(s[0], "px)");
    };
    /*moveSword(slope){
       this.reference.style.transform = `translate(${slope[1]}px, ${slope[0]}px)`;
    }*/
    weapon.prototype.inflictDamage = function (enemy, attack) {
        enemy.health -= attack.damage;
        enemy.effect = attack.effect;
    };
    weapon.prototype.startMoveSword = function (player, enemy, attack) {
        var _this = this;
        var slope = this.findSlope([this.reference.getBoundingClientRect().top, this.reference.getBoundingClientRect().left], [enemy.reference.getBoundingClientRect().top + enemy.reference.getBoundingClientRect().height / 2, enemy.reference.getBoundingClientRect().left + enemy.reference.getBoundingClientRect().width / 2]);
        var iterationsofinterval = 0;
        var changingslope = [0, 0];
        var swordslope = [0, 0];
        var originaltoppos = this.reference.getBoundingClientRect().top;
        var intervalId = setInterval(function () {
            if (player.reference.getBoundingClientRect().left <= enemy.reference.getBoundingClientRect().left + enemy.reference.getBoundingClientRect().width / 2) {
                iterationsofinterval = 0;
                _this.inflictDamage(enemy, attack);
                var goBack_1 = setInterval(function () {
                    if (_this.reference.getBoundingClientRect().top == originaltoppos) {
                        clearInterval(goBack_1);
                    }
                    else {
                        iterationsofinterval++;
                        changingslope[0] -= slope[0];
                        changingslope[1] -= slope[1];
                        _this.movePlayer(player, changingslope);
                    }
                }, 5);
                clearInterval(intervalId);
            }
            else {
                iterationsofinterval++;
                var sworditerations = 0;
                changingslope[0] = slope[0] * iterationsofinterval;
                changingslope[1] = slope[1] * iterationsofinterval;
                _this.movePlayer(player, changingslope);
            }
        }, 5); // 100 milliseconds = 0.1 seconds
    };
    return weapon;
}());
weapons[0] = new weapon("Dagger", 5, [attacks[0], attacks[1]], exampleimg[0]);
weapons[1] = new weapon("Net", 2, attacks[2], exampleimg[0]);
var attack = /** @class */ (function () {
    function attack(naming, damageofa, effects, chanceofhit, w) {
        this.name = naming;
        this.damage = damageofa;
        this.effect = effects;
        this.hitpercent = chanceofhit;
        this.weapon = w;
    }
    return attack;
}());
attacks[0] = new attack("Slash", 5, {}, 70, [weapons[0]]);
;
attacks[1] = new attack("Stab", 8, {}, 40, [weapons[0]]);
attacks[2] = new attack("Throw Net", 2, effects[0], 70, [weapons[1]]);
var skill = /** @class */ (function () {
    function skill(n, w, hp) {
        this.name = n;
        this.weapon = w;
        this.plushealth = hp;
    }
    return skill;
}());
var character = /** @class */ (function () {
    function character(n, s, xp, r, hp) {
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
    Object.defineProperty(character.prototype, "health", {
        get: function () {
            return this._health;
        },
        set: function (value) {
            console.log(value);
            this._health = value;
            if (value <= 0) {
                document.getElementById("game-container").style.zIndex = "999999999";
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(character.prototype, "effect", {
        get: function () {
            return this._effect;
        },
        set: function (e) {
            this._effect = e;
        },
        enumerable: false,
        configurable: true
    });
    return character;
}());
var playerCharacter = /** @class */ (function (_super) {
    __extends(playerCharacter, _super);
    function playerCharacter(n, s) {
        return _super.call(this, n, s, 2, document.getElementById("battlecharacter")) || this;
    }
    Object.defineProperty(playerCharacter.prototype, "xp", {
        get: function () {
            return this.exp;
        },
        set: function (value) {
            setPlayerLevelText();
            this.exp = value;
        },
        enumerable: false,
        configurable: true
    });
    return playerCharacter;
}(character));
var enemy = /** @class */ (function (_super) {
    __extends(enemy, _super);
    function enemy(n, s, l, hp) {
        var _this = _super.call(this, n, s, 2, document.getElementById("battlecharacter")) || this;
        _this.level = l;
        _this.health = hp;
        return _this;
    }
    return enemy;
}(character));
skills[0] = new skill("Retiarius", [weapons[0], weapons[1]], 1);
player = new playerCharacter("Elliott", skills[0]);
enemies[0] = new character("Test Dummy", skills[0], 20, document.getElementById("battleopponent"), 0);
