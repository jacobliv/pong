class Paddle{

  constructor(width,height,playerNumb){
    this.firebaseId=null
    this.playerNumb=playerNumb
    this.canvasWidth=width;
    this.canvasHeight=height;
    this.vel=0;
    this.acc=20;
    this.lives = 10;
    if(playerNumb==0){
      this.id=1
      this.height=100;
      this.width = 10;
      this.x = 10;
      this.y = 300;
      this.up=false;
      this.down=false;
    }
    else if(playerNumb==1){
      this.id=2
      this.height=100;
      this.width = 10;
      this.x = width-10;
      this.y = 300;
      this.up=false;
      this.down=false;
    }
    else if(playerNumb==2){
      this.id=3
      this.height=10;
      this.width = 100;
      this.x = width/2;
      this.y = 5;
      this.left=false;
      this.right=false;

    }
    else if(playerNumb==3){
      this.id=4
      this.height=10;
      this.width = 100;
      this.x = width/2;
      this.y = height-15;
      this.left=false;
      this.right=false;

    }
  }
  move(){
    if(this.id == 1 || this.id == 2){
      if(this.up){
        this.vel-=(this.acc *.2)
      }
      if(this.down){
        this.vel+=(this.acc *.2)
      }
      if(!this.down || !this.up){
        this.vel*=.9;
      }
      this.y+=this.vel;
    }
    else{
      if(this.left){
        this.vel-=(this.acc *.2)
      }
      if(this.right){
        this.vel+=(this.acc *.2)
      }
      if(!this.left || !this.right){
        this.vel*=.9;
      }
      this.x+=this.vel;
    }

  }
  constrain(){
    if(this.id == 1 || this.id == 2){
      if(this.y+this.height>this.canvasHeight){
        this.y=700-this.height;
        this.vel*=-.5;
      }
      if(this.y<0){
        this.y = 0;
        this.vel*=-.5;
      }
    }
    else{
      if(this.x+this.width/2>this.canvasWidth){
        this.x=this.canvasWidth-this.width/2;
        this.vel*=-.5;
      }
      if(this.x-this.width/2<0){
        this.x = this.width/2;
        this.vel*=-.5;
      }
    }
  }
  draw(ctx){
    ctx.lineWidth = this.width;
    //ctx.clearRect(0,0,700,700);
    //ctx.beginPath()

    //ctx.stroke();
    ctx.beginPath();
      //ctx.moveTo(170, 80);

    ctx.moveTo(this.x,this.y);
    ctx.lineTo(this.x, this.height +this.y)


      // complete custom shape

    ctx.closePath();


    ctx.strokeStyle = 'grey';
    ctx.stroke();

    this.move();
    this.constrain();

    //ctx.clearRect(0, 0, 700, 700);
  }
}
