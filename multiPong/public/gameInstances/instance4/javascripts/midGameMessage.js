class mid{
  constructor(x,y,message){
    this.text=message
    this.size=300
    this.x =x;
    this.y= y;

  }
  draw(ctx){
    ctx.font = this.size.toString()+"px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle="black"
    ctx.fillText(this.text,this.x/2,this.y/2);


  }
}
