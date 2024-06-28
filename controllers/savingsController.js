const { messages } = require('@trycourier/courier/api');
const {Savings, InterestEarned, FixedSaving, Wallet, TransactionHistory } = require('../models/model');
const {validateAmount} = require("../helpFunction/validationService")
const {generateReferenceNumber} = require("../helpFunction/reuseables")







const createFixedSavings = async (req, res) => {
  const paymentReference = generateReferenceNumber()
  const { amount,duration,monthlyReturn,totalAmountToBePaid ,totalInterest } = req.body;
  const userId = req.user.id
  if((validateAmount(amount)) ||  validateAmount(monthlyReturn) ||validateAmount(totalAmountToBePaid)||validateAmount(totalInterest) ){
    return res.status(400).json({ message: 'Invalid Input' });
  }

  if (!userId){
    return res.status(401).json({ message: 'Login Required' });
    
  }
  
  try {
    const wallet = await Wallet.findOne({userId: userId})

    if (wallet.balance < amount){
      return res.status(400).json({ message: 'Insufficient Wallet' });
    }
   
    
    const fixedsaving = new FixedSaving({ 
      userId, fixedAmount : amount, duration,totalInterest,
      monthlyReturn, totalAmountToBePaid, paymentReference
    });
    const transactionHistory = new TransactionHistory({
      userId,
      amount,
      transactionType: "Debit",
      paymentReference: paymentReference,
      narration: "Fixed Deposit Investment"
    });

    wallet.balance -= amount
    await wallet.save()
    await fixedsaving.save();
    await transactionHistory.save()
    return res.status(201).json(fixedsaving);
  } catch (error) {
    return res.status(400).json({ error: 'Error creating savings' });
  }
};





module.exports = {
    
    createFixedSavings

}