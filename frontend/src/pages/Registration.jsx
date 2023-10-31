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

function Registration() {
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

  return (
    <Grid>
      <Paper elevation={10} className="paper">
        <Grid className="grid">
          <Avatar className="avatar">
            <LockOutlinedIcon />
          </Avatar>
          <h2>Create Account</h2>
        </Grid>
        <form onSubmit={handleSubmit}>
          <TextField
            className="textField"
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
            className="textField"
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
            className="textField"
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
            className="textField"
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
            className="button"
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
          >
            Create Account
          </Button>
        </form>
        <Typography>
          <Link className="link" to="/login">
            Have account ?
          </Link>
        </Typography>
        <Typography>
          <Link className="link" to="/">
            Go to home
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
}

export default Registration;
