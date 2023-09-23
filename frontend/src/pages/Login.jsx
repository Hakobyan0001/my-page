import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

function Login() {
  const [userInfo, setUserInfo] = useState({ uName: "", pass: "" });
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
    setUserInfo({ uName: "", pass: "" });
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
          <Link href="#">Forgot password ?</Link>
        </Typography>
        <Typography>
          <Link href="#">Create Account</Link>
        </Typography>
      </Paper>
    </Grid>
  );
}

export default Login;
