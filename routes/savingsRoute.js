var route = require('express').Router()
const authenticate = require('../middlewares/authenticate');
const consultationController = require('../controllers/consultation.controller')







route.post('/createconsultation', 
            authenticate, 
            consultationController.createConsultation
        )

route.get('/getalluserconsultation', 
              authenticate,
            consultationController.getAllUserAndConsultation
        )
            


route.delete('/deletealluserconsultation', 
        authenticate,  
                consultationController.deleteAllConsultation
        )



route.post('/getsingleconsulation',
     authenticate,
         consultationController.getSinglePatientConsultation
        )   













module.exports = route