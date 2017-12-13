class Begin{
  constructor(x,y){
    this.text=5
    this.size=300
    this.x =x;
    this.y= y;

  }
  draw(ctx){
    ctx.font = this.size.toString()+"px Arial";
    ctx.shadowColor = 'black';
    ctx.shadowOffsetY = 8;
    ctx.shadowOffsetX = 8;
    ctx.shadowBlur = 10;
    ctx.textAlign = "center";
    ctx.fillStyle="black"
    if(this.text<1){
      this.text="Go!"
    }
    ctx.fillText(this.text,this.x/2,this.y/2);
    ctx.shadowColor = 'black';
    ctx.shadowOffsetY = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowBlur = 0;


  }
}
