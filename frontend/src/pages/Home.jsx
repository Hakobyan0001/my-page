import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import usersStorage from "../utils/functions";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const StyledLink = styled(Link)`
  margin: 5px;
  text-decoration: none;
  color: black;
  &:hover {
    color: blue;
  }
`;
export default function Home() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = usersStorage.get("user");
    if (savedUser?.id) {
      setLoading(false);
      setUser(savedUser);
      return;
    }
    navigate("/login");
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <h1>Welcome back {user.userName}</h1>
      </div>
      <div>
        {" "}
        <StyledLink to="/login">
          Logout <LogoutIcon></LogoutIcon>
        </StyledLink>
      </div>
      <div>
        {" "}
        <Button variant="contained">Add Footballer</Button>
      </div>
    </div>
  );
}
