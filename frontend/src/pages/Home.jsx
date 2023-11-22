import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import usersStorage from "../utils/functions";
import NameList from "../Components/Home/List/NameList";
import Header from "../Components/Home/Header";
import Container from "../Components/Home/Container";

export default function Home() {
  const [user, setUser] = useState({});
  const [pageIsloading, setPageIsLoading] = useState(true);
  const [listIsLoading, setListIsLoading] = useState(true);
  const [footballer, setFootballer] = useState({ fullName: "" });
  const [footballersList, setFootballersList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = usersStorage.get("user");
    if (savedUser?.id) {
      setPageIsLoading(false);
      setUser(savedUser);
      return;
    }
    navigate("/login");
  }, []);

  if (pageIsloading) {
    return <div>Loading...</div>;
  }
  return (
    <Grid>
      <Grid sx={{ padding: "0px" }}>
        <Header userName={user.userName} />
      </Grid>
      <Grid
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid sx={{ width: "20%" }}>
          <NameList
            footballersList={footballersList}
            setFootballersList={setFootballersList}
            listIsloading={listIsLoading}
            setListIsLoading={setListIsLoading}
          />
          <Container
            setFootballersList={setFootballersList}
            footballer={footballer}
            setFootballer={setFootballer}
            setListIsLoading={setListIsLoading}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
