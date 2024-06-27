
const route = require('express').Router()
const {checkAuthentication} = require('../middlewares/authenticate');
const loanController = require('../controllers/loanController')






//cancelLoanRequest

route.post('/loanrequest', checkAuthentication, loanController.createLoanRequest)
route.post('/cancel-loanrequest/:id', checkAuthentication, loanController.cancelLoanRequest)
route.get('/getloanrequest', checkAuthentication, loanController.getLoanRequest)








module.exports = route
    