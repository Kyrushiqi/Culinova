const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
<<<<<<< Updated upstream
const {mongoose} = require('mongoose')
const app = express();

// Database connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database connected'))
.catch((err) => console.log('Database is not connected', err));

//middleware
app.use(express.json())

app.use('/', require('./routes/authRoutes'))

const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));