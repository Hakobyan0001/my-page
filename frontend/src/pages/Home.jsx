import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import usersStorage from "../utils/functions";
import LogoutIcon from "@mui/icons-material/Logout";
import Container from "./Container";
import NameList from "./List";
import { Box, styled } from "@mui/system";
import { Typography } from "@mui/material";

const StyledLink = styled(Link)({
  margin: "5px",
  textDecoration: "none",
  color: "#999999",
  "&:hover": {
    color: "#19191b",
  },
});
const StyledHeader = styled("div")({
  backgroundColor: "#8a2be2",
  display: "flex",
  justifyContent: "space-between",
});

export default function Home() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [footballer, setFootballer] = useState({ fullName: "" });
  const [footballersList, setFootballersList] = useState([]);

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
    <>
      <StyledHeader>
        <Box>
          <Typography variant="h3">Welcome back {user.userName}</Typography>
        </Box>
        <Box sx={{ paddingTop: "30px" }}>
          <StyledLink to="/login">
            Logout <LogoutIcon></LogoutIcon>
          </StyledLink>
        </Box>
      </StyledHeader>
      <Box sx={{ display: "flex" }}>
        <Container
          setFootballersList={setFootballersList}
          footballer={footballer}
          setFootballer={setFootballer}
        />
        <NameList
          footballersList={footballersList}
          setFootballersList={setFootballersList}
        />
      </Box>{" "}
    </>
  );
}
