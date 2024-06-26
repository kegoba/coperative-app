const route = require('express').Router()
const {checkAuthentication} = require('../middlewares/authenticate');
const userController = require('../controllers/user')
//const loanController = require('../controllers/loanController')





route.post('/register',  userController.registerUser)
route.post('/login', userController.loginUser) 
route.get('/dashboard', checkAuthentication, userController.getDashboardDetails)  
route.post('/loanrequest', checkAuthentication, userController.createLoanRequest)
route.post('/change-password',  checkAuthentication, userController.changePassword) 
route.post('/getuserbyphone',  checkAuthentication, userController.getDetailByPhone) 
route.post('/forgot-password',   userController.forGotPassword)  
route.post('/reset-password',   userController.reSetPassword) //






module.exports = route