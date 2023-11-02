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
  const [isEditing, setIsEditing] = useState([]);
  const [editingFootballer, setEditingFootballer] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await request.get("/footballersData");
      setFootballersList(data);
    }
    fetchData();
  }, [footballersList]);

  const startEditing = (index) => {
    const newIsEditing = [...isEditing];
    newIsEditing[index] = true;
    setIsEditing(newIsEditing);

    setEditingFootballer({
      footballerId: footballersList[index].footballerId,
      currentName: footballersList[index].fullName,
    });
  };

  const handleCancelEditing = (index) => {
    const newIsEditing = [...isEditing];
    newIsEditing[index] = false;
    setIsEditing(newIsEditing);
    setEditingFootballer(null);
  };
  const handleSaveEditing = async (newName, index) => {
    const updatedList = [...footballersList];
    const newIsEditing = [...isEditing];

    updatedList[index] = { ...updatedList[index], fullName: newName };
    newIsEditing[index] = false;
    async function fetchData() {
      await request.put(
        `/footballersData/${footballersList[index].footballerId}`,
        { fullName: newName }
      );
      setFootballersList(updatedList);
      setIsEditing(newIsEditing);
      setEditingFootballer(null);
    }
    fetchData();
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
          {footballersList.map((footballer, index) => (
            <StyledListItem
              component="div"
              key={footballer.footballerId}
              disablePadding
            >
              {isEditing[index] ? (
                <FootballerEditor
                  currentName={editingFootballer.currentName}
                  onSave={(newName) => handleSaveEditing(newName, index)}
                  onCancel={() => handleCancelEditing(index)}
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
                    onClick={() => startEditing(index)}
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
          ))}
        </List>
      </StyledDiv>
    </Grid>
  );
}
