import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import usersStorage from "../utils/functions";
import NameList from "../Components/Home/List/NameList";
import Header from "../Components/Home/Header";
import Container from "../Components/Home/Container";

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
    <Grid container spacing={2}>
      <Grid item xs={12} sx={{ padding: "0px" }}>
        <Header userName={user.userName} />
      </Grid>
      <Grid item lg={2.5} md={6} sm={6} xs={12}>
        <Container
          setFootballersList={setFootballersList}
          footballer={footballer}
          setFootballer={setFootballer}
        />
      </Grid>
      <Grid item lg={2.5} md={6} sm={6} xs={12}>
        <NameList
          footballersList={footballersList}
          setFootballersList={setFootballersList}
        />
      </Grid>
    </Grid>
  );
}
