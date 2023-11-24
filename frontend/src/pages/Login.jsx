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
const StyledTextField = styled(TextField)({
  margin: "5px 0",
  "& label.Mui-focused": {
    color: "#19191b",
  },
  "& .MuiInput-underline:after, & .MuiFilledInput-underline:after": {
    borderBottomColor: "#19191b",
  },
  "& .MuiOutlinedInput-root.Mui-focused": {
    "& fieldset": {
      borderColor: "#19191b",
    },
  },
  "input:-webkit-autofill,input:-webkit-autofill:hover,input:-webkit-autofill:focus,input:-webkit-autofill:active":
    {
      WebkitBoxShadow: "0 0 0 60px #999999 inset!important",
    },
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
          <Avatar
            sx={{
              backgroundColor: "#19191b",
              color: "#999999",
              margin: "auto",
            }}
          >
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
          <StyledTextField
            id="outlined-basic"
            variant="outlined"
            name="password"
            label="Password"
            placeholder="Enter password"
            type={showPassword ? "text" : "password"}
            onChange={handleChange}
            value={userInfo.password}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={!!(errors && errors.passwordError)}
            helperText={errors.passwordError}
            InputLabelProps={{
              htmlFor: "outlined-basic",
              shrink: true,
            }}
          />
          <FormControlLabel
            control={<Checkbox name="checkedB" style={{ color: "#19191b" }} />}
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
      </StyledPaper>
    </Grid>
  );
}
