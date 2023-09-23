import React from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";

const StyledLink = styled(Link)`
  margin: 5px;
  text-decoration: none;
  color: black;
  &:hover {
    color: red;
  }
`;
export default function Home() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <StyledLink to="/login">Go to Login</StyledLink>
      <StyledLink to="/registration">Go to Registration</StyledLink>
    </div>
  );
}
