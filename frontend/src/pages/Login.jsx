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
import usersStorage from "../utils/functions";

function Login() {
  usersStorage.clear();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ userName: "", password: "" });
  const [errors, setErrors] = useState({
    userNameError: "",
    passwordError: "",
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
      usersStorage.set("user", res.data);
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
  return (
    <Grid>
      <Paper className="paper" elevation={10}>
        <Grid className="grid">
          <Avatar className="avatar">
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>
        <form onSubmit={handleSubmit}>
          <TextField
            className="textField"
            name="userName"
            label="UserName"
            placeholder="Enter username"
            value={userInfo.userName}
            onChange={handleChange}
            fullWidth
            error={!!(errors && errors.userNameError)}
            helperText={errors.userNameError}
          />
          <FilledInput
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
          />
          <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="Remember me"
          />
          <Button
            className="button"
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
          >
            Sign in
          </Button>
        </form>
        <Typography>
          <Link className="link" to="#">
            Forgot password ?
          </Link>
        </Typography>
        <Typography>
          <Link className="link" to="/registration">
            Create Account
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
export default Login;
