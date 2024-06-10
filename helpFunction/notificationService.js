
const { CourierClient } =  require("@trycourier/courier"); 

//await handleNotification (email,amount,alert_type)
const handleNotification = async (email, amount,alert_type) => {
  try {
    const courier = new CourierClient({ 
      authorizationToken: process.env.EMAIL_KEY
    });

    const requestId = await courier.send({
      message: {
        content: {
          title: `${alert_type}`,
          body: `Hello, The sum of ${amount} has been credited to your account. Thank you for banking with us.`
        },
        to: {
          email: email
        }
      }
    });

    // If successful, return 200
    return 200;

  } catch (err) {
    // If an error occurs, return 400
    return 400;
  }
};


    

module.exports = { handleNotification };
  
     


