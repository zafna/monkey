var player , player_running,playercollided;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score;
var sc;
var ground,groundImage;
var invisible;
var PLAY=1;
var END=0;
var gameState=1;
var bananaC;
       

function preload(){
  
    player_running =           loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  playercollided = loadAnimation("sprite_1.png");
bananaImage = loadImage("banana.png");
    obstacleImage = loadImage("obstacle.png");
  groundImage = loadImage("snow.PNG");
   
 
}



function setup() {
  
createCanvas(500,500);

  
player = createSprite(100,415,30,30);
player.addAnimation("player",player_running);
player.addAnimation("collided",playercollided);
player.debug = false;  
player.setCollider("rectangle",0,0,40,player.height);  
player.scale = 0.1;
  
ground = createSprite(100,530,1000,5);
ground.addImage("ground",groundImage);
ground.scale = 1.9;  
  
foodGroup = createGroup();
obstacleGroup = createGroup(); 
  
invisible = createSprite(250,460,500,5);
invisible.visible = false;
  
score = 0;
  
//bananaC = 0;
  
sc = 0;  
  
}


function draw() {
  background("white");
  
if(gameState===PLAY){
  
food();
obstacles();
  
if(player.isTouching(foodGroup)){
  
foodGroup.destroyEach();
//bananaC = bananaC + 1;
player.scale = player.scale + 0.01;
sc = sc+2;  
  
}
  
score = score + Math.round(getFrameRate()/60);
  
  if(player.isTouching(obstacleGroup)){
  
gameState=END;
player.scale = 0.1;    
  
}      
}  
  
if(keyDown("space")){
player.velocityY = -15;   

}  
  
player.velocityY = player.velocityY + 0.8;  
  

  
player.collide(ground);
  
obstacleGroup.collide(invisible);  

ground.velocityX = -5;  
  
if (ground.x < 0){
ground.x = ground.width/2;
}

  
switch(score){
    
  case 10: player.scale = 0.12;
  break;
  
  case 20: player.scale = 0.14;
  break;
  
  case 30: player.scale = 0.16;
  break;
  
  case 40: player.scale = 0.18;
  break;
  default:break;
   
}  
    
drawSprites();

fill("blue"); 
textSize(20);  
text("SURVIVAL TIME : "+ score, 150,50); 
  

  
fill("cyan");
textSize(15);
text("score :"+sc,200,90);  
  
if(gameState===END){
  
player.changeAnimation("collided",playercollided);

fill("red")  
textSize(15);
text("GAME OVER!",200,200);
  
player.collide(ground);  

ground.velocityX = 0;
player.velocityY = 0; 
foodGroup.setVelocityXEach(0)
obstacleGroup.setVelocityXEach(0) 
  
obstacleGroup.setLifetimeEach(-1)
foodGroup.setLifetimeEach(-1)
        
}  
  
}

function food(){
  
if(frameCount%100==0){
  
banana = createSprite(490,250,30,30);
banana.y = Math.round(random(220,300));  
banana.addImage("banana",bananaImage);  
banana.scale = 0.05;  
  
banana.velocityX = -5;  
banana.lifetime = 100;
foodGroup.add(banana);  
  
}    
}

function obstacles(){
  
if(frameCount%300==0){
  
obstacle = createSprite(480,450,10,10);  
obstacle.addImage("obstacle",obstacleImage);
obstacle.scale = 0.1;  
  
obstacle.velocityX = -5;  
obstacle.lifetime = 100;  
obstacleGroup.add(obstacle);  
}    
}