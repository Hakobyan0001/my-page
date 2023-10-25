import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, TextField } from "@mui/material";
import NameList from "./List";
import { Box } from "@mui/system";
import usersStorage from "../utils/functions";

export default function Container() {
  const [footballer, setFootballer] = useState({ fullName: "" });
  const [footballersList, setFootballersList] = useState([]);
  const [error, setError] = useState("");
  const ownerId = usersStorage.get("user").id;
  const requestBody = { footballer, ownerId };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3001", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(requestBody),
    });
    const res = await response.json();

    if (res) {
      console.log("User data sent successfully.");
      setFootballersList((prevList) => [...prevList, footballer]);
      setFootballer(() => ({ fullName: "" }));
    } else {
      setError(res.error);
    }
  };

  const handleChange = (e) => {
    setFootballer((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Grid>
        <Accordion style={{ width: 330 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Add Footballer</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <form style={{ width: 280 }} onSubmit={handleSubmit}>
              <TextField
                style={{ margin: "5px 0" }}
                name="fullName"
                label="Full name"
                placeholder="Enter first name and second name"
                value={footballer.fullName}
                onChange={handleChange}
                fullWidth
                error={!!(error && error)}
                helperText={error}
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={{ margin: "8px 0" }}
                fullWidth
              >
                Add Footballer
              </Button>
            </form>
          </AccordionDetails>
        </Accordion>
      </Grid>
      <NameList />
    </Box>
  );
}
