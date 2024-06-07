
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const {User} = require('../models/model');



//register user or add Paitent
const registerUser =   async (req, res) => {
  if (req.body.password !== ""){
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: hashedPassword,
      });
      
      const data = await user.save();
      res.status(200).json({data : data});
    }
    catch(error){
      res.status(400).json({data : error.message})
    }
  
  } else{
    {
      res.status(400).json({data : "password Required"})
    }
  }
    
  
  }
  
//Login User
const loginUser = async (req, res) => {
  const {password, email} = req.body
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      
      await bcrypt.compare(password, user.password, (wrong, correct)=>{
        if (correct){
        

          // assign Token to user and save
          const token = jwt.sign({ id: user._id, }, process.env.JWT_SECRET, { expiresIn: '24h' });
          const data ={
            token : token,
            name : user.name,
            email : user.email,
            id : user._id,
          }
            res.status(200).json({data : data});

        }else {
          res.status(400).json({ data :  'Invalid Password or Email '});
        }
      })
      
    }else{
      res.status(401).json({ data :  'Invalid Password'});
    }

  }catch(error){
    res.status(400).json({ data :  error});

  }
  
};


//get Single user
const getSingleUser = async (req, res) => {
  try{
    const user = await User.findById({_id:req.params.id})//.populate("consultationId")

    res.status(200).json({data : user});

  } catch(error){
    res.status(400).json({message: error.errors})
  }
  
}


const createLoanRequest = async (req, res) => {
  try {
    const { userId, amount, interestRate, duration } = req.body;
    const loan = new Loan({ userId, amount, interestRate, duration });
    await loan.save();
    res.status(201).json(loan);
  } catch (error) {
    res.status(400).json({ error: 'Error creating loan request' });
  }
};


module.exports = {
  registerUser,
  loginUser,
  getSingleUser,
  createLoanRequest
}