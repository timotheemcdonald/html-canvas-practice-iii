let canvas = document.getElementById('canvas1');
let ctx = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 480;

let bgReady = false;
let bgImage = new Image();
bgImage.onload = function (){
    bgReady = true;
};
bgImage.src = "./background.png"

let heroReady = false;
let heroImage = new Image();
heroImage.onload = function(){
    heroReady = true;
};
heroImage.src = "./hero.png"

let monsterReady = false;
let monsterImage = new Image();
monsterImage.onload = function(){
    monsterImage = true;
};
monsterImage.src = "./monster.png"

// let hero = {
//     speed: 256,
//     x: 0,
//     y: 0,
// };

// let monster = {
//     x: 100,
//     y: 50,
// };

let hero = {
    speed: 256
}
let monster = {};

let monstersCaught = 0;

let keysDown = {};

//e.keycode is deprecated use e.key instead
addEventListener("keydown", function(e){
    keysDown[e.key] = true;
    console.log(e.key)
}, false);

addEventListener("keyup", function(e) {
    delete keysDown[e.key];
}, false);

//New Game Function
let reset = function(){
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;
//randomly spawn monster position
    monster.x = 32 + (Math.random() * (canvas.width - 96));
    monster.y = 32 + (Math.random() * (canvas.height - 96));
}

//update game objects
let update = function(modifier){
    if('ArrowUp' in keysDown){
        hero.y -= hero.speed * modifier;
    };
    if('ArrowDown' in keysDown){
        hero.y += hero.speed * modifier;
    };
    if('ArrowLeft' in keysDown){
        hero.x -= hero.speed * modifier;
    };
    if('ArrowRight' in keysDown){
        hero.x += hero.speed * modifier;
    };

    if (
        hero.x <= (monster.x +32)
        && monster.x <= (hero.x + 32)
        && hero.y <= (monster.y + 32)
        && monster.y <= (hero.y + 32)
    ){
        ++monstersCaught;
        reset();
    }
};

//render to screen
let render = function(){
    if(bgReady){
        ctx.drawImage(bgImage, 0, 0);
    }
    if(heroReady){
        ctx.drawImage(heroImage, hero.x, hero.y);
    }
    if(monsterReady){
        ctx.drawImage(monsterImage, monster.x, monster.y);
    }

    //Score
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Monsters caught: " + monstersCaught, 32, 32);
};

//game loop
let main = function(){
    let now = Date.now();
    let delta = now - then;

    update(delta / 1000);
    render();

    then = now;
    requestAnimationFrame(main);
};

let w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

let then = Date.now();
reset();
main();