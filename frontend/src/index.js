import React from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import App from "./app/App.jsx";
import { createRoot } from "react-dom/client";

const theme = createTheme();
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
