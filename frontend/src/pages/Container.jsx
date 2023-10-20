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

export default function Container() {
  const [footballer, setFootballer] = useState({ fullName: "" });
  const [footballersList, setFootballersList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFootballersList((prevList) => [...prevList, footballer]);
    setFootballer(() => ({ fullName: "" }));
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
                // error={!!(errors && errors.userNameError)}
                // helperText={errors.userNameError}
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
      <NameList list={footballersList} />
    </Box>
  );
}
