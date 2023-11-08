import React from "react";
import { Button, Modal, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Box, styled } from "@mui/system";
import usersStorage from "../../utils/functions";
import request from "../../service/request";

const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "20%",
  backgroundColor: "#999999",
  padding: "10px",
  borderRadius: "5px",
});

const StyledTextFiled = styled(TextField)({
  color: "#19191b",
  "&:focused": { color: "#19191b" },
});
const StyledForm = styled("form")({
  width: "80%",
});

export default function Container({
  setFootballersList,
  footballer,
  setFootballer,
  setListIsLoading,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const ownerId = usersStorage.get("user").id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setListIsLoading(true);
    const requestBody = { footballer, ownerId };
    async function fetchData() {
      await request.post("/", requestBody);
      setFootballersList((prevList) => [...prevList, footballer]);
      setFootballer(() => ({ fullName: "" }));
      console.log("Fotballer data sent successfully.");
    }
    fetchData();
    handleClose();
  };

  const handleChange = (e) => {
    setFootballer((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Grid sx={{ m: "1%", display: "flex", justifyContent: "center" }}>
      <Button
        sx={{
          bgcolor: "#999999",
          color: "#19191b",
          "&:hover": { color: "#999999" },
        }}
        onClick={handleOpen}
      >
        Add Footballer
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <StyledBox>
          <StyledForm onSubmit={handleSubmit}>
            <StyledTextFiled
              name="fullName"
              label="Full name"
              placeholder="Enter first name and second name"
              value={footballer.fullName}
              onChange={handleChange}
              fullWidth
            />
            <Button
              sx={{
                mt: "2%",
                bgcolor: "#19191b",
                "&:hover": { backgroundColor: "#999999" },
              }}
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
            >
              Add
            </Button>
          </StyledForm>
        </StyledBox>
      </Modal>
    </Grid>
  );
}
