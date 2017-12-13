$(document).ready(function(){
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    window.location.replace("gamePage.html");
  } else {
    
  }
});
  document.getElementById('google').addEventListener('click', googleSignIn, false);
    function googleSignIn(){
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      window.location.replace("gamePage.html");
      // var jobj=JSON.stringify({token:token,user:user});
      // var url="gamePage"
      //
      // $.ajax({
      //   url:url,
      //   type: "GET",
      //   //data: jobj,
      //   contentType: "application/json; charset=utf-8",
      //   success: function(data,textStatus){
      //
      //   }
      // })
      // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    }

    document.getElementById('signUpButton').addEventListener('click', signup, false);

// $(document).on('click', '#signUpButton', function(){
//   console.log("here");
// });
function signup(){
  window.location.replace("signUp.html");
}
})
