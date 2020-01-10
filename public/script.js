//set socket variable to our hosting server
const socket = io('http://localhost:3000');
const messageContainer = document.getElementById('message-container');
const roomContainer = document.getElementById('room-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

if(messageForm != null) {
    const name = prompt('What is your name?');
    appendMessage('You joined');

    //now, send that message to the server
    socket.emit('new-user',roomName, name);

    //whenever we submit our form, we want to stop our form from submitting
    messageForm.addEventListener('submit', e => {
        //Stop our page from posting to our server which is also going to stop it from refreshing so we don't all of our chat messages.
        //if we didn't do this, we will lose all of all chat messages.
        e.preventDefault();

        //get input message
        const message = messageInput.value;
        appendMessage(`You: ${message}`);

        //emit is sending information from the client to the server
        socket.emit('send-chat-message', roomName, message);

        //empty out the message every time we send it
        messageInput.value = '';
    });
}

socket.on('room-created', room => {
    // <div><%= room %></div>
    // <a href="/<%= room %>">Join</a>

    const roomElement = document.createElement('div');
    roomElement.innerText = room;
    const roomLink = document.createElement('a');
    roomLink.href = `/${room}`;
    roomLink.innerText = 'join';
    roomContainer.append(roomElement);
    roomContainer.append(roomLink);
});

//when we receive the event, we call a function inside with the data that we sent down from the server
socket.on('chat-message', data => {
    //our data now is "Hello World" as we set on our server side
    //console.log(data);
    appendMessage(`${data.name}: ${data.message}`);
});

socket.on('user-connected', name => {
    appendMessage(`${name} connected`);
});

//disconnect 
socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`);
});

//create an appendMessage function and it's going to take a message
function appendMessage(message){
    //creating a div element
    const messageElement = document.createElement('div');

    //setting a value for this element
    messageElement.innerText = message;

    //append our container, message element will be added to the end of our container
    messageContainer.append(messageElement);
}