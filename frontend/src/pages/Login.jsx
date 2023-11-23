import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import FilledInput from "@mui/material/FilledInput";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import usersStorage from "../utils/functions";
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
const StyledFilledInput = styled(FilledInput)({
  backgroundColor: "#999999",
  borderRadius: "4px",
  border: "1px solid #767676",
  ":before": { border: "none" },
});

export default function Login() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({
    usernameError: "",
    passwordError: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    usersStorage.clear();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    const res = await response.json();
    if (res.ok) {
      console.log("User data sent successfully.");
      usersStorage.set("user", res.data);
      navigate("/", { replace: true });
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

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Grid>
      <StyledPaper elevation={10}>
        <Grid align="center">
          <Avatar sx={{ backgroundColor: "#1bbd7e", margin: "auto" }}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>
        <form onSubmit={handleSubmit}>
          <StyledTextField
            name="username"
            label="Username"
            placeholder="Enter username"
            value={userInfo.username}
            onChange={handleChange}
            fullWidth
            error={!!(errors && errors.usernameError)}
            helperText={errors.usernameError}
          />
          <StyledFilledInput
            id="outlined-basic"
            variant="outlined"
            name="password"
            label="Password"
            placeholder="Enter password"
            type={showPassword ? "text" : "password"}
            onChange={handleChange}
            value={userInfo.password}
            fullWidth
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            }
            error={!!(errors && errors.passwordError)}
            helperText={errors.passwordError}
            InputLabelProps={{
              htmlFor: "outlined-basic",
              shrink: true,
            }}
          />
          <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="Remember me"
          />
          <StyledButton
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
          >
            Sign in
          </StyledButton>
        </form>
        <Typography>
          <StyledLink to="#">Forgot password ?</StyledLink>
        </Typography>
        <Typography>
          <StyledLink to="/registration">Create Account</StyledLink>
        </Typography>
        <Typography>
          <StyledLink to="/">Go to home</StyledLink>
        </Typography>
      </StyledPaper>
    </Grid>
  );
}
