# Project-2
===============================================================================================================
# creating a chat app:
1. create a chat.html
2. Install dependencies:
    1.  npm init -> set up project file using NPM
    2.  npm i socket.io ->real-time web socket communication
    3.  npm i --save-dev nodemon ->allow server to automatically refresh itself every time we make a change, so we don't have to cancel our server and restart our server.
    ->inside of package.json add to the scripts to use nodemon-> 
    "scripts": {
    "devStart": "nodemon server.js"
    }
    run nodemon -> npm run devStart ----->doesn't work????????ask TA for help on this
3. create a server.js
    1.  creating server using socket.io and use it for connection
4. create a script.js ->all client-side JavaScript is going to be here.
    server run on port 3000
    client run on port 5500 ->Open with live server
    # In chat.html -> require a script for socket.io 
    <script defer src="http://localhost:3000/socket.io/socket.io.js"></script>
    # http://localhost:3000 -> this is where our socket.io is working
    # socket.io -> path in library
    # socket.io.js -> JavaScript file that includes in script.js file(io function) ->io('http://localhost:3000') 
    <script defer src="script.js"></script>
    # go on browser, open inspect -> will see Hello World message from the console because when we connnected, our server went inside the socket in server.js ->io.on('connection', socket =>
    //New User message will display on the server side 
    //console.log('New User');
    ->and Hello World message will send to the cliend side when we connect to server. We're receiving that inside of our socket.on and then login that in the console
    # in script.js
    //when we receive the event, we call a function inside with the data that we sent down from the server
socket.on('chat-message', data => {
    //our data now is "Hello World" as we set on our server side
    console.log(data);
});
===============================================================================================================
# Client side:
we want to get our message form, so every time we send a message, we want to send that to the server.
# in script.js
//create a variable which is going to be our form
const messageForm = document.getElementById('send-container');

# then we add event listener to that
//whenever we submit our form, we want to stop our form from submitting
messageForm.addEventListener('submit', e => {
    //Stop our page from posting to our server which is also going to stop it from refreshing so we don't all of our chat messages.
    e.preventDefault();

# get our message
First -> get message element ->const messageInput = document.getElementById('message-input');

    //take the message element input and get the value from there
    const message = messageInput.value;


    //and then sent that value to the server
    //emit is sending information from the client to the server
    socket.emit('send-chat-message', message); ->(event-name, data)

    //empty out the message every time we send it
    messageInput.value = '';

    //go to browser type message, click send, it will be empty after sent to server
});
# serve is not handling yet!
===============================================================================================================
# Setting up handling for that event
# in sever.js file
socket.on('send-chat-message', message => {
        //console.log(message);

# go browser, type hello -> Hello message will show up(receiving on our server) in server(terminal)
# now we want it send to the other clients

        //send message to every single other client to the server except for the person who sent the message
        socket.broadcast.emit('chat-message', message);
})

# open 2 client side to test message send from client to client
===============================================================================================================
# set up appending these messages to our index file
# in script.js
//create an appendMessage function and it's going to take a message
function appendMessage(message){
    //creating a div element
    const messageElement = document.createElement('div');

    //setting a value for this element
    messageElement.innerText = message;

    //append our container
# const messageContainer = document.getElementById('message-container');
    //take that message container and add(append) whatever element we want
    messageContainer.append(messageElement);
}

# now , we can call that append message method, send it in the data(message), some and go to browser send some messages to server and click send to test it.
socket.on('chat-message', data => {
    //our data now is "Hello World" as we set on our server side
    //console.log(data);
    appendMessage(data);
});
===============================================================================================================
# giving our user name to display
# in script.js
const name = prompt('What is your name?');
appendMessage('You joined');

# now, send that message to the server
socket.emit('new-user', name);

# in server.js
const users = {};

io.on('connection', socket => {
    socket.on('new-user', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-connected', name);
    });
})

# in script.js
socket.on('user-message', name => {
    appendMessage(`${name} connected`);
});
========================================================================================================