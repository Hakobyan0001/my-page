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
  setListIsLoading,
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
    setListIsLoading(true);
    async function fetchData() {
      await request.delete(`/footballersData/${id}`);
      setFootballersList((prevList) =>
        prevList.filter((footballer) => footballer.footballerId !== id)
      );
    }
    fetchData();
  };

  return (
    <Grid container sx={{ width: "100%" }}>
      {isEditing[index] ? (
        <NameEditor
          currentName={editingFootballer.currentName}
          index={index}
          setFootballersList={setFootballersList}
          footballersList={footballersList}
          setIsEditing={setIsEditing}
          isEditing={isEditing}
          setEditingFootballer={setEditingFootballer}
          setListIsLoading={setListIsLoading}
        />
      ) : (
        <Grid container xs={12} md={12} lg={12}>
          <Grid item lg={8} md={8} xs={12}>
            <ListItemText
              sx={{ padding: "2%", color: "#19191b" }}
              primary={index + 1 + ". " + fullName}
            />
          </Grid>
          <Grid
            item
            lg={2}
            md={2}
            xs={6}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <IconButton
              sx={{ color: "#19191b" }}
              aria-label="edit"
              onClick={() => startEditing(index)}
            >
              <EditIcon />
            </IconButton>
          </Grid>
          <Grid
            item
            lg={2}
            md={2}
            xs={6}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <IconButton
              sx={{ color: "#19191b" }}
              aria-label="delete"
              onClick={() => handleDelete(footballerId)}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
