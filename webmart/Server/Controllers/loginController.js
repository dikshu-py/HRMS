require('dotenv').config();

const login = require('../Models/login');
const bcrypt = require('bcrypt'); // to decrypt the password
const jwt = require('jsonwebtoken');


const JWT_SECRET = process.env.JWT_SECRET;


exports.login = async (req, res) => {
  try {
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
    const token = jwt.sign({ id: user._id, email: user.email , name :user.name  }, JWT_SECRET, { expiresIn: '1h' });

    // Success
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        _id: user._id,
        email: user.email,
        token: token,
        name : user.name
        // optionally: other fields except password
      }
    });



  } catch (err) {
    console.log(err)
  }
}

exports.register = async (req, res) => {
  try {
    const { email, password ,name } = req.body;
    console.log(email, password,name)
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
    const user = await login.create({ email, password: hashedPassword  , name });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: { _id: user._id, email: user.email , name : user.name }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Registration failed', error: err.message });
  }
};

// to get List of all users 
exports.allUsers = async (req, res) => {
  try {
    
    users = await login.find();

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error in Getting All Users", error: err.message });
  }
};

exports.updateUser = async (req,res)=>{
  try{
    const {name,id} = req.body
    console.log(id)
    const user = await login.findByIdAndUpdate({_id: id } ,  { name: name }, {new :true}  )
    if(!user){
      return res.status(404).json({success : false , message : "No User Found "})
    }

    res.status(200).json({ success: true, message: "Item updated successfully", data: user });


  }catch(err){
    res.status(400).json({success:false , message : "Error in Updating User"})
  }
}