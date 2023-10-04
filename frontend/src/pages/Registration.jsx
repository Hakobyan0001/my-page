import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { styled } from "@mui/system";

const StyledLink = styled(Link)`
  margin: 5px;
  text-decoration: none;
  color: black;
  &:hover {
    color: blue;
  }
`;
const paperStyle = {
  padding: 20,
  width: 280,
  margin: "20px auto",
};
const avatarStyle = { backgroundColor: "#1bbd7e" };
const btnstyle = { margin: "8px 0" };
const textfieldStyle = { margin: "5px 0" };

function Registration() {
  const [userInfo, setUserInfo] = useState({
    uName: "",
    email: "",
    pass: "",
    confirmPass: "",
  });
  const [errors, setErrors] = useState({
    fNameError: "",
    emailError: "",
    passError: "",
    confirmPassError: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3001/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    const res = await response.json();
    console.log(res);
    if (res.ok) {
      console.log("User data sent successfully.");
      // setUserInfo({ uName: "", email: "", pass: "", confirmPass: "" });
    } else {
      setErrors(res.errors);
    }
  };

  const handleChange = (e) => {
    setUserInfo((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };

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
            error={!!errors.fNameError}
            helperText={errors.fNameError}
          />
          <TextField
            style={textfieldStyle}
            name="email"
            label="Email"
            placeholder="Enter email"
            value={userInfo.email}
            onChange={handleChange}
            fullWidth
            error={!!errors.emailError}
            helperText={errors.emailError}
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
            error={!!errors.passError}
            helperText={errors.passError}
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
            error={!!errors.confirmPassError}
            helperText={errors.confirmPassError}
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
        <Typography>
          <StyledLink to="/login">Have account ?</StyledLink>
        </Typography>
        <Typography>
          <StyledLink to="/">Go to home</StyledLink>
        </Typography>
      </Paper>
    </Grid>
  );
}

export default Registration;
