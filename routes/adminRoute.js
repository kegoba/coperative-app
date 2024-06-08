const route = require('express').Router()
const {checkAuthentication,  checkAuthorization} = require('../middlewares/authenticate');
const adminController = require('../controllers/adminController')









route.post('/createadmin',checkAuthentication, adminController.registerAdmin) 
route.post('/approveloan/:id', checkAuthentication, adminController.loanRequestAproval)  
route.post('/rejectloan/:id', checkAuthentication, adminController.loanRequestReject)
route.get('/alloan', checkAuthentication, adminController.getAllLoanRequest)
route.delete('/deleteall', adminController.deleteAllUser)






module.exports = route