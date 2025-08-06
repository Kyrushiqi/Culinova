const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const { mongoose } = require('mongoose');
const app = express();


// Database connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database connected'))
.catch((err) => console.log('Database is not connected', err));

app.use(express.json());

// CORS Middleware to allow cross-origin requests
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173' 
}));

// Middleware to log client connections
app.use((req, res, next) => {
    console.log(`Client has connected: ${req.method} ${req.originalUrl}`);
    next();
});

// Test route to confirm connection with the client
app.get('/test', (req, res) => {
    res.json({ message: "Connection successful!" });
});

// Main routes
app.use('/', require('./routes/authRoutes'));

const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));