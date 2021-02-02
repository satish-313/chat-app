const registerValidation = (args) => {
  const { user, email, password, confirmPassword } = args;
  const errors = {};

  if (user.trim().length < 5) {
    errors.user = "username must be 5 digit long";
  }

  if (email.trim().length < 4) {
    errors.email = "must fill the email field";
  } else {
    const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(regEx)) {
      errors.email = "Email must be valid email address";
    }
  }

  if (password.trim().length < 5) {
    errors.password = "password must 5 length";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "password must be match";
  }

  if (confirmPassword.trim().length < 5) {
    errors.confirmPassword = "password must 5 length";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export { registerValidation };
