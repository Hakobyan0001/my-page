import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";

const StyledLink = styled(Link)`
  margin: 5px;
  text-decoration: none;
  color: black;
  &:hover {
    color: blue;
  }
`;
export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      });
  }, []);

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {users.map((e) => {
        return <h3> username: {e.uName} </h3>;
      })}
      <StyledLink to="/login">Go to Login</StyledLink>
      <StyledLink to="/registration">Go to Registration</StyledLink>
    </div>
  );
}
