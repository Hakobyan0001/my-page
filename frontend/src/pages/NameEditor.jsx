import { Button, Input } from "@mui/material";
import { useState } from "react";
import request from "../service/request";

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
    <>
      <Input
        value={editedName}
        onChange={(e) => setEditedName(e.target.value)}
      />
      <Button onClick={() => handleSaveEditing(editedName)}>Save</Button>
      <Button onClick={() => handleCancelEditing(index)}>Cancel</Button>
    </>
  );
}
