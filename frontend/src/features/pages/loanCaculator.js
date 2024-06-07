
import React, { useState } from 'react';
import {Link} from "react-router-dom"
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import { useNavigate } from 'react-router-dom';
import {calculate} from "../services/userServices"
import {passwordValidation, 
        emailValidation,
      } from "../services/validationService"

const LoanCaculators = () => {
  const navigate = useNavigate()
  const [duration, setDuration] = useState('');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState()
 

  const handleCaculate = async (event) => {
    event.preventDefault();
    const response =calculate(amount, duration)

    setResult(response)
    /*if (!passwordValidation()){
      NotificationManager.error("Password Must Be More Than Four Digits","Invalid Password" );
      return
    }
*/ 
   
 
  };

  
  const handleAmount = (e)=>{
    setAmount(parseInt(e.target.value))

    
  }
  const handleDuration = (e)=>{
    const selectedValue = e.target.value;
   if (selectedValue==="YEARLY"){
    setDuration(parseInt(12))

   }else{
        setDuration(parseInt(6))

   } 
    //interest,, monthlyReturn 
  }

  const handLoanRequest = ()=>{
    const data ={
     amount, 
    }
  }
  
  return (
  <>  
    <h5 className="text-xl font-medium text-gray-900 dark:text-white"> Loan Caculator</h5>
    <div className=" max-w-xl md:mx-[450px] mt-10 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
    <h5 class="text-xl font-bold mb-4">Payment Details</h5>
        <div class="grid grid-cols-1 gap-4">
            <div class="grid grid-cols-3 gap-4">
                <p class="text-gray-700">Monthly Interest:</p>
                <p class="col-span-2 text-gray-700">{result?.interest.toLocaleString()}</p>
            </div>
            <div class="grid grid-cols-3 gap-4">
                <p class="text-gray-700">Monthly Payable:</p>
                <p class="col-span-2 text-gray-700">{result?.monthlyReturn.toLocaleString()}</p>
            </div>
            <div class="grid grid-cols-3 gap-4">
                <p class="text-gray-700">Total Payable:</p>
                <p class="col-span-2 text-gray-700">{result?.totalAmountToBePaid.toLocaleString()}</p>
            </div>
        </div>
    <div className="space-y-6 mt-10">
        <div>
            <input placeholder="Amount"   onChange={handleAmount}  type="amount"className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
        </div>
        <div>
            <select type="duration" placeholder="Select Duration"  onChange={handleDuration}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required >
            <option  > Select Duration </option>
            <option value={"YEARLY"} > One Year</option>
            <option value={"QUARTERLY"} > Six Month</option>

            </select>
        </div>
        
        <button onClick={handleCaculate}  className="w-full text-white bg-[#2DC0AC] hover:bg-[#2DC0AC] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Caculate</button>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
        <button onClick={handLoanRequest}  className="w-full text-white bg-[#2DC0AC] hover:[#2DC0AC] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Request</button>
           
        </div>
    </div>
    <NotificationContainer />
</div>
    </>
  );
};

export default LoanCaculators;

