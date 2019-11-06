//var firebase = require('firebase');

var firebaseConfig = {
    apiKey: "AIzaSyCV6EHTKmyEPPslmrsJxhzS1FV8B2OMEWo",
    authDomain: "fir-webapp-1930b.firebaseapp.com",
    databaseURL: "https://fir-webapp-1930b.firebaseio.com",
    projectId: "fir-webapp-1930b",
    storageBucket: "fir-webapp-1930b.appspot.com",
    messagingSenderId: "934063532932",
    appId: "1:934063532932:web:91ffa9f0ae5b5a6de3cbd1",
    measurementId: "G-359R3H39B3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth.Auth.Persistence.LOCAL;


$("#btn-login").click(function() {

    var email = $("#email").val();
    var password = $("#password").val();

    if (email !== "" && password !== "") {
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            window.alert("Message : " + errorMessage);
        })

    } else {
        window.alert("Form is incomplete. Please fill out all fields!");
    }
});

// For some reason the function is not working
/*$("#btn-logout").click(function(){
       window.alert("Passwords are not egual");
      firebase.auth().signOut().then(function() {
        console.log("Sign-out successful!")
      }).catch(function(error) {
        console.log("An error happened." + error.message); 
      });
});*/

$("#btn-register").click(function() {

    var email = $("#email").val();
    var password = $("#password").val();
    var confirmPassword = $("#confirmPassword").val();

    if (email !== "" && password !== "" && confirmPassword !== "") {
        if (password === confirmPassword) {
            var result = firebase.auth().createUserWithEmailAndPassword(email, password);
            // Handle Errors here.
            result.catch(function(error) {

                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(errorCode);
                console.log(errorMessage);

                window.alert("Message : " + errorMessage);
            });
        } else {
            window.alert("Passwords are not egual");
        }
    } else {
        window.alert("Form is not complete. Please fill out all fields!");
    }

});

$("#btn-resetPassword").click(function() {
    var auth = firebase.auth();
    var email = $("#email").val();
    console.log(email);

    if (email != "") {
        auth.sendPasswordResetEmail(email).then(function() {
                window.alert("We have sent you information with to recover your account. Please, check your emails");
            })
            .catch(function(error) {

                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(errorCode);
                console.log(errorMessage);

                window.alert("Message : " + errorMessage);
            })
    } else {
        window.alert("Sorry, it seems you haven't provided your email");
    }
});




$("#btn-update").click(function() {

    var firstname = $("#firstname").val();
    var surname = $("#surname").val();
    var country = $("#country").val();
    var phone = $("#phone").val();
    var gender = $("#gender").val();
    var address = $("#address").val();

    var rootRef = firebase.database().ref().child("Users");
    var userID = firebase.auth().currentUser.uid;
    var usersRef = rootRef.child(userID);

    if (firstname != "" && surname != "" && country != "" && phone != "" && gender != "" && address != "") {

        var userData = {
            "firstname": firstname,
            "surname": surname,
            "country": country,
            "phone": phone,
            "gender": gender,
            "address": address
        };

        usersRef.set(userData, function(error) {
            if (error) {

                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(errorCode);
                console.log(errorMessage);

                window.alert("Message : " + errorMessage);

            } else {
                window.location.href = "dashboard.html";
            }
        });
    } else {
        window.alert("Form is not complete. Please fill out the fields");
    }
});

function switchView(view) {
    $.get({
        url: view,
        cache: false,
    }).then(function(data) {
        $("#container").html(data);
    });
}