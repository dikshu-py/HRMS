require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const productRoutes = require('./Routes/productRoutes');
const authRoutes = require('./Routes/LoginRoutes');
const uploadRoutes = require('./Routes/uploadRoutes');
const employeeRoute = require('./Routes/EmployeeRoutes');
const AttendenceRoutes = require('./Routes/AttendenceRoutes');
const LeaveRoutes = require('./Routes/LeavesRoutes');
// const authMiddleware = require('./Middleware/auth'); // Optional

const app = express();
app.use(express.json());


const allowedOrigins = [
  'http://localhost:5173',
  'https://hrms-portal-fawn.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow non-browser tools
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


// ✅ MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/assignment', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Health check
app.get('/', (req, res) => res.send('Hello from Node.js & MongoDB!'));

// ✅ Static uploads
app.use(express.static(path.join(__dirname, 'uploads')));

// ✅ Routes
app.use('/', authRoutes);
app.use('/', uploadRoutes);
app.use('/', productRoutes);
app.use('/', employeeRoute);
app.use('/', AttendenceRoutes);
app.use('/', LeaveRoutes);

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
