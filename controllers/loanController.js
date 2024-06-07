const {Loan} = require('../models/model');

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

const calculateLoan = (req, res) => {
  const { amount, numberOfMonths } = req.body;
  const interestRate = 0.5
  const monthlyInterestRate = interestRate / 100 / 12;
  const numPayments = numberOfMonths;
  const monthlyPayment = (amount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numPayments));
  const totalPayment = monthlyPayment * numPayments;
  res.json({ monthlyPayment, totalPayment });
};






module.exports = {
  createLoanRequest,
  calculateLoan
}