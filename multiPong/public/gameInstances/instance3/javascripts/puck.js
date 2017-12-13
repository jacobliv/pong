class Puck{

  constructor(relation,radius,x,y,top,bottom,zero){
    this.x = x || 600;
    this.y = y || 350;
    this.r = radius ||15;
    this.zero=zero||false;
    if(!zero){
      this.velX = this.random(bottom||10,top||15)
      this.velY = this.random(bottom||10,top||15)
    }
    else{
      this.velX = 0
      this.velY = 0
    }

    this.width = document.getElementById('canvas').width
    this.height = document.getElementById('canvas').height

    this.force = 0;
    this.velXMax = this.velX;
    this.velYMax = this.velY;
    this.upgradeTime = 0;
    this.image = document.getElementById('puck');
    this.upgraded=false;
    this.rotateAngle =0;
    this.relation = relation ||"parent"
    this.particles =[]
    this.opacity=1;
    this.time=0;

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
  move(){
    this.x +=this.velX;
    this.y+=this.velY;
  }
  edges(paddle){

    if(paddle[0] == undefined || paddle[0]== null){
      if(this.x -this.r < 0){
        this.x=this.r
        this.velX*=-1;
      }
    }
    else if(paddle.length >2){
      if(this.x-this.r < 0 && (this.y >0 && this.y < 150 || this.y > this.height-150 && this.y < this.height)){
        this.x=this.r;
        this.velX*=-1
      }
    }


    if(paddle[1] == undefined ||paddle[1]== null){
      if(this.x +this.r > this.width){
        this.x=this.width-this.r
        this.velX*=-1;
      }
    }
    else if(paddle.length >2){
      if(this.x+this.r > this.width && (this.y >0 && this.y < 150 || this.y > 550 && this.y < this.height)){
        this.x=this.width-this.r;
        this.velX*=-1
      }
    }
    if(paddle[2] == undefined ||paddle[2]== null){
      if(this.y -this.r < 0){
        this.y=this.r
        this.velY*=-1;
      }
    }
    else if(paddle.length >2){
      if(this.y-this.r < 0 && (this.x >0 && this.x < this.width/3 || this.x > this.width-this.width/3 && this.x < this.width)){
        this.y=this.r;
        this.velY*=-1
      }
    }

    if(paddle[3] == undefined ||paddle[3]== null){
      if(this.y +this.r > this.height){
        this.y=this.height-this.r
        this.velY*=-1;
      }
    }
    else if(paddle.length >2){
      if(this.y+this.r > this.height && (this.x >0 && this.x < this.width/3 || this.x > this.width-this.width/3 && this.x < this.width)){
        this.y=this.height-this.r;
        this.velY*=-1
      }
    }

    // if(this.y+this.r > 700){
    //   this.y=700-this.r
    //   this.velY*=-1;
    // }
    // if(this.y-this.r < 0){
    //   this.y=this.r;
    //   this.velY*=-1
    // }
  }

  paddleColl(paddle){
    // Paddle behaves like a moving wall
    // if(this.x-this.r < paddle.x+(paddle.width/2)  && this.y < paddle.y+(paddle.height)+(paddle.width/2) && this.y > paddle.y-(paddle.width/2)){
    //   this.x=paddle.x+(paddle.width/2)+this.r
    //   this.velX *=-1.1;
    // }
    if(paddle[0] != undefined){
      // Paddle behaves like a moving wall
      if(this.x-this.r < paddle[0].x+(paddle[0].width/2)  && this.y < paddle[0].y+(paddle[0].height)+(paddle[0].width/2) && this.y > paddle[0].y-(paddle[0].width/2)){
        this.x=paddle[0].x+(paddle[0].width/2)+this.r
        this.velX *=-1.1;
      }
    }

    if(paddle[1] !=undefined){
      if(this.x+this.r>paddle[1].x  && this.y < paddle[1].y+(paddle[1].height)+(paddle[1].width/2) && this.y > paddle[1].y-(paddle[1].width/2)){
        this.x=paddle[1].x-(paddle[1].width/2)-this.r
        this.velX *=-1.1;
      }
    }

    if(paddle[2] !=undefined){

      if(this.y-this.r<paddle[2].y+(paddle[2].height/2) && this.x> paddle[2].x-paddle[2].width/2 - paddle[2].height/2 && this.x < paddle[2].x+paddle[2].width/2 + paddle[2].height/2){
        this.y=paddle[2].y+(paddle[2].height/2)+this.r
        this.velY *=-1.1;
      }
    }
    if(paddle[3] != undefined){
      if(this.y+this.r>paddle[3].y-(paddle[3].height/2) && this.x> paddle[3].x-paddle[3].width/2 - paddle[3].height/2 && this.x < paddle[3].x+paddle[3].width/2 + paddle[3].height/2){
        this.y=paddle[3].y-(paddle[3].height/2)-this.r
        this.velY *=-1.1;
      }
    }
  }

  upgradeColl(upgrade){
    var index=0;
    for(var ups of upgrade){
      var dx = this.x - ups.x;
      var dy = this.y - ups.y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.r + ups.r) {
        //console.log("Hit!")
        if(ups.name=="randomDir"){
         this.velX *=this.random(1,1)
         this.velY *=this.random(1,1)
         for(let i =0; i <20; i++){
           this.particles.push(new Puck("child",Math.random()*2,this.x,this.y,8,3))
         }

       }
       else if(ups.name=="speed"){
         this.velX *=1.2
         this.velY *=1.2
         this.particles.push(new Puck("speed",this.r,this.x,this.y,0,0))
         this.time=4000;

       }
          //CODE FOR SPEED
          upgrade.splice(index,1);


      }

      index++;
    }
  }

  deleteParticle(){
    var i =0;
    for(var p of this.particles){
      if(p.opacity <=0){
        this.particles.splice(i,1)
      }
      i++;
    }
  }

  draw(ctx,paddle,upgrades){

    ctx.beginPath();
    if(this.relation =="child" ||this.relation =="speed" ){
      ctx.globalAlpha =this.opacity;
      this.opacity-=.1
      if(this.opacity<0){
        this.opacity=0;
      }
    }
    if(this.time>0){
      this.particles.push(new Puck("speed",this.r,this.x,this.y,0,0,true))

      this.time--
    }
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.lineWidth=1;
    ctx.fillStyle="black";
    if(this.relation=="parent"){
          ctx.stroke();
    }

    ctx.fill()
    if(this.particles.length >1){
      for(let particle of this.particles){
        particle.draw(ctx)
      }
    }

    // ctx.save()
    // this.rotateAngle+=20;
    // ctx.translate(this.x, this.y);
    // ctx.rotate(this.rotateAngle)
    //ctx.drawImage(this.image,this.x-this.r,this.y-this.r,this.r+this.r,this.r+this.r)
    if(this.particles.length>10){
      this.particles.splice(0,1)
    }
    ctx.restore()
    this.move()
    if(this.relation == "parent"){
      this.edges(paddle)
      this.paddleColl(paddle)
      this.upgradeColl(upgrades)
    }
    ctx.globalAlpha =1;
    this.deleteParticle()
  }
}
