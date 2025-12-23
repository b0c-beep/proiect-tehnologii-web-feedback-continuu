const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config(); //load environment variables

const { syncDB } = require('./config/index'); //sync database

const app = express();
const server = http.createServer(app); //create server

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});
const PORT = process.env.PORT || 3000; //port from .env

app.use(cors()); //enable cors
app.use(express.json()); //parse json
app.set('io', io); //set io to app


// Socket.io connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('join-activity', (activityId) => {

    // Join activity room
    socket.join(`activity-${activityId}`);
    console.log(`User ${socket.id} joined activity ${activityId}`);
  });

  // User disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/activities', require('./routes/activityRoutes'));
app.use('/api/feedback', require('./routes/feedbackRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));


// Server start
server.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await syncDB();
});