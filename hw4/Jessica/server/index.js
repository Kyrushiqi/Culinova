const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);

const PORT = process.env.PORT || 3000;
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, '../client')));

let connectedUsers = new Map();

io.on('connection', onConnected);

function onConnected(socket) {
    console.log('Socket connected:', socket.id);

    socket.on('set-name', (name) => {
        const oldName = socket.name;
        
        if (oldName && oldName !== name) {
            io.emit('user-renamed', { oldName: oldName, newName: name });
        } else if (!oldName) {
            socket.broadcast.emit('user-joined', { name: name });
        }

        socket.name = name;
        connectedUsers.set(socket.id, name);
        io.emit('clients-total', connectedUsers.size);
    });

    socket.on('disconnect', () => {
        console.log('Socket disconnected:', socket.id);
        if (socket.name) {
            connectedUsers.delete(socket.id);
            io.emit('clients-total', connectedUsers.size);
            io.emit('user-disconnected', { name: socket.name });
        }
    });

    socket.on('message', (data) => {
        socket.broadcast.emit('chat-message', data);
    });

    socket.on('feedback', (data) => {
        socket.broadcast.emit('feedback', data);
    });
}

server.listen(PORT, () => console.log(`Server on port ${PORT}`));