const route = require('express').Router()
const {checkAuthentication} = require('../middlewares/authenticate');
const userController = require('../controllers/userController')
//const loanController = require('../controllers/loanController')





route.post('/register',  userController.registerUser)
route.post('/login', userController.loginUser) 
route.get('/dashboard', checkAuthentication, userController.getDashboardDetails)  
route.post('/change-password',  checkAuthentication, userController.changePassword) 
route.post('/getuserbyphone',  checkAuthentication, userController.getDetailByPhone) 
route.post('/forgot-password',   userController.forGotPassword)  
route.post('/reset-password',   userController.reSetPassword) //






module.exports = route