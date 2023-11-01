import {
  Button,
  Grid,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useEffect, useState } from "react";
import request from "../service/request";
import styled from "@emotion/styled";
import EditIcon from "@mui/icons-material/Edit";
import FootballerEditor from "./FootballerEditor";

const StyledDiv = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  width: 330,
}));

const StyledListItem = styled(ListItem)({
  backgroundColor: "#b5b2b2",
  border: "1px solid",
});

export default function NameList({ footballersList, setFootballersList }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingFootballer, setEditingFootballer] = useState(null);
  const [editedName, setEditedName] = useState("");

  useEffect(() => {
    async function fetchData() {
      const data = await request.get("/footballersData");
      setFootballersList(data);
    }
    fetchData();
  }, [footballersList]);

  const startEditing = (footballerId, currentName) => {
    setEditingFootballer({ footballerId, currentName });
    setIsEditing(true);
    setEditedName(currentName);
  };
  const handleCancelEditing = () => {
    setEditingFootballer(null);
    setIsEditing(false);
  };
  const handleSaveEditing = (newName) => {
    const updatedList = footballersList.map((footballer) => {
      if (footballer.footballerId === editingFootballer.footballerId) {
        return { ...footballer, fullName: newName };
      } else {
        return footballer;
      }
    });
    setFootballersList(updatedList);
    setEditingFootballer(null);
    setIsEditing(false);
  };
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
    <Grid sx={{ marginLeft: "200px" }}>
      <Typography
        sx={{ textAlign: "center", mb: "5px" }}
        variant="h6"
        component="div"
      >
        Footballers list
      </Typography>
      <StyledDiv>
        <List sx={{ padding: "0" }}>
          {Array.isArray(footballersList) ? (
            footballersList.map((footballer, index) => (
              <StyledListItem
                component="div"
                key={footballer.footballerId}
                disablePadding
              >
                {isEditing ? (
                  <FootballerEditor
                    currentName={editingFootballer.currentName}
                    onSave={handleSaveEditing}
                    onCancel={handleCancelEditing}
                  />
                ) : (
                  <>
                    <ListItemText
                      sx={{ padding: "5px", color: "#19191b" }}
                      primary={index + 1 + ". " + footballer.fullName}
                    />
                    <IconButton
                      sx={{ color: "#19191b" }}
                      aria-label="delete"
                      onClick={() =>
                        startEditing(
                          footballer.footballerId,
                          footballer.fullName
                        )
                      }
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      sx={{ color: "#19191b" }}
                      aria-label="delete"
                      onClick={() => handleDelete(footballer.footballerId)}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </>
                )}
              </StyledListItem>
            ))
          ) : (
            <Typography variant="body2">No footballers available.</Typography>
          )}
        </List>
      </StyledDiv>
    </Grid>
  );
}
