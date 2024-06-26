
 const emailValidation = (email) => {
    
     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
   const passwordValidation = (password) => {
  
    return password.length >= 4;
  };

   const inputValidation = (input) => {

    return input.length >= 6;
  };

 
   const phoneValidation = (phone) => {
    const regex = /^\d+$/;
    return (phone.length === 11) && (regex.test(phone));
  
  }

  const  validateAmount = (amount)=> {
   
    return (typeof amount !== 'number' || isNaN(amount) || amount < 100);
  }




  module.exports = {
    emailValidation,
    passwordValidation,
    inputValidation,
    phoneValidation,
    validateAmount
  }
  