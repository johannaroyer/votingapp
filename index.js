const app = require('express')()
var http = require("http").createServer(app)
// var io = require("socket.io")(http)
var server = require('socket.io')(http);
 
app.get('/', function (req, res) {
  res.sendFile(__dirname + "/vote.html")
})

http.listen(3000, function (){
    console.log("Listen on port : 3000")
})

//Déclaration des variables

var connectCounter = 0;

var counter=0
var counter2=0
var counter3=0

// Début de la connexion

server.on("connection", function(socket) {

// Compter le nb de clients connectés

  connectCounter+=1
  console.log(connectCounter)
  console.log('a user connected');

  socket.on('disconnect', function() { 
    connectCounter-=1; 
    console.log(connectCounter)
  
  });

  // Compter le nombre de votes en fonction des boutons

  socket.emit('click_count',counter);
  
  socket.on('clicked',function(){
    counter+=1;//increments global click count
    server.emit('click_count',counter);//send to all users new counter value

  });

  socket.emit('click_count2',counter2);
      
      socket.on('clicked2',function(){
        counter2+=1;//increments global click count
        server.emit('click_count2',counter2);//send to all users new counter value
    
      });

      socket.emit('click_count3',counter3);
      
      socket.on('clicked3',function(){
        counter3+=1;//increments global click count
        server.emit('click_count3',counter3);//send to all users new counter value
    
      });

})



 









