"use client";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#005f73",
    },
    secondary: {
      main: "#ffd166",
    },
    error: {
      main: "#e63946",
    },
    background: {
      default: "#f1faee",
    },
    text: {
      primary: "#073b4c",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Open Sans", sans-serif',
    h1: {
      fontFamily: '"Poppins", "Montserrat", sans-serif',
      fontWeight: 600,
    },
    body1: {
      fontFamily: '"Roboto", "Open Sans", sans-serif',
    },
  },
});
