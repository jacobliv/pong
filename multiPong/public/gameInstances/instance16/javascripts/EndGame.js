class End{
  constructor(x,y,message){
    this.text="Game Over"
    this.size=100
    this.x =x;
    this.y= y;

  }
  draw(ctx){
    ctx.font = "800 "+this.size.toString()+"px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle="#ff9100"
    ctx.shadowColor = 'black';
    ctx.shadowOffsetY = 4;
    ctx.shadowOffsetX = 4;
    ctx.shadowBlur = 10;
    ctx.fillText(this.text,this.x/2,this.y/2);
    ctx.shadowColor = 'black';
    ctx.shadowOffsetY = 0;
    ctx.shadowOffsetX = 0;
  }
}
