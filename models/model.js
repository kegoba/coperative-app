
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  date: { type: Date, default: Date.now },
  name: { type: String, required: true, },
  email: { type: String, required: true,unique: true },
  address: { type: String },
  phone: { type: String },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }, // Add role field
},{ timestamps: true });


const loanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amountBorrowed: { type: Number, required: true },
  monthlyReturn: { type: Number, required: true },
  totalAmountToBePaid: { type: Number, required: true },
  totalInterest: { type: Number, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, default: Date.now }, // Duration in months
  loanReference : {
    type : [String],
    default : []
  },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
}, { timestamps: true });


const savingsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  balance: { type: Number, default : 0},
  interest: { type: Number, default : 0 },
  date: { type: Date, default: Date.now },
  paymentReference: {
    type: [String], // Array of strings
    default: [],
  },
}, { timestamps: true });



const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, default : 0},
  transactionType: { type: String, require:true },
  narration: { type: String },
  date: { type: Date, default: Date.now },
  paymentReference: {
    type: String ,// Array of strings
  },
}, { timestamps: true });

//  user: { type: Schema.Types.ObjectId, ref: 'User' }



const resetPasswordTokenSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  token: {
    type: String,
    required: true
  },
  expires: {
    type: Date,
    required: true,
    default: Date.now() + 3600000 // Token expires in 1 hour
  }
});

const PasswordReset = mongoose.model('PasswordReset', resetPasswordTokenSchema);

const Savings = mongoose.model('Savings', savingsSchema);

const Loan = mongoose.model('Loan', loanSchema);
const TransactionHistory = mongoose.model('TransactionHistory', transactionSchema);

const User = mongoose.model('User', UserSchema);

module.exports = {
  User,
  Loan,
  Savings,
  TransactionHistory,
  PasswordReset,
  


}



