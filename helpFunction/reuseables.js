

const  generateReferenceNumber =() => {
    const timestamp = Date.now(); // Current timestamp in milliseconds
    const randomString = Math.random().toString(36).substring(2, 10).toUpperCase(); // Random alphanumeric string
  
    return `REF-${timestamp}-${randomString}`;
  }





  module.exports ={
    generateReferenceNumber
  }