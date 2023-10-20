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

export default function NameList({ list }) {
  const [currentList, setCurrentList] = useState([]);
  useEffect(() => {
    setCurrentList(list);
  }, [list]);

  const handleDelete = (index) => {
    setCurrentList(
      currentList.filter((name, id) => {
        return id !== index;
      })
    );
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
          {currentList.map((value, index) => (
            <ListItem
              component="div"
              key={index}
              sx={{ border: "1px solid #808080" }}
              disablePadding
            >
              <ListItemText
                primary={index + 1 + ". " + value.fullName}
                sx={{ padding: "5px" }}
              />
              <IconButton
                aria-label="delete"
                onClick={() => handleDelete(index)}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </StyledDiv>
    </Grid>
  );
}
