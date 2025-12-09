'use client';

import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Button,
  Box,
  Divider,
  MenuItem,
  Select,
  FormControl,
  CircularProgress,
  Menu,
} from "@mui/material";
import {
  Search,
  ShoppingCart,
  Store,
  HelpOutline,
  Message,
  Person,
  LocationOn,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MyLocation,
  Language,
} from "@mui/icons-material";

export default function Navbar() {
  const [location, setLocation] = useState("Indore");
  const [isDetecting, setIsDetecting] = useState(false);
  const [signInAnchor, setSignInAnchor] = useState(null);
  const [cities, setCities] = useState([
    "Indore",
    "Delhi",
    "Mumbai", 
    "Chennai",
    "Bangalore",
    "Hyderabad",
    "Kolkata",
    "Pune",
    "Ahmedabad"
  ]);

  // Function to detect user's location
  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsDetecting(true);
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // Using OpenStreetMap Nominatim API for reverse geocoding
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          
          if (response.ok) {
            const data = await response.json();
            const city = data.address.city || data.address.town || data.address.village;
            
            if (city) {
              setLocation(city);
              // Add detected city to the list if not already present
              if (!cities.includes(city)) {
                setCities(prev => [city, ...prev]);
              }
            } else {
              setLocation("Location detected");
            }
          } else {
            setLocation("Unable to detect");
          }
        } catch (error) {
          console.error("Error detecting location:", error);
          setLocation("Error detecting");
        } finally {
          setIsDetecting(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setLocation("Location access denied");
        setIsDetecting(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const handleSignInClick = (event: any) => {
  setSignInAnchor(event.currentTarget);
};


  const handleSignInClose = () => {
    setSignInAnchor(null);
  };

  const isSignInOpen = Boolean(signInAnchor);

  return (
    <AppBar position="static" sx={{ bgcolor: "#2e3191", boxShadow: "none" }}>
      <Toolbar sx={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        minHeight: "52px !important",
        paddingX: 2.5,
        gap: 2,
        py: 0.5
      }}>
        
        {/* Left Section - Logo, Search and Get Best Price */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ 
              bgcolor: "white", 
              borderRadius: "50%", 
              width: 30, 
              height: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 0.8
            }}>
              <Typography sx={{ 
                color: "#2e3191", 
                fontWeight: "bold", 
                fontSize: "1.1rem"
              }}>
                M
              </Typography>
            </Box>
            <Typography
              variant="h6"
              sx={{ 
                fontWeight: 600, 
                color: "white", 
                cursor: "pointer",
                fontSize: "1.2rem",
                letterSpacing: "0.3px"
              }}
            >
              indiamart
            </Typography>
          </Box>

          {/* Location and Search */}
          <Box sx={{ 
            display: "flex", 
            alignItems: "center", 
            bgcolor: "white", 
            borderRadius: 0.8,
            flex: 1,
            maxWidth: 650,
            height: 38
          }}>
            {/* Location Selector */}
            <Box sx={{ display: "flex", alignItems: "center", minWidth: 130 }}>
              <LocationOn sx={{ color: "#00bfa5", fontSize: "1.1rem", ml: 1.2, mr: 0.3 }} />
              <FormControl size="small" sx={{ minWidth: 90 }}>
                <Select
                  value={location}
                  displayEmpty
                  sx={{ 
                    border: "none",
                    boxShadow: "none",
                    "& .MuiOutlinedInput-notchedOutline": { border: 0 },
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    color: "#333",
                    "& .MuiSelect-icon": { color: "#666" }
                  }}
                  IconComponent={KeyboardArrowDown}
                  onChange={(e) => {
                    if (e.target.value === "") {
                      detectLocation();
                    } else {
                      setLocation(e.target.value);
                    }
                  }}
                >
                  <MenuItem value="">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <MyLocation fontSize="small" />
                      <span>Detect My Location</span>
                    </Box>
                  </MenuItem>
                  <Divider />
                  {cities.map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Divider orientation="vertical" flexItem sx={{ height: "24px", my: "auto", mx: 0.8 }} />
            
            {/* Search Bar */}
            <Box sx={{ display: "flex", alignItems: "center", flex: 1, pr: 0.8 }}>
              <InputBase
                placeholder="Enter product / service to search"
                sx={{ 
                  flex: 1, 
                  fontSize: "0.85rem",
                  pl: 0.8,
                  color: "#333",
                  "& ::placeholder": {
                    color: "#999",
                    opacity: 1
                  }
                }}
                inputProps={{ "aria-label": "search products" }}
              />
              <Button
                variant="contained"
                sx={{ 
                  bgcolor: "#00bfa5", 
                  color: "white",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  minWidth: 80,
                  height: 30,
                  borderRadius: 0.8,
                  "&:hover": { bgcolor: "#00a88f" },
                  boxShadow: "none"
                }}
                startIcon={<Search sx={{ fontSize: "1rem" }} />}
              >
                Search
              </Button>
            </Box>
          </Box>

          {/* Get Best Price Button */}
          <Button
            variant="contained"
            sx={{ 
              bgcolor: "white",
              color: "#2e3191",
              textTransform: "none", 
              fontWeight: 600,
              fontSize: "0.8rem",
              paddingX: 2,
              paddingY: 0.7,
              borderRadius: 0.8,
              "&:hover": { bgcolor: "#f5f5f5" },
              boxShadow: "none",
              border: "1px solid rgba(255,255,255,0.2)",
              whiteSpace: "nowrap"
            }}
          >
            Get Best Price
          </Button>
        </Box>

        {/* Right Section - Icons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0 }}>
          {/* Exporters Icon */}
          <IconButton 
            color="inherit" 
            sx={{ 
              display: "flex", 
              flexDirection: "column",
              alignItems: "center",
              padding: "4px 10px",
              borderRadius: 0.8,
              "&:hover": { bgcolor: "rgba(255,255,255,0.1)" }
            }}
          >
            <Language sx={{ fontSize: "1.3rem" }} />
            <Typography variant="caption" sx={{ fontSize: "0.65rem", mt: 0.2, lineHeight: 1 }}>
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
              padding: "4px 10px",
              borderRadius: 0.8,
              "&:hover": { bgcolor: "rgba(255,255,255,0.1)" }
            }}
          >
            <Store sx={{ fontSize: "1.3rem" }} />
            <Typography variant="caption" sx={{ fontSize: "0.65rem", mt: 0.2, lineHeight: 1 }}>
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
              padding: "4px 10px",
              borderRadius: 0.8,
              "&:hover": { bgcolor: "rgba(255,255,255,0.1)" }
            }}
          >
            <HelpOutline sx={{ fontSize: "1.3rem" }} />
            <Typography variant="caption" sx={{ fontSize: "0.65rem", mt: 0.2, lineHeight: 1 }}>
              Help
            </Typography>
          </IconButton>

          {/* Messages Icon */}
          <IconButton 
            color="inherit" 
            sx={{ 
              display: "flex", 
              flexDirection: "column",
              alignItems: "center",
              padding: "4px 10px",
              borderRadius: 0.8,
              "&:hover": { bgcolor: "rgba(255,255,255,0.1)" }
            }}
          >
            <Message sx={{ fontSize: "1.3rem" }} />
            <Typography variant="caption" sx={{ fontSize: "0.65rem", mt: 0.2, lineHeight: 1 }}>
              Messages
            </Typography>
          </IconButton>

          {/* Sign In Icon with Dropdown */}
          <Box sx={{ position: "relative" }}>
            <IconButton 
              color="inherit" 
              onClick={handleSignInClick}
              sx={{ 
                display: "flex", 
                flexDirection: "column",
                alignItems: "center",
                padding: "4px 10px",
                borderRadius: 0.8,
                "&:hover": { bgcolor: "rgba(255,255,255,0.1)" }
              }}
            >
              <Person sx={{ fontSize: "1.3rem" }} />
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
                <Typography variant="caption" sx={{ fontSize: "0.65rem", lineHeight: 1 }}>
                  Sign In
                </Typography>
                {isSignInOpen ? (
                  <KeyboardArrowUp sx={{ fontSize: "0.9rem" }} />
                ) : (
                  <KeyboardArrowDown sx={{ fontSize: "0.9rem" }} />
                )}
              </Box>
            </IconButton>

            {/* Sign In Dropdown Menu */}
            <Menu
              anchorEl={signInAnchor}
              open={isSignInOpen}
              onClose={handleSignInClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              PaperProps={{
                sx: {
                  mt: 1,
                  minWidth: 200,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  borderRadius: 1
                }
              }}
            >
              <MenuItem onClick={handleSignInClose} sx={{ py: 1.5, fontSize: "0.9rem", fontWeight: 500 }}>
                Login
              </MenuItem>
              <MenuItem onClick={handleSignInClose} sx={{ py: 1.5, fontSize: "0.9rem", fontWeight: 500 }}>
                Register
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleSignInClose} sx={{ py: 1.5, fontSize: "0.9rem" }}>
                My Account
              </MenuItem>
              <MenuItem onClick={handleSignInClose} sx={{ py: 1.5, fontSize: "0.9rem" }}>
                My Orders
              </MenuItem>
              <MenuItem onClick={handleSignInClose} sx={{ py: 1.5, fontSize: "0.9rem" }}>
                My Wishlist
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}