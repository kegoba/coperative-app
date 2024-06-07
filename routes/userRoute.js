const route = require('express').Router()
const {authenticate} = require('../middlewares/authenticate');
const userController = require('../controllers/user')
const loanController = require('../controllers/loanController')





route.post('/register',  userController.registerUser)
route.post('/login', userController.loginUser) 
//route.get('/getalluser',authenticate, userController.getAllUser) 
route.get('/getsingleuser/:id', authenticate, userController.getSingleUser)  
//route.get('/deleteuser', authenticate, userController.deleteAllUser)  
route.get('/requestloan', authenticate, loanController.createLoanRequest)













module.exports = route