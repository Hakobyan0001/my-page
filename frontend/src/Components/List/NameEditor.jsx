import { IconButton, Input } from "@mui/material";
import { useState } from "react";
import request from "../../../service/request";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import styled from "@emotion/styled";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
const StyledInput = styled(Input)({
  padding: "2%",
  ":before": {
    content: "none",
  },
  ":after": {
    content: "none",
  },
});

export default function NameEditor({
  currentName,
  index,
  setFootballersList,
  footballersList,
  setIsEditing,
  isEditing,
  setEditingFootballer,
}) {
  const [editedName, setEditedName] = useState(currentName);

  const handleSaveEditing = async (newName) => {
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
  const handleCancelEditing = (index) => {
    const newIsEditing = [...isEditing];
    newIsEditing[index] = false;
    setIsEditing(newIsEditing);
    setEditingFootballer(null);
  };

  return (
    <Grid sx={{ display: "flex", width: "100%" }}>
      <StyledInput
        value={editedName}
        onChange={(e) => setEditedName(e.target.value)}
      />
      <IconButton
        sx={{ color: "#19191b" }}
        aria-label="save"
        onClick={() => handleSaveEditing(editedName)}
      >
        <SaveIcon />
      </IconButton>
      <IconButton
        sx={{ color: "#19191b" }}
        aria-label="cancel"
        onClick={() => handleCancelEditing(index)}
      >
        <CancelIcon />
      </IconButton>
    </Grid>
  );
}
