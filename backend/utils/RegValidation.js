export default class RegValidator {
  static validate(usersData) {
    const fNameError = RegValidator.checkingUserName(usersData.uName);
    const emailError = RegValidator.checkingEmail(usersData.email);
    const passError = RegValidator.checkingPassword(usersData.pass);
    const confirmPassError = RegValidator.confirmingPassword(
      usersData.pass,
      usersData.confirmPass
    );

    return { fNameError, emailError, passError, confirmPassError };
  }

  static checkingUserName(name) {
    if (!name) {
      return "Please enter Username";
    }
    const illegalChars = /\W/;
    if (name.length < 5 || name.length > 15) {
      return "Username must have 5-15 characters";
    } else if (illegalChars.test(name)) {
      return "Please enter valid Username. Use only numbers and alphabets";
    }
    return "";
  }

  static checkingEmail(email) {
    let mailFormat = /\S+@\S+\.\S+/;
    if (!email) {
      return "Please enter email";
    }
    if (email && !email.match(mailFormat)) {
      return "Invalid address!";
    }
    return "";
  }

  static checkingPassword(password) {
    if (!password) {
      return "Please enter password";
    }
    const passFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (!password.match(passFormat)) {
      return "Password must contain 6-20 characters with at least one number, one lowercase letter, and one uppercase letter";
    }
    return "";
  }

  static confirmingPassword(password, confirmPassword) {
    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        return "Passwords Don't Match";
      }
    }
    return "";
  }
}
