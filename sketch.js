let score = 0;
let snake;
let classifier;
let w;
let h;
let rez = 10;
let food;
let img;
let ans = '';
function setup() {
  createCanvas(400, 400);
  classifier = ml5.soundClassifier('SpeechCommands18w',modelReady); 
  img = loadImage("soil/s.jpg");
  frameRate(7);
  w = floor(width/rez);
  h = floor(height/rez);
  snake = new Snake();
  foodLocation();
}
function modelReady(){
    console.log('Yeah model ready')
  classifier.classify(gotResult);
}
function gotResult(error,result){
  if(error){
    console.log('error');
  }
  else{
    console.log(result[0].label);
    ans = result[0].label;
    voiceControl(ans);
  }
}
function foodLocation(){
  let x = floor(random(w));
  let y = floor(random(h));
  food = createVector(x,y);
}
function voiceControl(ans){
  if(ans == 'left'){
    snake.setDirn(-1,0);
  }
   else if(ans == 'right'){
    snake.setDirn(1,0);
  }
   else if(ans == 'up'){
    snake.setDirn(0,-1);
  }
   else if(ans == 'down'){
    snake.setDirn(0,1);
  }
}
function draw() {
  scale(rez);
  background(img);
  if(snake.eat(food)){
    score+=5;
    foodLocation();
  }
  snake.update();
  snake.show();
  if(snake.endGame()){
    console.log("Game Over");
    background(255,0,0);
    noLoop();
    fill(0);
    textSize(3);
    text("Game Over", w/2, h/2);
    text("Score = "+score, w/2, h/2+3);
  }
  noStroke();
  fill(255,0,0);
  rect(food.x,food.y,1,1);
}