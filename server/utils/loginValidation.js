const loginValidation = (args) =>{
  const {user,password} =args
  const errors = {}

  if(user.trim().length < 5){
    errors.user = "username must be 5 digit long"
  }

  if(password.trim().length < 5 ){
    errors.password = "password must 5 length"
  }

  return{
    errors,
    valid: Object.keys(errors).length < 1
  }
}

export {loginValidation}