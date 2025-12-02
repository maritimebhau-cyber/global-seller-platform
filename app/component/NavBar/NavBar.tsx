'use client';

import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Paper,
  InputBase,
  IconButton,
  Button,
  Box
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { jsx } from "@emotion/react";
import { JSX } from "@emotion/react/jsx-runtime";

export default function Navbar(): JSX.Element {
  return (
    <AppBar position="static" sx={{ bgcolor: "#283593", paddingY: 1 }}>
      <Toolbar sx={{ display: "flex", gap: 2 }}>

        {/* Logo */}
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", color: "white", cursor: "pointer" }}
        >
          indiamart
        </Typography>

        {/* Search Bar */}
        <Paper
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            width: "50%",
            paddingX: 2,
            borderRadius: 1
          }}
        >
          <InputBase
            sx={{ flex: 1 }}
            placeholder="Enter product / service to search"
            inputProps={{ "aria-label": "search products" }}
          />
          <IconButton type="submit">
            <SearchIcon />
          </IconButton>
        </Paper>

        {/* Button */}
        <Button
          variant="contained"
          sx={{ bgcolor: "#43a047", textTransform: "none", fontWeight: 600 }}
        >
          Get Best Price
        </Button>

      </Toolbar>
    </AppBar>
  );
}
