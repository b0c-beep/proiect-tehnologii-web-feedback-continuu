const express = require('express');
const cors = require('cors');
const http = require('http');
const {Server} = require('socket.io');
require('dotenv').config();

const { syncDB } = require('./config/index');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.set('io', io);

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('join-activity', (activityId) => {
    socket.join(`activity-${activityId}`);
    console.log(`User ${socket.id} joined activity ${activityId}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Routes

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/activities', require('./routes/activityRoutes'));
app.use('/api/feedback', require('./routes/feedbackRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));

server.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await syncDB();
});