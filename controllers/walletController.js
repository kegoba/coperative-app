const mongoose = require('mongoose');
const {User,Savings,TransactionHistory} = require('../models/model');
const { acceptPayment , verifyPayment} = require("../services/paymentService")
const {handleNotification} = require("../helpFunction/notificationService")
const crypto = require('crypto');
 




// Get wallet balance
const getWalletBalance = async (req, res) => {
  console.log(req.user.id)
  try {
    const wallet = await Savings.findOne({ userId: req.user.id });
    
    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    res.status(200).json({ balance: wallet.balance });
  } catch (error) {
    console.error('Error fetching wallet balance:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update wallet balance
const creditWallet = async (req, res) => {
  const amount = req.body.amount
  if (typeof amount !== 'number' || isNaN(amount) || amount < 100) {
    return res.status(400).json({ data: "Invalid Amount" });
  }
  try {
    const wallet = await Savings.findOne({ user: userId });
    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    wallet.balance += amount;
    await wallet.save();

    res.status(200).json(wallet);
  } catch (error) {
    console.error('Error updating wallet balance:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



const fundWallet = async (req, res)=>{
    const { amount} = req.body
    if (typeof amount !== 'number' || isNaN(amount) || amount < 100) {
      return res.status(400).json({ data: "Invalid Amount" });
    }
    await acceptPayment(req.user.email, amount)
    .then((response)=>{
        console.log(response)
        res.status(200).json({message : response})
    })
    .catch((error)=>{
        res.status(400).json({message : error})
    })

    
}


const verifyAndCredit = async (req,res)=>{
  const { reference} = req.body;
  const data = await  verifyPayment (reference)
  const paystckAmount= data.data.amount  
  const amount = paystckAmount/100
  const email =  data.data.customer.email

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the wallet associated with the user
    let wallet = await Savings.findOne({ userId: user._id });
    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    // Update the wallet balance
    wallet.balance += amount 
    // Ensure paymentReference is initialized
    if (!Array.isArray(wallet.paymentReference)) {
      wallet.paymentReference = [];
    }
    if (!wallet.paymentReference.includes(reference)) {
        // Push the new reference to the paymentReference array
        wallet.paymentReference.push(reference);
      } else {
        return res.status(301).json({ message: 'Payment reference already verified and save' });
      }
        
    // Save the updated wallet
    //wallet = await wallet.save();

    res.status(200).json(wallet);
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ message: 'Server error during payment verification' });
  }

}





const handleWebHook = async (req, res) => {
  try {
    const PAYSTACK_KEY = process.env.PAYSTACK_KEY;
    const PAYSTACK_SIGNATURE_HEADER = 'x-paystack-signature';

    // Verify Paystack signature
    const hash = crypto.createHmac('sha512', PAYSTACK_KEY)
      .update(JSON.stringify(req.body))
      .digest('hex');

    if (hash !== req.headers[PAYSTACK_SIGNATURE_HEADER]) {
      return res.status(400).json({ message: 'Invalid signature' });
    }

    // Retrieve the request's body
    const data = req.body;

    // Check if payment was successful
    if (data.data.status !== 'success') {
      return res.status(400).json({ message: 'Payment was not successful' });
    }

    const amount = data.data.amount / 100;
    const email = data.data.customer.email;
    const reference = data.data.reference;
    const alert_type = "CREDIT ALERT"

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the wallet associated with the user
    let wallet = await Savings.findOne({ userId: user._id });
    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    // Check if the payment reference has already been processed
    if (!Array.isArray(wallet.paymentReference)) {
      wallet.paymentReference = [];
    }
    if (wallet.paymentReference.includes(reference)) {
      return res.status(400).json({ message: 'Payment reference already verified and saved' });
    }

    // Update the wallet balance and add the payment reference
    wallet.balance += amount ;
    wallet.paymentReference.push(reference);

    // Save the updated wallet
    await wallet.save();

    // Create a new transaction history entry
    await handleNotification (email,amount,alert_type)
    const transactionHistory = new TransactionHistory({
      userId: user._id,
      amount,
      transactionType: alert_type,
      paymentReference: reference,
      narration: "WEB TRANSACTION FROM PAYSTACK"
    });

    await transactionHistory.save();

    res.status(200).json(wallet);
  } catch (error) {
    console.error('Error handling webhook:', error);
    res.status(500).json({ message: 'Server error during payment verification', error: error.message });
  }
};




module.exports = {
    fundWallet,
    verifyAndCredit,
    getWalletBalance,
    creditWallet,
    handleWebHook,
}

    
    
