
const {User, Loan} = require("../models/model")






const registerAdmin = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = new User({ username, email, password, role: 'admin' });
      await user.save();
      res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
      res.status(400).json({ error: 'Error registering admin' });
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
    deleteAllUser
  }

