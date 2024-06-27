const crypto = require('crypto');

const jwt = require('jsonwebtoken');
const {User, Loan} = require("../models/model")
const bcrypt = require("bcryptjs")





const registerAdmin = async (req, res) => {
  const { phone, name, email, password } = req.body;
    try {
      const userExist = await User.findOne({ $or: [{ email: email }, { phone: phone }] });
      if (userExist) {
        return res.status(400).json({ message: "Email or Phone Exists" });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
     
      const user = new User({ phone , name, email, password: hashedPassword, role: 'admin' });
      await user.save();
      res.status(201).json({ data: 'Admin registered successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Error registering admin' });
    }
  };
  
//Login User
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
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



    // Respond with user data and token
    const data = {
      token,
      phone : user.phone,
      name: user.name,
      email: user.email,
      id: user._id,
    };

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
};



  const loanRequestAproval = async (req, res)=>{

    const {loanId} =req.params

    const getLoan = await Loan.findById(loanId)
    
    if (getLoan.status === "pending"){
        getLoan.status = "approved"
        await getLoan.save()
        res.status(200).json({getLoan})

    }else{
        res.status(400).json({data : "Could Not Approve Loan"})

    }


    
  }



  const loanRequestReject = async (req, res)=>{

    const {loanId} =req.params

    const getLoan = await Loan.findById(loanId)
    
    if (getLoan.status === "pending"){
        getLoan.status = "reject"
        await getLoan.save()
        res.status(200).json({"data" : "Rejected Successfuly"})

    }else{
        res.status(400).json({data : "Could Not Reject Loan"})

    }


    
  }


  const getAllLoanRequest = async (req, res)=>{
    try{

        const allLoan = await Loan.find().populate({
            path : "userId",
            model : "User",
            options : {lean: true}
        }).lean()
    if (allLoan){
        res.status(200).json({data : allLoan})
    }
    }catch(error){
        res.status(200).json({message : error})
    }
    
  }


  //get all user
const getAllUser = async (req, res) => {
    try{
      const officer = await User.find()
  
      res.status(200).json({data:officer});
  
    } catch(error){
      res.status(401).json({message: error.errors})
    }
    
  };
  
const deleteAllUser = async (req, res) => {
    try {
        const result = await User.deleteMany({});
        if (result.deletedCount > 0) {
            res.status(200).json({ data: "All users deleted" });
        } else {
            res.status(200).json({ data: "No users to delete" });
        }
    } catch (error) {
        console.error("Error deleting users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};




  module.exports = {
    registerAdmin,
    loanRequestAproval,
    loanRequestReject,
    getAllLoanRequest,
    deleteAllUser,
    loginAdmin
  }

