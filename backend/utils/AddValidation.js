export default class AddValidator {
  static validate(data) {
    const fullNameError = AddValidator.checkingFullName(data.fullName);
    return fullNameError;
  }
  static checkingFullName(fullName) {
    const alphabet = /^[A-Za-z]+$/;
    if (!fullName) {
      return "Please enter fullname";
    }
    if (!alphabet.test(fullName)) {
      return "Please enter valid fullname. Use only alphabets";
    }
    return "";
  }
}
