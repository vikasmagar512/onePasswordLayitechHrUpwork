
export function login(credentials){
  const errors = {};
  let isFormValid = false;
  let message = '';
  let foundEmail = false;
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let payload = credentials;
  
  //We can use database here
  let validCredentials = [
    {
      'email':'vikasmagar512@gmail.com',
      'password' : 'pwd'
    },
    {
      'email':'vikasmagar1993@gmail.com',
      'password' : 'pwd'
    }
  ];
  
  if(payload.email.match(mailformat)){
    validCredentials.map(function(c){
      if(c.email === payload.email){
        foundEmail = true;
        if(c.password === payload.password){
          isFormValid = true;
          errors.email= '';  
          errors.password= '';  
        }else{
          errors.password = 'Please enter correct password.';
        }
      }
    });
    if(!foundEmail){
      errors.email = 'You are not registered on this platform.';
    }
  } else{
    errors.email = 'Please enter valid email address.';
  }

  message = 'Login Unsuccessful.';
  if (isFormValid) {
    message = 'Login successful.';
  }
    return {
      success: isFormValid,
      message,
      errors
  };
}


