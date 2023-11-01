import { Button, Input } from "@mui/material";
import { useState } from "react";

function FootballerEditor({ currentName, onSave, onCancel }) {
  const [editedName, setEditedName] = useState(currentName);
  //   const handleSave = () => {
  //     onSave(editedName);
  //   };

  return (
    <>
      <Input
        value={editedName}
        onChange={(e) => setEditedName(e.target.value)}
      />
      <Button onClick={(e) => onSave(editedName)}>Save</Button>
      <Button onClick={onCancel}>Cancel</Button>
    </>
  );
}

export default FootballerEditor;
