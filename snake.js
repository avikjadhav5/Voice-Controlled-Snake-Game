class Snake{
  constructor(){
    this.body = [];
    this.body[0] = createVector(w/2,h/2);
    this.xdir = 0;
    this.ydir = 0;
  }
  setDirn(x,y){
    this.xdir = x;
    this.ydir = y;
  }
   update(){
     let head = this.body[this.body.length - 1].copy();
     this.body.shift();
     head.x = this.xdir + head.x;
     head.y = this.ydir + head.y;
     this.body.push(head);
   }
  grow(){
    let head = this.body[this.body.length - 1].copy();
    this.body.push(head);
  }
  eat(food_position){
    let x = this.body[this.body.length - 1].x;
    let y = this.body[this.body.length - 1].y;
    if(x == food_position.x && y == food_position.y){
      console.log("Food Eaten");
      this.grow();
      return true;
    }
  }
  endGame(){
    let headx = this.body[this.body.length - 1].x;
    let heady = this.body[this.body.length - 1].y;
    
    if(headx>w-1 || headx<0 || heady > h-1 || heady < 0){
      return true;
    }
    for(let i = 0; i<this.body.length-1; i++){
      let part = this.body[i];
      if(part.x == headx && part.y == heady){
        return true;
      }
    }
    return false;
  }
  show(){
    
    for(let i = 0; i<this.body.length; i++){
      noStroke();
      fill(0,255,0);
      rect(this.body[i].x,this.body[i].y,1,1);
    }
   
  }
}