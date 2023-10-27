import {
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useEffect } from "react";
import styled from "@emotion/styled";
import request from "../service/request";

const StyledDiv = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  width: 330,
}));

export default function NameList({ footballersList, setFootballersList }) {
  useEffect(() => {
    async function fetchData() {
      const data = await request.get("/footballersData");
      setFootballersList(data);
    }
    fetchData();
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/footballersData/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setFootballersList((prevList) =>
            prevList.filter((footballer) => footballer.footballerId !== id)
          );
          console.log(footballersList);
        } else {
          console.error("Error deleting footballer");
        }
      })
      .catch((error) => {
        console.error("Error deleting footballer:", error);
      });
  };
  return (
    <Grid sx={{ marginLeft: "200px" }}>
      <Typography
        sx={{ textAlign: "center", mb: "5px" }}
        variant="h6"
        component="div"
      >
        Footballers list{" "}
      </Typography>
      <StyledDiv>
        <List>
          {Array.isArray(footballersList) ? (
            footballersList.map((footballer, index) => (
              <ListItem
                component="div"
                key={footballer.footballerId}
                sx={{ border: "1px solid #808080" }}
                disablePadding
              >
                <ListItemText
                  primary={index + 1 + ". " + footballer.fullName}
                  sx={{ padding: "5px" }}
                />
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDelete(footballer.footballerId, index)}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </ListItem>
            ))
          ) : (
            <Typography variant="body2">No footballers available.</Typography>
          )}
        </List>
      </StyledDiv>
    </Grid>
  );
}
