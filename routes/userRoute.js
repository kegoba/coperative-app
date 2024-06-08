const route = require('express').Router()
const {checkAuthentication} = require('../middlewares/authenticate');
const userController = require('../controllers/user')
//const loanController = require('../controllers/loanController')





route.post('/register',  userController.registerUser)
route.post('/login', userController.loginUser) 
route.get('/getsingleuser/:id', checkAuthentication, userController.getSingleUser)  
route.post('/loanrequest', checkAuthentication, userController.createLoanRequest)











module.exports = route