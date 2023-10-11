import React, { useState } from "react";
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

function Login() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ uName: "", pass: "" });
  const [errors, setErrors] = useState({
    fNameError: "",
    passError: "",
  });
  const [showPassword, setShowPassword] = useState(false);

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

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  console.log(showPassword);
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
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
            error={!!(errors && errors.fNameError)}
            helperText={errors.fNameError}
          />
          <FilledInput
            id="outlined-basic"
            variant="outlined"
            name="pass"
            label="Password"
            placeholder="Enter password"
            type={showPassword ? "text" : "password"}
            onChange={handleChange}
            value={userInfo.pass}
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
            error={!!(errors && errors.passError)}
            helperText={errors.passError}
          />
          <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
          >
            Sign in
          </Button>
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
      </Paper>
    </Grid>
  );
}
export default Login;
