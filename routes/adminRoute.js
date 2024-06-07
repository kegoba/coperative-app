const route = require('express').Router()
const {authenticate, authorizeAdmin} = require('../middlewares/authenticate');
const adminController = require('../controllers/adminController')









route.post('/createadmin',authenticate, adminController.registerAdmin) 
route.post('/approveloan/:id', authenticate, adminController.loanRequestAproval)  
route.post('/rejectloan/:id', authenticate, adminController.loanRequestReject)
route.get('/alloan', authenticate, adminController.getAllLoanRequest)
route.delete('/deleteall', adminController.deleteAllUser)






module.exports = route