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
 room_name = localStorage.getItem('room')

 function send() {
     message = document.getElementById("msg").value
     firebase.database().ref(room_name).push({
         MESSAGE: message,
         LIKES: 0,
         USER: user_name
     })
     document.getElementById("msg").value = ""
 }

 function getData() {
     firebase.database().ref("/" + room_name).on('value', function(snapshot) {
         document.getElementById("output").innerHTML = "";
         snapshot.forEach(function(childSnapshot) {
             childKey = childSnapshot.key;
             childData = childSnapshot.val();
             if (childKey != "purpose") {
                 firebase_message_id = childKey;
                 message_data = childData;
                 //Start code
                 console.log(firebase_message_id)
                 console.log(message_data)
                 user = message_data["USER"]
                 user_tag = `<h3>${user} </h4>`
                 message = message_data["MESSAGE"]
                 message_tag = `<h4 class="message_h4">${message}</h4>`
                 likes = message_data["LIKES"]
                 like_tag = `<button id=${firebase_message_id} class="btn btn-primary" value=${likes} onclick="updateLike(this.id)" ><span class="glyphicon glyphicon-thumbs-up"></span> Like : ${likes}</button><hr>`


                 document.getElementById("output").innerHTML += user_tag + message_tag + like_tag
                     //End code
             }
         });
     });
 }

 function logout() {
     localStorage.removeItem("user")
     localStorage.removeItem("room")
     window.location = "index.html"
 }
 getData();

 function updateLike(btnid) {
     get_likes = document.getElementById(btnid).value
     updatedlikes = Number(get_likes) + 1
     firebase.database().ref(room_name).child(btnid).update({
         LIKES: updatedlikes
     })
 }