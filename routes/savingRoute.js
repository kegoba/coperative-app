
const route = require('express').Router()
const {checkAuthentication} = require('../middlewares/authenticate');
const savingcontroller = require('../controllers/savingsController')






//cancelLoanRequest

route.post('/create-fixed-saving', checkAuthentication, savingcontroller.createFixedSavings)








module.exports = route
    