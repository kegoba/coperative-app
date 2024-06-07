
export const emailValidation = (email) => {
    
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  export const passwordValidation = (password) => {
  
    return password.length >= 4;
  };

  export const inputValidation = (input) => {

    return input.length >= 6;
  };

  export const textAreaValidation = (textArea) => {
    
    return textArea.length >= 10;
    
  };


  export const phoneValidation = (phone) => {
    const regex = /^\d+$/;
    return (phone.length === 11) && (regex.test(phone));
  
  }
  