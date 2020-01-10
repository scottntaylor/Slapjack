//require express
const express = require('express');
const app = express();
const server = require('http').Server(app);

//creating server using socket.io
//require socket.io, pass the port that we want our server to run on to create a server
const io = require('socket.io')(server);

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const rooms = { name: {} };

app.get('/', (req, res) => {
    res.render('index', { rooms: rooms });
});

app.get('/', (req, res) => {
    res.render('chat', { rooms: rooms });
});

app.post('/room', (req, res) => {
    if(rooms[req.body.room] != null) {
        return res.redirect('/');
    }
    rooms[req.body.room] = { users: {} };
    res.redirect(req.body.room);

    //Send message that new room was created
    io.emit('room-created', req.body.room);
});

app.get('/:room', (req, res) => {
    if(rooms[req.params.room] == null){
        return res.redirect('/');
    }
    res.render('room', { roomName: req.params.room });
});

server.listen(3000);

//everytime a user loads up our website, it's going to call this function and give users their own socket
io.on('connection', socket => {
    //New User message will display on the server side and Hello World message will send to the cliend side when we connect to server
    //console.log('New User');

    socket.on('new-user', (room, name) => {
        socket.join(room);
        rooms[room].users[socket.id] = name;
        socket.to(room).broadcast.emit('user-connected', name);
    });

    //we use this socket to send message down to the user
    //chat-message is the event name, Hello World is parameter or data 
    //Every time someone connects to our server, we're sending a message down to the client with this event chat-message and it's going to say Hello World inside of it.
    //socket.emit('chat-message', 'Hello World');
    socket.on('send-chat-message', (room, message) => {
        //console.log(message);

        //send message to every single other client to the server except for the person who sent the message
        socket.to(room).broadcast.emit('chat-message', { message: message, name: rooms[room].users[socket.io]});
    });

    socket.on('disconnect', () => {
        getUserRooms(socket).forEach(room => {
            socket.to(room).broadcast.emit('user-disconnected', rooms[room].users[socket.id]);
        delete rooms[room].users[socket.id];
        });
    });
});

function getUserRooms(socket){
    return Object.entries(rooms).reduce((names, [name, room]) => {
        if(room.users[socket.id] != null) names.push(name);
        return names;
    }, []);
}

