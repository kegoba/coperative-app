const {Savings, InterestEarned } = require('../models/model');


const createSavings = async (req, res) => {
  try {
    const { userId, amount, interestRate } = req.body;
    const savings = new Savings({ userId, amount, interestRate });
    await savings.save();
    res.status(201).json(savings);
  } catch (error) {
    res.status(400).json({ error: 'Error creating savings' });
  }
};



const calculateInterestEarned = async (req, res) => {
  try {
    const { savingsId } = req.body;
    const savings = await Savings.findById(savingsId);
    if (!savings) {
      return res.status(404).json({ error: 'Savings not found' });
    }
    const interestRate = savings.interestRate / 100;
    const interestEarned = savings.amount * interestRate;
    const interestEntry = new InterestEarned({ 
                            userId: savings.userId, 
                            amount: interestEarned,
                            savingsId: savings._id 
                        });
    await interestEntry.save();
    res.json({ interestEarned });
  } catch (error) {
    res.status(400).json({ error: 'Error calculating interest' });
  }
};



module.exports = {
    createSavings,
    calculateInterestEarned

}