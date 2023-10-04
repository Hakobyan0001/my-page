export default class Validator {
  static validate(usersData) {
    const fNameError = Validator.checkingUserName(usersData.uName);
    const emailError = Validator.checkingEmail(usersData.email);
    const passError = Validator.checkingPassword(usersData.pass);
    const confirmPassError = Validator.confirmingPassword(
      usersData.pass,
      usersData.confirmPass
    );

    return { fNameError, emailError, passError, confirmPassError };
  }

  static checkingUserName(name) {
    let error;
    let illegalChars = /\W/;

    if (name == "") {
      error = "Please enter Username";
    } else if (name.length < 5 || name.length > 15) {
      error = "Username must have 5-15 characters";
    } else if (illegalChars.test(name)) {
      error = "Please enter valid Username. Use only numbers and alphabets";
    } else {
      error = "";
    }
    return error;
  }

  static checkingEmail(email) {
    if (email) {
      let mailFormat = /\S+@\S+\.\S+/;
      let error;
      if (email.match(mailFormat)) {
        error = "";
      } else {
        error = "Invalid address!";
      }
      return error;
    }
  }
  static checkingPassword(password) {
    let error;
    {
      var pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      if (password.match(pass)) {
        error = "";
      } else {
        error = "Wrong...!";
      }
      return error;
    }
  }
  // ka sxal
  static confirmingPassword(password, confirmPassword) {
    let error;
    if (confirmPassword) {
      if (password !== confirmPassword) {
        error = "Passwords Don't Match";
      } else {
        error = "correct";
      }
    } else {
      return (error = "please enter password");
    }
  }
}
