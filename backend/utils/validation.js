function validation(users) {
  function checkingUserName(usersuName) {
    let error = "";
    let illegalChars = /\W/;

    if (usersuName == "") {
      error = "&bull; Please enter Username<br>";
    } else if (usersuName.length < 5 || usersuName.length > 15) {
      error = "&bull; Username must have 5-15 characters<br>";
    } else if (illegalChars.test(usersuName)) {
      error =
        "&bull; Please enter valid Username. Use only numbers and alphabets<br>";
    } else {
      error = "";
    }
    return error;
  }

  function checkingEmail(usersemail) {
    let mailFormat = /\S+@\S+\.\S+/;
    if (usersemail.value.match(mailFormat)) {
      alert("Valid address!");
      return true;
    } else {
      alert("Invalid address!");
      return false;
    }
  }
  function checkingPassword(userspass) {
    {
      var pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      if (userspass.value.match(pass)) {
        alert("Correct, try another...");
        return true;
      } else {
        alert("Wrong...!");
        return false;
      }
    }
  }
  function confirmingPassword(userspass) {
    if (users.pass !== users.confirmPass) {
      console.log("Passwords Don't Match");
    } else {
    }
  }
}
