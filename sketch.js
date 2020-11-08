
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  backImage=loadImage("jungle.png");
  monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 600);
  back=createSprite(300,300,20,20);
back.addImage(backImage);

  var survivalTime=0;
  
  //creating monkey
   monkey=createSprite(80,315,20,20);
   monkey.addAnimation("moving", monkey_running);
  // monkey.addImage(bananaImage)
   monkey.scale=0.1
  
  ground = createSprite(400,590,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)
  ground.visible=false

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
  
 
}


function draw() {
  
  background("white");
  
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  
   
    if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);   
    spawnFood();
    spawnObstacles();
 
  drawSprites();
  

  
    if(obstaclesGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.destroyEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
      text("gameOver",300,300);
    
    
    }
  
  stroke("white");
  textSize(20);
  fill("black");
 text("Score: "+ score, 500,50);
  
 
  
  
  if(FoodGroup.isTouching(monkey)){
    score=score+2
       switch(score){
    case 10:monkey.scale=0.12;
      break;
    
     case 20:monkey.scale=0.14;
      break;
      
     case 30:monkey.scale=0.16;
      break;
      
     case 40:monkey.scale=0.18;
      break;
      default:break;
       }
    FoodGroup.destroyEach()
    
}

}

function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(600,570,40,10);
    banana.y = random(500,520);    
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.05;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,557,10,40);
    obstacle.velocityX = -6;
    
    //add image to the obstacle 
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
    
    
      }
   
  

}