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

let hero = {
    speed: 256,
    x: 0,
    y: 0,
};

let monster = {
    x: 0,
    y: 0
};

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