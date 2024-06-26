var route = require('express').Router()
const {checkAuthentication, checkAuthorization} = require('../middlewares/authenticate');
const welletController = require('../controllers/walletController')




//automaticBulkDebitUsers


route.get('/balance',checkAuthentication, welletController.getWalletBalance) 
route.post('/verifyandcredit', checkAuthentication, welletController.verifyAndCredit)  
route.post('/fundwallet',checkAuthentication, welletController.fundWallet)  
route.post('/wallet-t0-wallet-transfer',checkAuthentication, welletController.walletToWalletTransfer)
route.post('/credit',checkAuthentication, welletController.creditWallet)  
route.post('/webhook', welletController.handleWebHook)  
//handleWebHook










module.exports = route