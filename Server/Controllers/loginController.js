require('dotenv').config();

const login = require('../Models/login');
const bcrypt = require('bcrypt'); // to decrypt the password
const jwt = require('jsonwebtoken');


const JWT_SECRET = process.env.JWT_SECRET;


exports.login = async (req,res) =>{
    try{
        const { email, password } = req.body;
        // Check if user exists
        const user = await login.findOne({ email });
            if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
            }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        //jwt token 
        const token = jwt.sign({ id: user._id , email : user.email}, JWT_SECRET, { expiresIn: '1h' });

         // Success
        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
            _id: user._id,
            email: user.email,
            token : token
            // optionally: other fields except password
            }
        });



    }catch(err){
        console.log(err)
    }
}

exports.register = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(email,password)
      // Check if user already exists
      const existingUser = await login.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'User already exists with this email'
        });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds
  
      // Create user
      const user = await login.create({ email, password: hashedPassword });
  
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: { _id: user._id, email: user.email }
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Registration failed', error: err.message });
    }
  };