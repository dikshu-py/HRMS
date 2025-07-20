
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


const allowedOrigins = [
  'http://localhost:5173',
  'https://hrms-portal-fawn.vercel.app',
   'https://hrms-two-murex.vercel.app',
  'https://hrms-portal-aa2ldavyp-dikshu-pys-projects.vercel.app',
  'https://hrms-portal-aa2ldavyp-dikshu-pys-projects.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    console.log("🌐 Incoming Origin:", origin);
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      console.log("✅ Origin Allowed:", origin);
      return callback(null, true);
    }
    console.log("❌ Origin Blocked:", origin);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(function (req, res, next) {
  if (allowedOrigins.includes(req.headers.origin)) {
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});



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


//for employee
const AttendenceRoutes = require('./Routes/AttendenceRoutes')
app.use("/",AttendenceRoutes)

//for employee
const LeaveRoutes = require('./Routes/LeavesRoutes')
app.use("/",LeaveRoutes)

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
