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
import request from "../service/request";

export default function NameList({ footballersList, setFootballersList }) {
  useEffect(() => {
    async function fetchData() {
      const data = await request.get("/footballersData");
      setFootballersList(data);
    }
    fetchData();
  }, [footballersList]);

  const handleDelete = (id) => {
    async function fetchData() {
      await request.delete(`/footballersData/${id}`);
      setFootballersList((prevList) =>
        prevList.filter((footballer) => footballer.footballerId !== id)
      );
    }
    fetchData();
  };
  return (
    <Grid className="listGrid">
      <Typography variant="h6" component="div">
        Footballers list{" "}
      </Typography>
      <List className="list">
        {Array.isArray(footballersList) ? (
          footballersList.map((footballer, index) => (
            <ListItem
              className="listItem"
              component="div"
              key={footballer.footballerId}
              disablePadding
            >
              <ListItemText
                className="listItemText"
                primary={index + 1 + ". " + footballer.fullName}
              />
              <IconButton
                aria-label="delete"
                onClick={() => handleDelete(footballer.footballerId)}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </ListItem>
          ))
        ) : (
          <Typography variant="body2">No footballers available.</Typography>
        )}
      </List>
    </Grid>
  );
}
