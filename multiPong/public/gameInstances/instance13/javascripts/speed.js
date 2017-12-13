class Speed{
  constructor(){
    this.name="speed"
    this.x =Math.floor(Math.random()* (900 - 300) + 300 )
    this.y = Math.floor(Math.random()* (500 - 200) + 200 )
    this.r = 10
  }
  random(bottom,top){
    var rand = Math.floor(Math.random()* 2 )
    if(rand == 1){
      return Math.floor(Math.random()* (top - bottom) + bottom )
    }
    else{
      return -(Math.floor(Math.random()* (top - bottom) + bottom) )
    }
  }

  draw(ctx,puck){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fillStyle="#4286f4";

    ctx.fill()
    ctx.lineWidth=1;
    ctx.stroke();

  }
}
