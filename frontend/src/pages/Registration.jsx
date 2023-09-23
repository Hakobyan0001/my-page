import React, { useState } from "react";
import { Grid, Paper, Avatar, TextField, Button } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

function Registration() {
  const [userInfo, setUserInfo] = useState({
    uName: "",
    email: "",
    pass: "",
    confirmPass: "",
  });

  const paperStyle = {
    padding: 20,
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };
  const textfieldStyle = { margin: "5px 0" };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userInfo);
    validatePassword();
    setUserInfo({ uName: "", email: "", pass: "", confirmPass: "" });
  };

  const handleChange = (e) => {
    setUserInfo((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };

  function validatePassword() {
    if (userInfo.pass !== userInfo.confirmPass) {
      // userInfo.confirmPass.setCustomValidity
      console.log("Passwords Don't Match");
    } else {
      // userInfo.confirmPass.setCustomValidity("");
    }
  }
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Create Account</h2>
        </Grid>
        <form onSubmit={handleSubmit}>
          <TextField
            style={textfieldStyle}
            name="uName"
            label="Username"
            placeholder="Enter username"
            value={userInfo.uName}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            style={textfieldStyle}
            name="email"
            label="Email"
            placeholder="Enter email"
            value={userInfo.email}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            style={textfieldStyle}
            name="pass"
            label="Password"
            placeholder="Enter password"
            type="password"
            value={userInfo.pass}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            style={textfieldStyle}
            name="confirmPass"
            label="Confirm Password"
            placeholder="Confirm password"
            type="password"
            value={userInfo.confirmPass}
            onChange={handleChange}
            fullWidth
            required
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
          >
            Create Account
          </Button>
        </form>
      </Paper>
    </Grid>
  );
}

export default Registration;
