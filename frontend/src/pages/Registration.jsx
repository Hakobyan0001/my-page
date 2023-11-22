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

const StyledLink = styled(Link)({
  margin: "5px",
  textDecoration: "none",
  color: "#19191b",
  "&:hover": {
    color: "#605e5e",
  },
});
const StyledPaper = styled(Paper)({
  padding: 20,
  width: 280,
  margin: "20px auto",
  backgroundColor: "#999999",
});
const StyledButton = styled(Button)({
  margin: "8px 0",
  backgroundColor: "#19191b",
  color: "#999999",
  "&:hover": { backgroundColor: "#999999", color: "#19191b" },
});
const StyledTextField = styled(TextField)({ margin: "5px 0" });

export default function Registration() {
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
      setUserInfo({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
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
      <StyledPaper elevation={10}>
        <Grid className="grid">
          <Avatar sx={{ backgroundColor: "#1bbd7e", margin: "auto" }}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Create Account</h2>
        </Grid>
        <form onSubmit={handleSubmit}>
          <StyledTextField
            name="userName"
            label="Username"
            placeholder="Enter username"
            value={userInfo.userName}
            onChange={handleChange}
            fullWidth
            error={!!(errors && errors.uNameError)}
            helperText={errors.uNameError}
          />
          <StyledTextField
            name="email"
            label="Email"
            placeholder="Enter email"
            value={userInfo.email}
            onChange={handleChange}
            fullWidth
            error={!!(errors && errors.emailError)}
            helperText={errors.emailError}
          />
          <StyledTextField
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
          <StyledTextField
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
          <StyledButton
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
          >
            Create Account
          </StyledButton>
        </form>
        <Typography>
          <StyledLink to="/login">Have account ?</StyledLink>
        </Typography>
        <Typography>
          <StyledLink to="/">Go to home</StyledLink>
        </Typography>
      </StyledPaper>
    </Grid>
  );
}
