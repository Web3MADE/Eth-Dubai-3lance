"use client";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import AccountMenu from "../home/AccountMenu";

export default function Navbar() {
  return (
    <Box sx={{ flex: 0 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            3Lance
          </Typography>
          <AccountMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
