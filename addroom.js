// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBxQ5YRwyimDMWq0u6BNmT774lRAijByhg",
    authDomain: "kwitter-project-4474b.firebaseapp.com",
    databaseURL: "https://kwitter-project-4474b-default-rtdb.firebaseio.com",
    projectId: "kwitter-project-4474b",
    storageBucket: "kwitter-project-4474b.appspot.com",
    messagingSenderId: "975857887372",
    appId: "1:975857887372:web:16e1cb61ecd5882b4b73a9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user")
document.getElementById("welcomeuser").innerHTML = "Welcome " + user_name

function addroom() {
    room_name = document.getElementById("roominput").value;
    localStorage.setItem("room", room_name)
    firebase.database().ref("/").child(room_name).update({
        STATUS: "Added successfully"
    })
    document.getElementById("roominput").value = ""
    window.location = "chatpage.html"
}

function getData() {
    firebase.database().ref("/").on('value', function(snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
            childKey = childSnapshot.key;
            Room_names = childKey;

            console.log(Room_names)
            room_tag = `<div class="room_name" id=${Room_names} onclick="gotoRoom(this.id)">${Room_names}</div><hr>`
            document.getElementById("output").innerHTML += room_tag
        });
    });
}
getData();

function gotoRoom(room) {
    console.log(room)
    localStorage.setItem("room", room)
    window.location = "chatpage.html"

}

function logout() {
    localStorage.removeItem("user")
    localStorage.removeItem("room")
    window.location = "login.html"
}