
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const jwt = require('jsonwebtoken');
const {User, Loan, Wallet, TransactionHistory, PasswordReset } = require('../models/model');
const {handlePasswordNotification} = require("../helpFunction/notificationService")
const { 
  emailValidation,
  passwordValidation,
  inputValidation,
  phoneValidation,
  validateAmount,
} = require("../helpFunction/validationService");
const { messages } = require('@trycourier/courier/api');




  

//register user or add Paitent
const registerUser = async (req, res) => {
  const { name, email, phone, password } = req.body;

  // Validate inputs
  if (!inputValidation(name) || !emailValidation(email) || !phoneValidation(phone) || !passwordValidation(password)) {
    return res.status(400).json({ message: "Invalid Input" });
  }

  try {
    // Check if user already exists by email or phone
    const userExist = await User.findOne({ $or: [{ email: email }, { phone: phone }] });
    if (userExist) {
      return res.status(400).json({ message: "Email or Phone Exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name: name,
      email: email,
      phone: phone,
      password: hashedPassword,
    });

    // Save user to database
    const savedUser = await newUser.save();

    // Create Wallet info for the new user TransactionHistory
    const wallet = new Wallet({ userId: savedUser._id });
    await wallet.save();
    

    // Respond with the saved user info
    return res.status(200).json({ data: "Registeration Successful" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};






//Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validate inputs
  if (!emailValidation(email) || !passwordValidation(password)) {
    return res.status(400).json({ message: "Invalid Input" });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'User Does Not Exist' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid Email or Password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });

    // Populate the wallet information
    const wallet = await Wallet.findOne({ userId: user._id });

    // Respond with user data and token
    const data = {
      token,
      phone : user.phone,
      name: user.name,
      email: user.email,
      id: user._id,
      balance: wallet.balance,
      interest : wallet.interest,
    };

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
};






const forGotPassword =   async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({message : 'User not found'});
    }
    
    const token = crypto.randomBytes(20).toString('hex');
    const expires = Date.now() + 3600000; // Token expires in 1 hour
    
    const resetToken = new PasswordReset({
      user: user._id,
      token: token,
      expires: expires
    });

    await resetToken.save();

    const link = `https://coperativeapp.onrender.com/reset-password/${token}`

    const sendLink = await handlePasswordNotification(email,link)
    if (!sendLink){
      res.status(400).json({data :'Link Was Not Sent'});
    }
    res.status(200).json({data : 'Password reset link sent to your email', link});
  } catch (error) {
    res.status(500).json({message: 'Internal Server Error'});
  }
};






const reSetPassword =  async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const resetToken = await PasswordReset.findOne({ token, expires: { $gt: Date.now() } });
    console.log(resetToken)
    if (!resetToken) {
      return res.status(400).json({message: 'Invalid or expired token'});
    }
    
    const user = await User.findById(resetToken.user);
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    // Delete the reset password token
    await resetToken.deleteOne({ _id: resetToken._id });

    res.status(200).json({data:'Password reset successfully'});
  } catch (error) {
 
    res.status(500).json({message : 'Internal Server Error'});
  }
};







const changePassword =  async (req, res) => {

  const {oldPassword, newPassword } = req.body;
  console.log(req.user, req.user)
  // Validate inputs
  if (!passwordValidation(newPassword)) {
    return res.status(400).json({ message: "Invalid Input" });
  }

  try {
    // Find the user by email
    const user = await User.findOne({email : req.user.email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid user' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid Old Password' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword
    await user.save();
    // Populate the wallet information
    // Respond with user data and token
   

    res.status(200).json({ data : "Password Saved Successfully" });
  } catch (error) {
    console.error('message:', error);
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
  
};




//get Single user
const getDashboardDetails = async (req, res) => {
  const userId = req.user.id;
  if (!userId){
    res.status(400).json({data : "User Not Found"})
  }
  try {
    const user = await User.findOne({ _id: userId })
    const loans = await Loan.find({ userId });
    const wallet = await Wallet.find({ userId });
    const transaction = await TransactionHistory.find({ userId });

    res.status(200).json({ user: user , loans, wallet,transaction});
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};



const getDetailByPhone = async (req, res) => {
  if ( !phoneValidation(req.body.phone)) {
    return res.status(400).json({ message: "Invalid Phone Number" });
  }
  const{phone} = req.body
  if (!phone){
    res.status(400).json({message : "Invalid Phone Number"})
  }
  try {
    const user = await User.findOne({ phone: phone })
    if (!user){
      res.status(400).json({message : "Phone Number Not Found"})
    }else{
      res.status(200).json({ name: user.name, id : user._id});
    }
   
  } catch (err) {
    console.error(err);
    res.status(500).send({message: 'Error When Fetching Data'});
  }
};







module.exports = {
  registerUser,
  loginUser,
  getDashboardDetails,
  forGotPassword,
  reSetPassword,
  changePassword,
  getDetailByPhone,
}