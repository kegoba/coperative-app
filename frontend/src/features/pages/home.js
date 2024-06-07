import React, { useState } from 'react'
import UserConsultations from './userConsultation'
import FilterAllConsulations from './filterAllConsultation'

import {getAllConsultation } from "../services/userServices"
import Dashboard from "./dashboard"


import Motivation from "./motivation"
import Blog from './blog'
import Hero from "./heros"

const Home = () => {
  const [checkUser, setCheckUser]= useState(false)
  const [consultations, setConsultations]= useState()



 
  React.useEffect(() => {
    
    


  }, []);
  return (
    < div >   
    
    <Blog/>
  <Motivation />
     <Hero/>
            
    </div>
  )
}

export default Home