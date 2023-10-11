export default class LogValidator {
  static validate(usersData) {
    const fNameError = LogValidator.checkingUserName(usersData.uName);
    const passError = LogValidator.checkingPassword(usersData.pass);

    return { fNameError, passError };
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
}
