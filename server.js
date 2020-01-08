//creating server using socket.io
//require socket.io, pass the port that we want our server to run on to create a server
const io = require('socket.io')(3000);
const users = {};

//everytime a user loads up our website, it's going to call this function and give users their own socket
io.on('connection', socket => {
    //New User message will display on the server side and Hello World message will send to the cliend side when we connect to server
    //console.log('New User');

    socket.on('new-user', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-connected', name);
    });

    //we use this socket to send message down to the user
    //chat-message is the event name, Hello World is parameter or data 
    //Every time someone connects to our server, we're sending a message down to the client with this event chat-message and it's going to say Hello World inside of it.
    //socket.emit('chat-message', 'Hello World');
    socket.on('send-chat-message', message => {
        //console.log(message);

        //send message to every single other client to the server except for the person who sent the message
        socket.broadcast.emit('chat-message', message);
    });
});

