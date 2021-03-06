var garden,rabbit, hitbox;//, apple,orangeL,redL, greenl;
var gardenImg,rabbitImg,appleImg,orangeImg,redImg, greenimg, grassimg;
var appleG, orangelG, greenlG, redlG;
var score = 1;
var highscore = 1;
var gamestate = "play";

var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

function preload(){
  gardenImg = loadImage("gardenog.png");
  rabbitImg = loadImage("rabbit.png");
  appleImg = loadImage("apple.png");
  orangeImg = loadImage("./leaves/orangeLeaf.png");
  redImg = loadImage("./leaves/redImage.png");
  greenimg = loadImage("./leaves/leaf.png");
  grassimg = loadImage("grass.png");
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  // Moving background
  garden = createSprite(width/2, height/2, windowWidth, windowHeight);
  garden.visible = false;
  //200, 200 //width/2, height, windowWidth, windowHeight
  //garden.addImage("gardenimg", gardenImg);
  

  //creating boy running
  rabbit = createSprite(width/2, windowHeight-60,20,20);//160, 340
  rabbit.scale = 0.09;
  rabbit.addImage("rabbitimg", rabbitImg);
  //rabbit.debug = true;
  hitbox = createSprite(width/2, 340, 20, 20);
  hitbox.addImage("rabbitimg", rabbitImg);
  hitbox.scale = 0.09;
  hitbox.visible = false;
  //hitbox.debug = true;
  hitbox.setCollider("rectangle", 0, 160, 425, 855);
  
  edges = createEdgeSprites();

  appleG = new Group();
  redlG = new Group();
  orangelG = new Group();
  greenlG = new Group();
}

function draw() {
  background('lightgreen');
  image(gardenImg, 0, 0, width, height);
  fill('gold');
  stroke('green');
  textSize(20);
  text("Vidas: "+score, 10, 30);
  text("Maior Vidas Ganhadas: "+highscore, 10, 55);
  
  //console.log(select_sprites);
  var select_sprites = Math.round(random(1,4));
  hitbox.x = rabbit.x;
  hitbox.y = rabbit.y;
 
  if(gamestate == "play"){
    // boy moving on Xaxis with mouse'
    rabbit.x = World.mouseX;
    if(score > highscore){
      highscore = score;
    }
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
  }
  rabbit.collide(edges);
  
  if(hitbox.isTouching(redlG)){
    /*score = score - 1
    for(var redL of redlG){
      if(hitbox.isTouching(redL)){
        redL.destroy();
      }
    }*/
    handleItem(redlG, "redL", false);
    //redlG.destroyEach();
  }
  if(hitbox.isTouching(greenlG)){
    /*score = score - 1
    for(var greenl of greenlG){
      if(hitbox.isTouching(greenl)){
        greenl.destroy();
      }
    }*/
    handleItem(greenlG, "greenl", false);
    //greenlG.destroyEach();
  }
  if(hitbox.isTouching(orangelG)){
    /*score = score - 1
    for(var orangeL of orangelG){
      if(hitbox.isTouching(orangeL)){
        orangeL.destroy();
      }
    }*/
    handleItem(orangelG, "orangeL", false);
    //orangelG.destroyEach();
  }
  if(hitbox.isTouching(appleG)){
    /*score = score + 1;
    for(var apple of appleG){
      if(hitbox.isTouching(apple)){
        apple.destroy();
      }
    }*/
    handleItem(appleG, "apple", true);
    //appleG.destroyEach();
  }
  if(score < 1){
    gamestate = "end";
  }
  if(gamestate == "end"){
    fill('cyan');
    stroke('green');
    if(isMobile){
      text("Toque Para Jogar De Novo!", width / 2 - 150, height / 2);
    }else{
      text("Clique Para Jogar De Novo!", width / 2 - 150, height / 2);
    }
    //garden.visible = false;
    rabbit.visible = false;
    redlG.destroyEach();
    greenlG.destroyEach();
    appleG.destroyEach();
    orangelG.destroyEach();
    if(mousePressedOver(rabbit)
    ||mousePressedOver(garden)
    ||touches.length > 0){
      touches = [];
      reset();
    }
  }
  
 
 
  console.log("Vidas: "+score);
  console.log("Maior Vidas Ganhadas: "+highscore);

   
  drawSprites();
}

function createApples() {
  var apple = createSprite(random(50, width - 50), 40, 10, 10);
  apple.addImage(appleImg);
  apple.scale = 0.07;
  apple.velocityY = 3;
  apple.lifetime = 650;
  apple.depth = rabbit.depth;
  rabbit.depth = rabbit.depth+1;
  appleG.add(apple);
}

function createOrange() {
  var orangeL = createSprite(random(50, width - 50), 40, 10, 10);
  orangeL.addImage(orangeImg);
  orangeL.scale = 0.08;
  orangeL.velocityY = 3;
  orangeL.lifetime = 650;
  orangeL.depth = rabbit.depth;
  rabbit.depth = rabbit.depth+1;
  orangelG.add(orangeL);
}

function createRed() {
  var redL = createSprite(random(50, width - 50), 40, 10, 10);
  redL.addImage(redImg);
  redL.scale = 0.06;
  redL.velocityY = 3;
  redL.lifetime = 650;
  redL.depth = rabbit.depth;
  rabbit.depth = rabbit.depth+1;
  redlG.add(redL);
}

function createGreen() {
  var greenl = createSprite(random(50, width - 50), 40, 10, 10);
  greenl.addImage(greenimg);
  greenl.scale = 0.06;
  greenl.velocityY = 3;
  greenl.lifetime = 650;
  greenl.depth = rabbit.depth;
  rabbit.depth = rabbit.depth+1;
  greenlG.add(greenl);
}

function reset(){
  //garden.visible = true;
  rabbit.visible = true;
  gamestate = "play";
  rabbit.x = width/2;
  rabbit.y = windowHeight-60;
  score = 1;

}

function handleItem(itemG, item, food){
  for(var item of itemG){
    if(hitbox.isTouching(item)){
      item.destroy();
    }
  }

  if(food == true){
    score = score + 1;
  }else{
    score = score - 1;
  }

}
