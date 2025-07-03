const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
dotenv.config();
connectDB(); // connect MongoDB
// middleware
app.use(cors());
app.use(express.json());


//  --- Routes ---
// test route 
app.get('/',(req,res)=>{ res.send("hello from Backend")});

// Auth routes (register, login)
app.use('/api/auth', require('./routes/authRoutes'));

// Message routes (send & fetch messages - coming in next step)
app.use('/api/messages', require('./routes/messageRoutes'));

//  --- HTTP Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
