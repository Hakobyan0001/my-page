import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, TextField } from "@mui/material";
import { Box, styled } from "@mui/system";
import usersStorage from "../utils/functions";
import request from "../service/request";

const StyledTextFiled = styled(TextField)({
  color: "#19191b",
  "&:focused": { color: "#19191b" },
});
const StyledForm = styled("form")({
  width: "280px",
});

export default function Container({
  setFootballersList,
  footballer,
  setFootballer,
}) {
  // const [error, setError] = useState("");
  const ownerId = usersStorage.get("user").id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestBody = { footballer, ownerId };
    async function fetchData() {
      await request.post("/", requestBody);
      setFootballersList((prevList) => [...prevList, footballer]);
      setFootballer(() => ({ fullName: "" }));
      console.log("User data sent successfully.");
    }
    fetchData();
  };

  const handleChange = (e) => {
    setFootballer((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Box>
      <Accordion sx={{ width: 330, bgcolor: "#b5b2b2" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Add Footballer</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <StyledForm onSubmit={handleSubmit}>
            <StyledTextFiled
              name="fullName"
              label="Full name"
              placeholder="Enter first name and second name"
              value={footballer.fullName}
              onChange={handleChange}
              fullWidth
              // error={!!(error && error)}
              // helperText={error}
            />
            <Button
              sx={{
                margin: "8px 0",
                bgcolor: "#19191b",
                "&:hover": { backgroundColor: "#999999" },
              }}
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
            >
              Add Footballer
            </Button>
          </StyledForm>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
