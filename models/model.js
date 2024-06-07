
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: { type: String, required: true, },
  email: { type: String, required: true,unique: true },
  address: { type: String },
  phone: { type: String },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }, // Add role field
},{ timestamps: true });


const loanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  interestRate: { type: Number, required: true },
  duration: { type: Number, required: true }, // Duration in months
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
}, { timestamps: true });


const savingsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  interestRate: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });


const interestEarnedSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  savingsId: { type: mongoose.Schema.Types.ObjectId, ref: 'Savings', required: true },
  calculatedAt: { type: Date, default: Date.now },
}, { timestamps: true });





const InterestEarned = mongoose.model('InterestEarned', interestEarnedSchema);

const Savings = mongoose.model('Savings', savingsSchema);

const Loan = mongoose.model('Loan', loanSchema);

const User = mongoose.model('User', UserSchema);

module.exports = {
  User,
  Loan,
  Savings,
  InterestEarned

}



