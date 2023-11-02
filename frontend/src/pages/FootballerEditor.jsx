import { Button, Input } from "@mui/material";
import { useState } from "react";

function FootballerEditor({ currentName, onSave, onCancel }) {
  const [editedName, setEditedName] = useState(currentName);

  return (
    <>
      <Input
        value={editedName}
        onChange={(e) => setEditedName(e.target.value)}
      />
      <Button onClick={() => onSave(editedName)}>Save</Button>
      <Button onClick={onCancel}>Cancel</Button>
    </>
  );
}

export default FootballerEditor;
