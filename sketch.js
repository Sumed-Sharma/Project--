const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var engine, world;
var backgroundImg;
var canvas;
var player, playerArcher;
var playerArrows = [];
var zombies = [];
var numberOfArrows = 10;
var score = 0;




function preload() {
  backgroundImg = loadImage("Background.jpg");
  zombieImg = loadAnimation("s-removebg-preview.png","T-removebg-preveiw.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  
  engine = Engine.create();
  world = engine.world;

  player = new Player (285, height - 100, 50, 180);
  playerArcher = new PlayerArcher(340, height - 150, 120, 120);

  
  setInterval(spawnZombie, 2000);
}

function draw() {
  background(backgroundImg);

 
  Engine.update(engine);

  
  player.display();
  playerArcher.display();

  for (var i = 0; i < playerArrows.length; i++) {
    showArrows(playerArrows[i], i);
    for (var j = 0; j < zombies.length; j++) {
      if (playerArrows[i] !== undefined && zombies[j] !== undefined) {
        var collision = Matter.SAT.collides(playerArrows[i].body, zombies[j].body);
        if (collision.collided) {
          score++;
          zombies[j].removeFromWorld();
          Matter.Composite.remove(world, playerArrows[i].body);
          playerArrows.splice(i, 1);
          i--;
        }
      }
    }
  }

 
  for (var i = 0; i < zombies.length; i++) {
    zombies[i].display();
  }


  textSize(30);
  fill("white");
  text("Score: " + score, width - 150, 50);
}

function keyPressed() {
  if (keyCode === 32) {
    if (numberOfArrows > 0) {
      var posX = playerArcher.body.position.x + 60;
      var posY = playerArcher.body.position.y - 20;
      var arrow = new PlayerArrow(posX, posY, 70, 10);
      playerArrows.push(arrow);
      numberOfArrows--;
    }
  }
}

function spawnZombie() {
  var zombie = new Zombie(width, height - 60, 50, 100);
  zombies.push(zombie);
}

function showArrows(arrow, index) {
  arrow.display();
  if (arrow.body.position.x > width || arrow.body.position.y > height) {
    Matter.Composite.remove(world, arrow.body);
    playerArrows.splice(index, 1);
  }
}