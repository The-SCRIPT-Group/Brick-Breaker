var width, height, size, block = [], ball, player, playerWidth = 80, playerHeight, speed = 1, diameter, offset = 50, steps = 5, alive, dead, theta;
function setup() {
  theta = PI / 3;
  height = 600;
  width = 900;
  size = 30;
  diameter = size / 2;
  rows = 4;
  playerHeight = size / 2;
  createCanvas(width, height);
  ctr = 0;
  ball = new Ball();
  player = new Player();
  for (var i = 0; i < width; i += size) {
    for (var j = 0; j < size * rows; j += size) {
      block[ctr++] = new Block(i + size / 2, j + size / 2, random(50, 255), random(50, 255), random(50, 255));
    }
  }
  alive = block.length;
}

function draw() {
  for (var i = 0; i < steps; i++) {
    background(0);
    showBlocks();
    checkBlocks();
    checkPlayer();
    checkWall();
    checkLoss();
    player.update();
    player.show();
    ball.update();
    ball.show();
  }
}

function showBlocks() {
  for (var i = 0; i < block.length; i++) {
    block[i].show();
  }
}


function mousePressed() {
  ball.xSpeed = speed * cos(theta);
  ball.ySpeed = -speed * sin(theta);
}

function checkWall() {
  if (ball.x <= 0 + size / 4 || ball.x >= width - size / 4) {
    ball.xSpeed *= -1;
  }
  if (ball.y <= 0 + size / 4 || ball.y >= height - size / 4) {
    ball.ySpeed *= -1;
  }
}


function checkPlayer() {
  if ((ball.y + diameter / 2 > (player.y - playerHeight / 2)) && (ball.x > player.x - playerWidth / 2 && ball.x < player.x + playerWidth / 2)) {
    ball.ySpeed *= -1;
    let offset = abs(player.x - ball.x);
    let angle = map(offset, 0, playerWidth / 2, 2, 6);
    console.log(offset, angle);
    if (ball.x > player.x){
      ball.xSpeed = speed * cos(PI/angle);
      ball.ySpeed = -speed * sin(PI/angle);
    }
    else {
      ball.xSpeed = -speed * cos(PI/angle);
      ball.ySpeed = -speed * sin(PI/angle);
    }
  }
}

function checkLoss() {
  if (ball.y > player.y) {
    alert("YOU LOSE, YOU DUMB BITCH!");
    ball = new Ball();
  }
}

function checkBlocks() {
  for (var i = 0; i < block.length; i++) {
    if (ball.x + diameter / 2 >= block[i].x - size / 2 && ball.x - diameter / 2 <= block[i].x + size / 2 && ball.y + diameter / 2 >= block[i].y - size / 2 && ball.y - diameter / 2 <= block[i].y + size / 2) {
      d = [];
      d[0] = dist(ball.x, ball.y, block[i].x - 15, block[i].y);
      d[1] = dist(ball.x, ball.y, block[i].x + 15, block[i].y);
      d[2] = dist(ball.x, ball.y, block[i].x, block[i].y - 15);
      d[3] = dist(ball.x, ball.y, block[i].x, block[i].y + 15);
      miniPos = d.indexOf(Math.min(...d))
      if (miniPos > 1)
        ball.ySpeed *= -1;
      else
        ball.xSpeed *= -1;
      block.splice(i, 1);
      break;
    }
  }
}