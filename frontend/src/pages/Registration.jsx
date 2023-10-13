import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

// styling
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
  // variables
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    uNameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
  });

  // functions
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
    if (res.ok) {
      console.log("User data sent successfully.");
      navigate("/");
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

  // returned code
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
            name="userName"
            label="Username"
            placeholder="Enter username"
            value={userInfo.userName}
            onChange={handleChange}
            fullWidth
            error={!!(errors && errors.uNameError)}
            helperText={errors.uNameError}
          />
          <TextField
            style={textfieldStyle}
            name="email"
            label="Email"
            placeholder="Enter email"
            value={userInfo.email}
            onChange={handleChange}
            fullWidth
            error={!!(errors && errors.emailError)}
            helperText={errors.emailError}
          />
          <TextField
            style={textfieldStyle}
            name="password"
            label="password"
            placeholder="Enter password"
            type="password"
            value={userInfo.password}
            onChange={handleChange}
            fullWidth
            error={!!(errors && errors.passwordError)}
            helperText={errors.passwordError}
          />
          <TextField
            style={textfieldStyle}
            name="confirmPassword"
            label="Confirm password"
            placeholder="Confirm password"
            type="password"
            value={userInfo.confirmPassword}
            onChange={handleChange}
            fullWidth
            error={!!(errors && errors.confirmPasswordError)}
            helperText={errors.confirmPasswordError}
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
