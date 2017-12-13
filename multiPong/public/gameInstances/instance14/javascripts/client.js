var socket
$(document).ready(function(){
var database = firebase.database();
var base=document.location.href
base=base.split('/')
base=base[base.length-2]
if(base[base.length-2]=="e"){
  var pongNum=base[base.length-1]
}
else{
  var pongNum=base[base.length-2]+base[base.length-1]
}

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var width=canvas.width;
var height=canvas.height
var moveUp = false;
var moveDown = false;
var puck = new Puck();
var end;
var players;
var currPlayer=1;
var upgrades=[]
var randDir=[]
var i=0;
var player1score=0;
var maxUps=0
var puck1={x:null,y:null};
// if(!checkGame(pongNum)){
 //newGame(pongNum)
// }
getPlayers(pongNum,true)
var paddles=[]

paddles.push(new Paddle(width,height,paddles.length));
paddles.push(new Paddle(width,height,paddles.length));
paddles.push(new Paddle(width,height,paddles.length));
paddles.push(new Paddle(width,height,paddles.length));

function newGame(gameNum){
  //console.log(getPlayers(gameNum,false))
  database.ref("Game "+gameNum).set({
    status:"Starting",
    count:0
  });
  //database.ref().child("Game "+gameNum).push({x:paddles[0].x,y:paddles[0].y })


}

function addPlayer(gameNum,playerNumb,newPlayer){
  database.ref("Game "+gameNum).update({
    game:parseInt(gameNum),
    status:"Waiting",
    count: playerNumb+1,
    paddle0_lives:10,
    paddle1_lives:10,
    paddle2_lives:10,
    paddle3_lives:10

  });
  var playerId = newPlayer.playerId.toString()

  //database.ref("Game "+gameNum).child('players').update({playerId:true});
}
function makePlayer(gameNum,count){
  currPlayer = {playerId:count}
  addPlayer(gameNum,count,currPlayer)
}
function getPlayers(gameNum,add){
  var gameDatabase = database.ref('Game '+gameNum);
  var addNew=true
  var player
  var exists = false;

  gameDatabase.once('value').then(function(game) {

      game.forEach(function(game) {
        exists=true;

        player = game.val();
        if(player != "Starting"){
          players=player

          if(addNew && add){
            makePlayer(gameNum,players)
          }
          exists=true;
          return exists
        }
      });
  });


  return false;
}

if(paddles.length == 2){
  $(".player4Hearts").css('visibility', 'hidden')
  $(".player3Hearts").css('visibility', 'hidden')
}
if(paddles.length == 3){
  $(".player4Hearts").css('visibility', 'hidden')
}

while(i<maxUps/2){
  upgrades.push(new RandDir());
  upgrades.push(new Speed());
  i++;
}
//console.log(i)
var gameOver = null;
var begin = new Begin(width,height);
var message = new End(width,height,"Waiting for")
var playerCount = database.ref('Game ' + pongNum);

  playerCount.on('value', function(count) {
      count.forEach(function(childSnapshot) {
        var childData = childSnapshot.key;
        //console.log(childData)
        //console.log(paddles[0].lives)
        if(childData == "count" && gameOver==null){
          childData = childSnapshot.val()
          //console.log(childData)
          if(childData == 4){
            gameOver=false;

            beginGame()
          }
          else{
            var wait = 4-parseInt(childData)
            ctx.fillStyle = "white";
            ctx.clearRect(0,0,width,height);
            message.size=70
            message.text="Waiting For " + wait.toString() + " more Players"
            message.draw(ctx)
          }

        }
        else if(childData == "puckX" && !gameOver && currPlayer.playerId != 0){
          childData = childSnapshot.val()
          puck1.x = childData
        }
        else if(childData == "puckY"&& !gameOver && currPlayer.playerId != 0){
          childData = childSnapshot.val()
          puck1.y = childData
        }

        else if(childData == "paddle0_X" && currPlayer.playerId != 0&& paddles[0] !=null){

          childData = childSnapshot.val()

          paddles[0].x = childData
        }
        else if(childData == "paddle0_Y" && currPlayer.playerId != 0&& paddles[0] !=null){
          childData = childSnapshot.val()

          paddles[0].y = childData
        }

        else if(childData == "paddle1_X" && currPlayer.playerId != 1 && paddles[1] !=null){

          childData = childSnapshot.val()

          paddles[1].x = childData
        }
        else if(childData == "paddle1_Y" && currPlayer.playerId != 1&& paddles[1] !=null){
          childData = childSnapshot.val()

          paddles[1].y = childData
        }

        else if(childData == "paddle2_X" && currPlayer.playerId != 2&& paddles[2] !=null){

          childData = childSnapshot.val()

          paddles[2].x = childData
        }
        else if(childData == "paddle2_Y" && currPlayer.playerId != 2&& paddles[2] !=null){
          childData = childSnapshot.val()

          paddles[2].y = childData
        }

        else if(childData == "paddle3_X" && currPlayer.playerId != 3&& paddles[3] !=null){

          childData = childSnapshot.val()

          paddles[3].x = childData
        }
        else if(childData == "paddle3_Y" && currPlayer.playerId != 3&& paddles[3] !=null){
          childData = childSnapshot.val()

          paddles[3].y = childData
        }

        else if(childData == "paddle0_lives" && currPlayer.playerId != 0){

          childData = childSnapshot.val()

          paddles[0].lives = childData
        }

        else if(childData == "paddle1_lives" && currPlayer.playerId != 0){

          childData = childSnapshot.val()

          paddles[1].lives = childData
        }

        else if(childData == "paddle2_lives" && currPlayer.playerId != 0){

          childData = childSnapshot.val()

          paddles[2].lives = childData
        }

        else if(childData == "paddle3_lives" && currPlayer.playerId != 0){

          childData = childSnapshot.val()

          paddles[3].lives = childData
        }

      });
  });


function beginGame(){
  beginDraws()
  begin.draw(ctx)
  begin.text--;
  setTimeout(function(){
    ctx.clearRect(0,0,width,height);
    beginDraws()
    begin.draw(ctx)
    begin.text--;
  },1000)
  setTimeout(function(){
    ctx.clearRect(0,0,width,height);
    beginDraws()
    begin.draw(ctx)
    begin.text--;
  },2000)
  setTimeout(function(){
    ctx.clearRect(0,0,width,height);
    beginDraws()
    ctx.fillStyle="black";
    begin.draw(ctx)
    begin.text--;

  },3000)
  setTimeout(function(){
    ctx.clearRect(0,0,width,height);
    beginDraws()
    ctx.fillStyle="black";
    begin.draw(ctx)

    begin.text--;

  },4000)
  setTimeout(function(){
    ctx.clearRect(0,0,width,height);
    beginDraws()
    ctx.fillStyle="black";
    begin.draw(ctx)

  },5000)
  setTimeout(function(){
    ctx.clearRect(0,0,width,height);
    beginDraws()
    ctx.fillStyle="black";
    begin.draw(ctx)
    writePaddle(pongNum,currPlayer.playerId)

  },6000)
  setTimeout(function(){

    window.requestAnimationFrame(draw);
  },6300)
}

function beginDraws(){
    drawBoard()
  for(var ups of upgrades){
    ups.draw(ctx)
  }

  puck.draw(ctx,paddles,upgrades)
  for(var p of paddles){
    if(p != null || p != undefined){
      p.draw(ctx)
    }
  }
}

function drawBoard(){

  //Player 1
  //console.log("In Board")
  ctx.fillStyle = "white";
  ctx.clearRect(0,0,width,height);
  ctx.lineWidth=2;
  if(paddles.length<=2 || (paddles[2] == null && paddles[3] == null)){
    ctx.rect(width/2,0,2,height)
  }
  if((paddles[0] == null && paddles[1] == null)){
    ctx.rect(0,height/2,width,2)
  }
  if(paddles.length>2 ){
    if(paddles[0] != null || paddles[0] != undefined){
      ctx.stroke();
      ctx.rect(0,height/4.66,50,400)
      ctx.rect(0,0,2,150)
      ctx.rect(0,height/4.66+400,2,700)
    }
    // //Player 2
    if(paddles[1] != null || paddles[1] != undefined){
      ctx.rect(width-49,height/4.66,50,400)
      ctx.rect(width-2,0,2,150)
      ctx.rect(width-2,height/4.66+400,2,700)
    }
    //player 3
    if(paddles[2] != null || paddles[2] != undefined){
      ctx.rect(width/3,0,400,50)
      ctx.rect(0,0,width/3,2)
      ctx.rect(width/3+400,0,700,2)
    }
    //Player 4

  }
  if(paddles.length>3){
    if(paddles[3] != null || paddles[3] != undefined){
      ctx.rect(width/3,651,400,50)
      ctx.rect(0,698,width/3,2)
      ctx.rect(width/3+400,698,700,2)
    }
  }
}

function drawObjects(){
  if(puck != undefined){
    if(puck.x <0 && (paddles[0] != undefined || paddles[0] != null)){
      //console.log(paddles[0].lives);
      paddles[0].lives--;
      calculateLife(paddles[0])
      if(paddles[0].lives <=0){
        paddles[0] = null
      }
      //$("#player1Lives").html(p.lives + " Lives Left")
      puck= null;
      puck = new Puck()
    }
    else if(puck.x >width && (paddles[1] != undefined || paddles[1] != null)){

      paddles[1].lives--;
      //console.log(paddles[1].lives)
      calculateLife(paddles[1])
      if(paddles[1].lives <=0){
        paddles[1] = null
      }
      //$("#player1Lives").html(p.lives + " Lives Left")
      puck= null;
      puck = new Puck()
    }
    else if(puck.y <0 && (paddles[2] != undefined || paddles[2] != null)){
      paddles[2].lives--;
      calculateLife(paddles[2])
      if(paddles[2].lives <=0){
        paddles[2] = null
      }
      //$("#player1Lives").html(p.lives + " Lives Left")
      puck= null;
      puck = new Puck()
    }
    else if(puck.y >height && (paddles[3] != undefined || paddles[3] != null)){
      paddles[3].lives--;
      calculateLife(paddles[3])
      if(paddles[3].lives <=0){
        paddles[3] = null
      }
      //$("#player1Lives").html(p.lives + " Lives Left")
      puck= null;
      puck = new Puck()
    }
    else{
    if(currPlayer.playerId ==0){
      puck.draw(ctx,paddles,upgrades)
    }
    else{
      ctx.beginPath();
      ctx.arc(puck1.x, puck1.y, 15, 0, 2 * Math.PI);
      ctx.lineWidth=1;
      ctx.fillStyle="black";
      ctx.fill()

    }

    }
  }
  for(var p of paddles){
    if(p != null || p != undefined){
      p.draw(ctx);
    }
  }
  for(var ups of upgrades){
    ups.draw(ctx);
  }
}

function fillUpgrades(){
  while(upgrades.length <maxUps){
    var i=Math.floor(Math.random()*2)
    //console.log(i)
    if(i==1){
      upgrades.push(new Speed())
    }
    else{
      upgrades.push(new RandDir());
    }
  }

}

function updateScore(){
  //  $("#player1Points").html("Player 1 Score: " + player1score)
      player1score++;
}

function movePaddles(){
  window.addEventListener('keydown', function(e) {
    //console.log(e.key)
    if((paddles[0] != null || paddles[0] != undefined) && currPlayer.playerId==0){
      if(e.key == "w"){
        paddles[0].up=true;
      }
      if( e.key == "s"){
        paddles[0].down=true;
      }
    }

    if((paddles[1] != null  || paddles[1] != undefined)&& currPlayer.playerId==1){
      if(e.key == "ArrowUp"){
        paddles[1].up=true;
      }
      if(e.key == "ArrowDown"){
        paddles[1].down=true;
      }
    }
    if((paddles[2] != null || paddles[2] != undefined)&& currPlayer.playerId==2){
      if(e.key == "a"){
        paddles[2].left=true;
      }
      if(e.key == "d"){
        paddles[2].right=true;
      }
    }

    if((paddles[3] !=null || paddles[3] != undefined)&& currPlayer.playerId==3)
    {
      if(e.key == "ArrowLeft"){
        paddles[3].left=true;
      }
      if(e.key == "ArrowRight"){
        paddles[3].right=true;
      }
    }
  });
  window.addEventListener('keyup', function(e) {

    if((paddles[3] !=null || paddles[3] != undefined)&& currPlayer.playerId==0){
      if(e.key == "w"){
        paddles[0].up=false;
      }
      if( e.key == "s"){
        paddles[0].down=false;
      }
    }

    if((paddles[3] !=null || paddles[3] != undefined)&& currPlayer.playerId==1){
      if(e.key == "ArrowUp"){
        paddles[1].up=false;
      }
      if(e.key == "ArrowDown"){
        paddles[1].down=false;
      }
    }
    if((paddles[3] !=null || paddles[3] != undefined)&& currPlayer.playerId==2){
      if(e.key == "a"){
        paddles[2].left=false;
      }
      if(e.key == "d"){
        paddles[2].right=false;
      }
    }

    if((paddles[3] !=null || paddles[3] != undefined)&& currPlayer.playerId==3)
    {
      if(e.key == "ArrowLeft"){
        paddles[3].left=false;
      }
      if(e.key == "ArrowRight"){
        paddles[3].right=false;
      }
    }
  });

}

function checkIfOver(){
  if(!gameOver){
    window.requestAnimationFrame(draw);
  }
  else{
    end.draw(ctx)
  }
}

function checkIfDead(){
  var stillAlive=0;
  var winner;
  for(var p of paddles){
    if(p != null || p != undefined){
      stillAlive++;
    }
  }
  if(stillAlive ==1){
    for(var p of paddles){
      if(p != null || p != undefined){
        winner=p.id.toString();
      }
    }
    end = new End(width,height)
    end.text = "Player " + winner + " wins!"
    gameOver=true;
    database.ref("Game "+pongNum).update({
      status:"Finished",
      count:0
    });
  }
}

function calculateLife(player){
  //console.log(player.id)
  for(i=1;i<=10;i++){
    if(i >player.lives){
      if(player.id ==1 && currPlayer.playerId==0){
        $("#oneHeart"+i.toString()).attr("class","heartDead")
      }
      else if(player.id==2 && currPlayer.playerId==0){
        $("#twoHeart"+i.toString()).attr("class","heartDead")
      }
      else if(player.id==3 && currPlayer.playerId==0){
        $("#threeHeart"+i.toString()).attr("class","heartDead")
      }
      else if(player.id==4 && currPlayer.playerId==0){
        $("#fourHeart"+i.toString()).attr("class","heartDead")
      }

    }

  }
}

function writeLives(gameNum){
  if(currPlayer.playerId == 0){
    if(paddles[0] !=null){
      database.ref("Game "+pongNum).update({
        paddle0_lives:paddles[0].lives
      });
    }
    else{
      database.ref("Game "+pongNum).update({
        paddle0_lives:0
      })
    }

    if(paddles[1] !=null){
      database.ref("Game "+pongNum).update({
        paddle1_lives:paddles[1].lives
      });
    }
    else{
      database.ref("Game "+pongNum).update({
        paddle1_lives:0
      })
    }

    if(paddles[2] !=null){
      database.ref("Game "+pongNum).update({
        paddle2_lives:paddles[2].lives
      });
    }
    else{
      database.ref("Game "+pongNum).update({
        paddle2_lives:0
      })
    }

    if(paddles[3] !=null){
      database.ref("Game "+pongNum).update({
        paddle3_lives:paddles[3].lives
      });
    }
    else{
      database.ref("Game "+pongNum).update({
        paddle3_lives:0
      })
    }
  }

}

function writePaddle(gameNum, userId) {
  if((paddles[0] != null || paddles[0] != undefined)&& userId==0){
    database.ref("Game "+gameNum).update({
      status:"Playing",
      paddle0_X : paddles[0].x,
      paddle0_Y : paddles[0].y
    });
  }
  else if((paddles[1] != null || paddles[1] != undefined)&&userId==1){
    database.ref("Game "+gameNum).update({
      status:"Playing",
      paddle1_X : paddles[1].x,
      paddle1_Y : paddles[1].y
    });
  }
  else if((paddles[2] != null || paddles[2] != undefined)&&userId==2){
    database.ref("Game "+gameNum).update({
      status:"Playing",
      paddle2_X : paddles[2].x,
      paddle2_Y : paddles[2].y
    });
  }
  else if((paddles[3] != null || paddles[3] != undefined)&&userId==3){
    database.ref("Game "+gameNum).update({
      status:"Playing",
      paddle3_X : paddles[3].x,
      paddle3_Y : paddles[3].y
    });
  }
}

function writePuck(gameNum){

    database.ref("Game "+gameNum).update({
      puckX:puck.x,
      puckY:puck.y
    });

}

function draw(){
  //console.log(currPlayer)
  if(currPlayer.playerId == 0){
    writePuck(pongNum)
  }

  writeLives(pongNum)
  writePaddle(pongNum,currPlayer.playerId)
  updateScore()
  drawBoard()
  ctx.stroke();
  movePaddles()
  drawObjects()
  fillUpgrades()
  checkIfDead();
  checkIfOver()

}

})
