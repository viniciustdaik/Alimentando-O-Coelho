var garden,rabbit,apple,orangeL,redL, greenl;
var gardenImg,rabbitImg,appleImg,orangeImg,redImg, greenimg, grassimg;
var score = 0;
var level = 1;

function preload(){
  gardenImg = loadImage("garden.png");
  rabbitImg = loadImage("rabbit.png");
  appleImg = loadImage("apple.png");
  orangeImg = loadImage("orangeLeaf.png");
  redImg = loadImage("redImage.png");
  greenimg = loadImage("leaf.png");
  grassimg = loadImage("grass.png");
}


function setup(){
  
  createCanvas(400,400);
// Moving background
garden=createSprite(200,200);
garden.addImage(gardenImg);


//creating boy running
rabbit = createSprite(160,340,20,20);
rabbit.scale =0.09;
rabbit.addImage(rabbitImg);
}

function draw() {
  background(0);
  
  // boy moving on Xaxis with mouse'
  rabbit.x = World.mouseX;
  
  edges= createEdgeSprites();
  rabbit.collide(edges);

  

 var select_sprites = Math.round(random(1,4));
 //console.log(select_sprites);
 //console.log(score);

   if (frameCount % 50 == 0) {
     if (select_sprites == 1) {
       createApples();
     } else if (select_sprites == 2) {
       createOrange();
     } else if (select_sprites == 3) {
       createGreen();
      }else {
       createRed();
     }
   }
drawSprites();
}

function createApples() {
apple = createSprite(random(50, 350),40, 10, 10);
apple.addImage(appleImg);
apple.scale=0.07;
apple.velocityY = 3;
apple.lifetime = 150;
apple.depth = rabbit.depth;
rabbit.depth = rabbit.depth+1;
}

function createOrange() {
orangeL = createSprite(random(50, 350),40, 10, 10);
orangeL.addImage(orangeImg);
orangeL.scale=0.08;
orangeL.velocityY = 3;
orangeL.lifetime = 150;
orangeL.depth = rabbit.depth;
rabbit.depth = rabbit.depth+1;
}

function createRed() {
redL = createSprite(random(50, 350),40, 10, 10);
redL.addImage(redImg);
redL.scale=0.06;
redL.velocityY = 3;
redL.lifetime = 150;
redL.depth = rabbit.depth;
rabbit.depth = rabbit.depth+1;
}
function createGreen() {
greenl = createSprite(random(50, 350),40, 10, 10);
greenl.addImage(greenimg);
greenl.scale=0.06;
greenl.velocityY = 3;
greenl.lifetime = 150;
greenl.depth = rabbit.depth;
rabbit.depth = rabbit.depth+1;
}
