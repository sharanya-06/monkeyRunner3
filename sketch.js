var bruno;
var brunoImg;
var invisibleGround,grass,grassImg;
var score = 0;
var bombGroup,bombImg;
var reset,resetImg,gameover,gameoverImg,win,winImg;

var banana,bananaImg,bananaGroup;
var gameState = "play";


function preload(){
      bananaImg = loadImage("banana3.png");
    brunoImg = loadAnimation("Monkey1.jpg","Monkey2.jpg","Monkey3.jpg");
    grassImg = loadImage("grass2.jpg");
    bombImg = loadImage("bomb.png");
    resetImg = loadImage("reset2.png");
    gameoverImg = loadImage("gameover.jpg");
    winImg = loadImage("win.png");


  
   
}
function setup(){
    createCanvas(400,240);
    
   
    
    bruno  = createSprite(40,100,20,50);
   // banana = createSprite(200,100,10,10);
    bruno.addAnimation("monkey",brunoImg);
    bruno.scale=0.5;
    //bruno.debug=true;
    bruno.setCollider("rectangle",0,0,100,130);
   // banana.addImage(bananaImg);
   // banana.scale=0.02;
  
    

    grass = createSprite(1000,250,400,20);
    grass.addImage(grassImg);
    grass.scale =1.9;
    grass.x = grass.width /2;
    grass.velocityX = -(6 + 3*score/100);

  
    invisibleGround = createSprite(100,225,400,10);
    invisibleGround.visible = false;

    

    gameover = createSprite(200,100);
  gameover.addImage(gameoverImg);
  gameover.scale=0.15;
  gameover.visible=false;

  win = createSprite(200,100);
  win.addImage(winImg);
  win.scale=0.3;
  win.visible=false;
  
  reset = createSprite(200,140);
  reset.addImage(resetImg);
  reset.scale=0.15;
  reset.visible=false;
  
    bombGroup = new Group();
    bananaGroup = new Group();

    score = 0;
}
function draw(){
    background("255");
    text("Score: "+ score, 300,50,fill('black'),textSize(15));
    if(gameState === "play"){
       //score = score + Math.round(getFrameRate()/60);
      grass.velocityX =-6;// -(6 + 3*score/100);

      if(keyDown("space") && bruno.y >= 129) {
       bruno.velocityY = -15;
      }
    
       bruno.depth +=2;
  
      bruno.velocityY = bruno.velocityY + 0.8
      if (grass.x < 10){
          grass.x = grass.width/2;
        }

      bruno.collide(invisibleGround);
      spawnBanana();
      spawnBomb();

    if(bananaGroup.isTouching(bruno)){
      for(var i =0; i<bananaGroup.length; i++){
        if(bananaGroup[i].isTouching(bruno)){
          bananaGroup[i].destroy();
          score= score+5;
           
        }
         
      }
    }

    if(bombGroup.isTouching(bruno)){
      for(var i =0; i<bombGroup.length; i++){
        if(bombGroup[i].isTouching(bruno)){
          bombGroup[i].destroy();
          score= score-10;
           
        }
         
      }
    }

    if(score === -10){
      gameState = "end";
    }

    if(score === 100){
      gameState ="win";
    }
      
  }

  if (gameState === "end") {
    gameover.visible = true;
    reset.visible = true;

    grass.velocityX = 0;
    bruno.velocityY = 0;
    
    bombGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    bombGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(reset)) {
      restart();
    }
  }

  else if(gameState === "win"){
    win.visible = true;
    reset.visible = true;

    grass.velocityX= 0;
    bruno.velocity = 0;

    bombGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(reset)) {
      restart();
    }


  }
 drawSprites();
    
}

function spawnBanana() {
  if(frameCount % 60 === 0) {
    banana = createSprite(200,180,10,10);

    banana.x = Math.round(random(200,350));
    banana.addImage(bananaImg);
    banana.scale = 0.02;
    banana.velocityX = -3;
    banana.lifetime = 200;
    banana.depth = bruno.depth;
    bruno.depth = bruno.depth + 1;
    bananaGroup.add(banana);
}

}
// bomb = createSprite(200,100,10,10);
//bomb.scale=0.09;

function spawnBomb(){
  if(frameCount % 80 === 0){
    bomb = createSprite(280,180,10,10);
    bomb.y = Math.round(random(90,200));
    bomb.addImage(bombImg);
    bomb.scale = 0.09;
    bomb.velocityX = -3;
    bomb.lifetime= 100;
    bombGroup.add(bomb);

  }
}

function restart(){
  gameState = "play";
  gameover.visible = false;
  reset.visible = false;
  
  bananaGroup.destroyEach();
  bombGroup.destroyEach();
  
  score = 0;
  
}



