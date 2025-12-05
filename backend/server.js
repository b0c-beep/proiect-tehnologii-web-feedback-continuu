const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { syncDB } = require('./config/index');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/activities', require('./routes/activityRoutes'));
app.use('/api/feedback', require('./routes/feedbackRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await syncDB();
});