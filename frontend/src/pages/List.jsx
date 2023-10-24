import {
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";

const StyledDiv = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  width: 330,
}));

export default function NameList() {
  const [footballersList, setFootballersList] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/footballersData")
      .then((response) => response.json())
      .then((data) => {
        setFootballersList(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [footballersList]);

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/footballersData/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setFootballersList((prevList) =>
            prevList.filter((footballer) => footballer.footballerId !== id)
          );
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
