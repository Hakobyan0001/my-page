import React from "react";
import { Grid, Paper, Avatar, TextField, Button } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

function Registration() {
  const paperStyle = {
    padding: 20,
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };
  const textfieldStyle = { margin: "5px 0" };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Create Account</h2>
        </Grid>
        <TextField
          style={textfieldStyle}
          label="Username"
          placeholder="Enter username"
          fullWidth
          required
        />
        <TextField
          style={textfieldStyle}
          label="Email"
          placeholder="Enter email"
          fullWidth
          required
        />
        <TextField
          style={textfieldStyle}
          label="Password"
          placeholder="Enter password"
          type="password"
          fullWidth
          required
        />
        <TextField
          style={textfieldStyle}
          label="Confirm Password"
          placeholder="Confirm password"
          type="password"
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
      </Paper>
    </Grid>
  );
}

export default Registration;
