var sound;
var ghost, ghostImage;
var towerImage, tower;
var door,doorImage;
var climber, climberImage;
var climberGroup, doorGroup;
var invisibleBlock, invisibleGroup;
var END = 0;
var PLAY = 1;
var gameState = PLAY;

function preload(){
  ghostImage = loadImage("ghost-standing.png");
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  sound = loadSound("spooky.wav");
  
}
function setup(){
 createCanvas(600,600);
  tower = createSprite(300,300,10,10);
  tower.addImage ("tower", towerImage);
  tower.velocityY = 3;
  
  ghost = createSprite (300,300,10,10);
  ghost.addImage ("ghost", ghostImage);
  ghost.scale = 0.5;
  
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleGroup = new Group();
  
  sound.loop();
}
function draw(){
  background(255);
 if (gameState == PLAY){
if (tower.y >600){
  tower.y = 300;
}
  if (keyDown("space")){
      ghost.velocityY = -4;
}
  ghost.velocityY = ghost.velocityY + 0.7;
  if (keyDown("right_arrow")){
    ghost.x = ghost.x + 2;
}
  if (keyDown("left_arrow")){
    ghost.x = ghost.x - 2;
}
  if (ghost.isTouching(climberGroup)){
    ghost.velocityY = 0;
}
  if (ghost.isTouching(invisibleGroup) || ghost.y > 600){
    gameState = END;
    ghost.destroy();
}
  spawnDoor();
  drawSprites();
}
  if (gameState == END){
    textSize(30);
    fill("black");
    text("Game Over", 300,300);
    sound.stop();
}
}
function spawnDoor(){
  if (frameCount % 200 === 0){
    door = createSprite(350,0,10,10);
    door.addImage ("door", doorImage);
    door.velocityY = 3; 
    door.x = Math.round(random(120,450));
    door.lifetime = 605;
    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;
    climber = createSprite(350,60,10,10);
    climber.addImage ("climber", climberImage);
    climber.velocityY = door.velocityY;
    climber.x = door.x;
    climber.lifetime = door.lifetime;
    invisibleBlock = createSprite (350,75,climber.width, 2);
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = door.velocityY;
    invisibleBlock.visible = false;
    climberGroup.add(climber);
    doorGroup.add(door);
    invisibleGroup.add(invisibleBlock);
    }
}