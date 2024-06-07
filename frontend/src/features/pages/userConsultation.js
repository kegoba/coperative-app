import React, { useState } from 'react';

import {getSingleConsulation} from "../services/userServices"
import { useNavigate } from 'react-router-dom';



const datas = [{
  lastName : "Emma",
  username : "username",
  consultationType : "consultationType",
  medicalCondition : "medicalCondition"


}]


 // Ensure axios is configured as mentioned before

const UserConsultations = () => {
  const nevigate= useNavigate()
 
  const [consultations, setConsultations] = useState();


      React.useEffect(() => {
        const checkUserLogin = localStorage.getItem("user")
        const user = JSON.parse(checkUserLogin)
        if (user){
          const data={officerId: user.id}
          
          const resp = getSingleConsulation(data)
          .then((result)=>{
            
            if (result){
              setConsultations(result.data)
  
            }else{
              console.log("no data")
            }
          }).catch(err=>{
            console.log(err)
          })

        }else{
          nevigate("/login")
        }

      }, []);


  return (
    <div className="container mx-auto p-4">
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4"> User's  Consultations</h2>
        <div className="overflow-x-auto">
        {consultations?.length >0 ? ( consultations?.map((item, key) => (
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Healthcare Provider</th>
                <th className="py-2 px-4 border-b">Consultation Type</th>
                <th className="py-2 px-4 border-b">Medical Condition</th>
              </tr>
            </thead>        
            <tbody>
              
                <tr key={key}>
                  <td className="py-2 px-4 border-b">{new Date(item.date).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b">{item.healthcareProvider}</td>
                  <td className="py-2 px-4 border-b">{item.consultationType}</td>
                  <td className="py-2 px-4 border-b">{item.medicalCondition}</td>
                  <td>  
                  </td>
                </tr>
            </tbody>
          </table>
          ))):(
            <h1 className=''> You Don't Have Consultation</h1>
        
      )}
        </div>
      </div>
    </div>
  );
};

export default UserConsultations;

