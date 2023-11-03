import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import usersStorage from "../utils/functions";
import Container from "./Container";
import NameList from "./NameList";
import { Box } from "@mui/system";
import Header from "./Header";
import Grid from "@mui/material/Unstable_Grid2";

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
    <Grid>
      <Header userName={user.userName} />
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
      </Box>
    </Grid>
  );
}
