import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import usersStorage from "../utils/functions";
import LogoutIcon from "@mui/icons-material/Logout";
import Container from "./Container";
import NameList from "./List";

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
      <div id="header">
        <div>
          <h1>Welcome back {user.userName}</h1>
        </div>
        <div id="logOut">
          <Link className="link" to="/login">
            Logout <LogoutIcon></LogoutIcon>
          </Link>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <Container
          setFootballersList={setFootballersList}
          footballer={footballer}
          setFootballer={setFootballer}
        />
        <NameList
          footballersList={footballersList}
          setFootballersList={setFootballersList}
        />
      </div>{" "}
    </>
  );
}
