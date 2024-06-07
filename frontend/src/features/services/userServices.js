
import axiosInstance from "./axiosConfig"





export const  calculate = (amount, numberOfMonths)=>{

  const interest = (amount * (5 / 100) * numberOfMonths);
  const totalAmountToBePaid = amount + interest
  const monthlyReturn = totalAmountToBePaid/numberOfMonths
  //const monthlyInterestRate = interestRate / 100 / numberOfMonths;  //Math.round
  return {interest : interest.toFixed(2),
        totalAmountToBePaid : totalAmountToBePaid.toFixed(2), 
        monthlyReturn:monthlyReturn.toFixed(2) };
} 

export const getAllConsultation  = async ()=> {
  const response = await axiosInstance.get("/getalluserconsultation");

  return response.data
    
}

export const getSingleConsulation  = async (data)=> {
  console.log(data,"ser")
  const response = await axiosInstance.post("/getsingleconsulation",data);

  return response.data
    
}


export const createConsultation  = async (data)=> {
  const response = await axiosInstance.post("/createconsultation",data);

  return response
    
}

export const registerUser  = async (data)=> {
  const response = await axiosInstance.post("/user/register",data);

  return response
    
}

export const loginofficer  = async (data)=> {
  const response = await axiosInstance.post("/user/login",data);///user/login
  if(response.status ===200){
    localStorage.setItem("user", JSON.stringify(response.data.data))
    localStorage.setItem("token", (response.data.data.token))
    return response
    
   } 
   return null
    
}


export const getAllUsers  = async (data)=> {
  const response = await axiosInstance.get("/getalluser",data);

  return response.data
    
}

//

export const getSingleUser  = async (id)=> {
  const response = await axiosInstance.get("/getsingleuser/"+id);

  return response.data.data
    
}



   