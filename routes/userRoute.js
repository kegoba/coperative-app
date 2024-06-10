const route = require('express').Router()
const {checkAuthentication} = require('../middlewares/authenticate');
const userController = require('../controllers/user')
//const loanController = require('../controllers/loanController')





route.post('/register',  userController.registerUser)
route.post('/login', userController.loginUser) 
route.get('/dashboard', checkAuthentication, userController.getDashboardDetails)  
route.post('/loanrequest', checkAuthentication, userController.createLoanRequest)





module.exports = route