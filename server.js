const express = require("express");
const http = require('http');
const userRoute = require('./Routes/userRoute');
const dbConnect = require('./Config/database');
const { errorHandler } = require('./Middlewares/errorMiddeleware')
require('dotenv').config();

dbConnect();
const app = express();
const server = http.createServer(app);
const socketIo = require('socket.io');
const io = socketIo(server);

const port = process.env.PORT || 3500

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/user', userRoute)
app.use(errorHandler)



io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('typing', () => {
        socket.broadcast.emit('user typing', socket.id);
    });

    socket.on('stop typing', () => {
        socket.broadcast.emit('user stop typing', socket.id);
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('user disconnected', socket.id);
        console.log('User disconnected');
    });
});


server.listen(port, () => {
    console.log(`Server listening to port: ${port}`)
})


module.exports = io