
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./Routes/productRoutes');
// const Login = require('./models/login');  // keep if you use it
const authMiddleware = require('./Middleware/auth');







const app = express();

// Middleware
app.use(express.json());


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/assignment', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Health check
app.get('/', (req, res) => res.send('Hello from Node.js & MongoDB!'));

const authRoutes = require('./Routes/LoginRoutes');
app.use('/', authRoutes);



//use for Login and Register


// to Upload A Image
const path = require('path');
const uploadRoutes = require('./Routes/uploadRoutes');
app.use(express.static(path.join(__dirname, 'uploads'))); // Serve static files
app.use('/', uploadRoutes);

// Use product routes
app.use('/', productRoutes);

//for employee
const employeeRoute = require('./Routes/EmployeeRoutes')
app.use("/",employeeRoute)

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
