
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {User, Loan, Savings, TransactionHistory } = require('../models/model');

const { 
  emailValidation,
  passwordValidation,
  inputValidation,
  phoneValidation,
  validateAmount,
} = require("../helpFunction/validationService")




  

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
      return res.status(400).json({ data: "Email or Phone Exists" });
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

    // Create savings info for the new user TransactionHistory
    const savings = new Savings({ userId: savedUser._id });
    await savings.save();
    

    // Respond with the saved user info
    return res.status(200).json({ data: "Registeration Successful" });
  } catch (error) {
    return res.status(500).json({ data: error.message });
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
      return res.status(401).json({ message: 'Invalid Email or Password' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid Email or Password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });

    // Populate the wallet information
    const wallet = await Savings.findOne({ userId: user._id });

    // Respond with user data and token
    const data = {
      token,
      name: user.name,
      email: user.email,
      id: user._id,
      balance: wallet.balance,
      interest : wallet.interest,
    };

    res.status(200).json({ data });
  } catch (error) {
    console.error('Error logging in user:', error);
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
    const savings = await Savings.find({ userId });
    const transaction = await TransactionHistory.find({ userId });

    res.status(200).json({ user: user , loans, savings,transaction});
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};


const createLoanRequest = async (req, res) => {
  console.log(req.body)
  try {
    const { amountBorrowed, totalAmountToBePaid, totalInterest, duration , monthlyReturn, loanReference } = req.body;
    const loan = new Loan({ userId : req.user.id, monthlyReturn, amountBorrowed, totalAmountToBePaid, totalInterest, duration,loanReference });
     await loan.save();
    res.status(200).json(loan);
  } catch (error) {
    res.status(400).json({ error: 'Error creating loan request' });
  }
};




module.exports = {
  registerUser,
  loginUser,
  getDashboardDetails,
  createLoanRequest
}