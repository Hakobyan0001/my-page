import { IconButton, ListItemText } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import request from "../../../service/request";
import NameEditor from "./NameEditor";
import { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

export default function NameListItem({
  fullName,
  footballerId,
  index,
  setFootballersList,
  footballersList,
}) {
  const [isEditing, setIsEditing] = useState([]);
  const [editingFootballer, setEditingFootballer] = useState(null);

  const startEditing = (index) => {
    const newIsEditing = [...isEditing];
    newIsEditing[index] = true;
    setIsEditing(newIsEditing);

    setEditingFootballer({
      footballerId: footballersList[index].footballerId,
      currentName: footballersList[index].fullName,
    });
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
    <>
      {isEditing[index] ? (
        <NameEditor
          currentName={editingFootballer.currentName}
          index={index}
          setFootballersList={setFootballersList}
          footballersList={footballersList}
          setIsEditing={setIsEditing}
          isEditing={isEditing}
          setEditingFootballer={setEditingFootballer}
        />
      ) : (
        <Grid sx={{ display: "flex", width: "100%" }}>
          <ListItemText
            sx={{ padding: "2%", color: "#19191b" }}
            primary={index + 1 + ". " + fullName}
          />
          <IconButton
            sx={{ color: "#19191b" }}
            aria-label="edit"
            onClick={() => startEditing(index)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            sx={{ color: "#19191b" }}
            aria-label="delete"
            onClick={() => handleDelete(footballerId)}
          >
            <DeleteOutlineIcon />
          </IconButton>
        </Grid>
      )}
    </>
  );
}
