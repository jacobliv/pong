class RandDir{
  constructor(){
    this.name="randomDir"
    this.x =Math.floor(Math.random()* (900 - 300) + 300 )
    this.y = Math.floor(Math.random()* (500 - 200) + 200 )
    this.r = 20
    this.image = document.getElementById('randomDir');
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
    ctx.drawImage(this.image,this.x-this.r,this.y-this.r,this.r+this.r,this.r+this.r)
    ctx.lineWidth=1;
    ctx.stroke();
    ctx.arc(this.x, this.y, this.r+1, 0, 2 * Math.PI);
    //ctx.fillStyle="	#FFFF00";
    //ctx.fill()


  }
}
