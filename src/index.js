import Phaser from "phaser";


//--------constants Start--------
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    
  },
  scene: {
    preload,
    create,
    update
  }
};
const VELOCITY=200;

//--------constants END--------

//--------Variables Start--------
var bird=null;
var spaceKey;
var leftKey;
var rightKey;
var upKey;
var downKey;
var keys;
var stoptheBirdCounter=0;

var game = new Phaser.Game(config);
//--------constants END--------


function preload () {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
}

function create () {
  prepareBird(this);
  initMouse(this);
  initKeyBoard(this);
}

function update(time, delta){
  checkKeyPress();
  checkMouseDown();
  checkBirdStopLogid();
}
function checkKeyPress(){
  if (spaceKey.isDown) {
    myFlap();
  }
  if (leftKey.isDown) {
    myLeftShift();
  }
  if (rightKey.isDown) {
  myRightShift();
  }
  if (upKey.isDown) {
  myFlap();
  }
  if (downKey.isDown) {
  myDown();
  }
}
function checkMouseDown(){
  
}

function checkBirdStopLogid(){
  if(bird.y>=config.height-bird.height){
    if(bird.body.velocity.x==0){
      return;
    }
    stoptheBirdCounter++;
  }
  if(stoptheBirdCounter>100){
    if(bird.body.velocity.x==0){
      return;
    }
    if(Math.abs(bird.body.velocity.x)<=20){
      bird.body.velocity.x=0;
    }
    bird.body.velocity.x=bird.body.velocity.x * 0.8;
    stoptheBirdCounter=0;
  }
}
function prepareBird(gameContext){
  gameContext.add.image(config.width/2,config.height/2  , 'sky');
  bird=gameContext.physics.add.sprite(config.width/10,config.height/2  , 'bird').setOrigin(0);
  //bird.body.velocity.setTo(200, 200);
  bird.body.collideWorldBounds = true;
  bird.body.bounce.set(0.8);
  bird.body.gravity.set(0, 200);
  //bird.body.velocity.x=200;
}
function initKeyBoard(gameContext){
  keys = gameContext.input.keyboard.addKeys('P,H,A,S,E,R');
  spaceKey = gameContext.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  leftKey= gameContext.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
  rightKey= gameContext.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
  upKey= gameContext.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
  downKey= gameContext.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
}
function initMouse(gameContext){
  gameContext.input.on('pointerdown',function(){
    myFlap();
  });
}

function myDown(){
  if(bird.y>=config.height-bird.height ){
    if(stoptheBirdCounter>300){
     return;
    }
  }
  bird.body.velocity.y=200;
}
function myLeftShift(){
  stoptheBirdCounter=0;
  bird.body.velocity.x=-200;
}
function myRightShift(){
  stoptheBirdCounter=0;
  bird.body.velocity.x=200;
}
function myFlap(){
  stoptheBirdCounter=0;
  bird.body.velocity.y=-VELOCITY;
}

