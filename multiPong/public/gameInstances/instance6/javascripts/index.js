$(document).ready(function(){
  var database = firebase.database();
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
  } else {
    window.location.replace("/");
  }
});

      var stuff="";

      for(var i=0;i<15;i++){

        stuff+="<tr>"
          stuff+="<td>Game "+ i+"</td>"
          //stuff+="<td id='gameNumber"+i.toString()+"'value='0'></td>"
          stuff+="<td><a href='gameInstances/instance"+i+"/pong.html'>Link</a></td>"
        stuff+="</tr>"
      }
      $('#games').append(stuff)
$('#signOutButton').on('click', function(e){
    firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }, function(error) {
    // An error happened.
  });
})
// for(var i=0; i<15;i++){
//
// var playerCount = database.ref('Game ' + i);
//
//   playerCount.on('value', function(count) {
//       count.forEach(function(childSnapshot) {
//         var id;
//         console.log(childSnapshot.ge)
//         if(childSnapshot.key=="game"){
//            id= childSnapshot.val()
//           console.log(id)
//         }
//         else if(childSnapshot.key == "count"){
//           //console.log(id)
//           setTimeout(function(){
//             var games=$('#gameNumber'+id.toString())
//
//             games.html(childSnapshot.val())
//           },1000)
//
//           //console.log(childSnapshot.val())
//         }
//       })})
// }

$('#createNewGame').on('click', function(e){
  e.preventDefault()
  var name = document.getElementById('name').value

  var obj= {
    Name: "name",
    Img: "dataURL"
  }
  //console.log(obj)
  var jobj = JSON.stringify(obj);

  var url = "copy"
  $.ajax({
    url:url,
    type: "POST",
    data: jobj,
    contentType: "application/json; charset=utf-8",
    success: function(data,textStatus){

    }
  })
})




})
