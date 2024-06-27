const {User, Loan} = require('../models/model');

const createLoanRequest = async (req, res) => {
  try {
    const { amountBorrowed, totalAmountToBePaid, totalInterest, duration , monthlyReturn, loanReference } = req.body;
    const loan = new Loan({ userId : req.user.id, monthlyReturn, amountBorrowed, totalAmountToBePaid, totalInterest, duration,loanReference });
     await loan.save();
    res.status(200).json(loan);
  } catch (error) {
    res.status(400).json({ message : 'Error creating loan request' });
  }
};


const calculateLoan = (req, res) => {
  const { amount, numberOfMonths } = req.body;
  const interestRate = 0.5
  const monthlyInterestRate = interestRate / 100 / 12;
  const numPayments = numberOfMonths;
  const monthlyPayment = (amount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numPayments));
  const totalPayment = monthlyPayment * numPayments;
  res.json({ monthlyPayment, totalPayment });
};


const cancelLoanRequest = async (req, res)=>{

  const {id} =req.params

  const getLoan = await Loan.findById(id)
  
  if (getLoan.status === "pending"){
      getLoan.status = "rejected"
      await getLoan.save()
      res.status(200).json({data : "Rejected Successfuly"})

  }else{
      res.status(400).json({message : "Current Loan is Not Pending"})

  }


  
}


const getLoanRequest = async (req, res)=>{
  const getLoan = await Loan.find({userId :req.user.id})
  
  if (getLoan){
      res.status(200).json({data : getLoan})

  }else{
      res.status(400).json({message : "No Loan Found"})

  }


  
}






module.exports = {
  createLoanRequest,
  calculateLoan,
  cancelLoanRequest,
  getLoanRequest
}