require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const compression = require('compression');
const http = require('http'); // ✅ Import http
const { Server } = require('socket.io'); // ✅ Import socket.io

// Routes
const productRoutes = require('./Routes/productRoutes');
const authRoutes = require('./Routes/LoginRoutes');
const uploadRoutes = require('./Routes/uploadRoutes');
const employeeRoute = require('./Routes/EmployeeRoutes');
const AttendenceRoutes = require('./Routes/AttendenceRoutes');
const LeaveRoutes = require('./Routes/LeavesRoutes');
const MessageRoutes = require('./Routes/messageRotes');

const app = express();
const server = http.createServer(app); // ✅ wrap express app
const allowedOrigins = [
  'http://localhost:5173',
  'https://hrms-portal-fawn.vercel.app',
  'http://172.20.10.2:63776'
];

// Express CORS
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Socket.IO CORS
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
});


app.use(express.json());
app.use(compression());
app.use(express.static('dist'));

// ✅ MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
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
app.use('/', MessageRoutes);

// ✅ Socket.IO logic
io.on('connection', (socket) => {
  console.log('🟢 User connected:', socket.id);

  // Example: Listen for chat messages
  socket.on('sendMessage', (data) => {
    console.log('📩 Message received:', data);

    // Broadcast to all users
    io.emit('receiveMessage', data);
  });

  // Example: Handle disconnect
  socket.on('disconnect', () => {
    console.log('🔴 User disconnected:', socket.id);
  });
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
