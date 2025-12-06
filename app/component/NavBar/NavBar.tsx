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
  Box,
} from "@mui/material";
import {
  Search,
  ShoppingCart,
  Store,
  HelpOutline,
  Message,
} from "@mui/icons-material";

export default function Navbar() {
  return (
    <AppBar position="static" sx={{ bgcolor: "#283593", paddingY: 1 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        
        {/* Left Section - Logo */}
        <Typography
          variant="h5"
          sx={{ 
            fontWeight: "bold", 
            color: "white", 
            cursor: "pointer",
            flexShrink: 0
          }}
        >
          indiamart
        </Typography>

        {/* Center Section - Search Bar */}
        <Box sx={{ 
          display: "flex", 
          alignItems: "center", 
          flex: 1, 
          maxWidth: 600,
          mx: 2 
        }}>
          <Paper
            component="form"
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              paddingX: 2,
              borderRadius: 1,
              backgroundColor: "white"
            }}
          >
            <InputBase
              sx={{ flex: 1 }}
              placeholder="Enter product / service to search"
              inputProps={{ "aria-label": "search products" }}
            />
            <IconButton type="submit" size="small">
              <Search />
            </IconButton>
          </Paper>
        </Box>

        {/* Right Section - Icons and Button */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Icons Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Buy Icon */}
            <IconButton 
              color="inherit" 
              sx={{ 
                display: "flex", 
                flexDirection: "column",
                alignItems: "center",
                padding: 0.5,
                "&:hover": { color: "#43a047" }
              }}
            >
              <ShoppingCart fontSize="small" />
              <Typography variant="caption" sx={{ fontSize: "0.65rem", textTransform: "uppercase" }}>
                Buy
              </Typography>
            </IconButton>

            {/* Sell Icon */}
            <IconButton 
              color="inherit" 
              sx={{ 
                display: "flex", 
                flexDirection: "column",
                alignItems: "center",
                padding: 0.5,
                "&:hover": { color: "#43a047" }
              }}
            >
              <Store fontSize="small" />
              <Typography variant="caption" sx={{ fontSize: "0.65rem", textTransform: "uppercase" }}>
                Sell
              </Typography>
            </IconButton>

            {/* Help Icon */}
            <IconButton 
              color="inherit" 
              sx={{ 
                display: "flex", 
                flexDirection: "column",
                alignItems: "center",
                padding: 0.5,
                "&:hover": { color: "#43a047" }
              }}
            >
              <HelpOutline fontSize="small" />
              <Typography variant="caption" sx={{ fontSize: "0.65rem", textTransform: "uppercase" }}>
                Help
              </Typography>
            </IconButton>

            {/* Message Icon */}
            <IconButton 
              color="inherit" 
              sx={{ 
                display: "flex", 
                flexDirection: "column",
                alignItems: "center",
                padding: 0.5,
                "&:hover": { color: "#43a047" }
              }}
            >
              <Message fontSize="small" />
              <Typography variant="caption" sx={{ fontSize: "0.65rem", textTransform: "uppercase" }}>
                Message
              </Typography>
            </IconButton>
          </Box>

          {/* Get Best Price Button */}
          <Button
            variant="contained"
            sx={{ 
              bgcolor: "#43a047", 
              textTransform: "none", 
              fontWeight: 600,
              "&:hover": { bgcolor: "#2e7d32" },
              ml: 1
            }}
          >
            Get Best Price
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}