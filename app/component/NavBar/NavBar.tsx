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
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Popover,
  TextField,
  Badge,
  ListItem,
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
  Menu as MenuIcon,
  Close,
} from "@mui/icons-material";
import { ListItemButton } from "@mui/material";

export default function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const [location, setLocation] = useState("Indore");
  const [isDetecting, setIsDetecting] = useState(false);
  const [signInAnchor, setSignInAnchor] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
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

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileSearchToggle = () => {
    setMobileSearchOpen(!mobileSearchOpen);
  };

  // Desktop Navbar
  const DesktopNavbar = () => (
    <>
      {/* Left Section - Logo, Search and Get Best Price */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", minWidth: { xs: "auto", lg: 140 } }}>
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
              fontSize: { xs: "1rem", md: "1.2rem" },
              letterSpacing: "0.3px",
              whiteSpace: "nowrap"
            }}
          >
            indiamart
          </Typography>
        </Box>

        {/* Location and Search - Hidden on mobile */}
        {!isMobile && (
          <Box sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "white",
            borderRadius: 0.8,
            flex: 1,
            maxWidth: { md: 500, lg: 650 },
            height: 38
          }}>
            {/* Location Selector */}
            <Box sx={{ display: "flex", alignItems: "center", minWidth: { md: 100, lg: 130 } }}>
              <LocationOn sx={{ color: "#00bfa5", fontSize: "1.1rem", ml: 1.2, mr: 0.3 }} />
              <FormControl size="small" sx={{ minWidth: { md: 80, lg: 90 } }}>
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
        )}

        {/* Get Best Price Button - Hidden on mobile */}
        {!isMobile && (
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
              whiteSpace: "nowrap",
              minWidth: 120
            }}
          >
            Get Best Price
          </Button>
        )}
      </Box>

      {/* Right Section - Icons - Hidden on mobile */}
      {!isMobile && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0 }}>
          {/* Exporters Icon */}
          <IconButton
            color="inherit"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "4px 8px",
              borderRadius: 0.8,
              minWidth: "auto",
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
              padding: "4px 8px",
              borderRadius: 0.8,
              minWidth: "auto",
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
              padding: "4px 8px",
              borderRadius: 0.8,
              minWidth: "auto",
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
              padding: "4px 8px",
              borderRadius: 0.8,
              minWidth: "auto",
              "&:hover": { bgcolor: "rgba(255,255,255,0.1)" }
            }}
          >
            <Badge badgeContent={3} color="error" sx={{ "& .MuiBadge-badge": { fontSize: "0.6rem", height: 16, minWidth: 16 } }}>
              <Message sx={{ fontSize: "1.3rem" }} />
            </Badge>
            <Typography variant="caption" sx={{ fontSize: "0.65rem", mt: 0.2, lineHeight: 1 }}>
              Messages
            </Typography>
          </IconButton>

          {/* Sign In Icon with Dropdown - Fixed hover issue */}
          <Box sx={{ position: "relative" }}>
            <Box
              onClick={handleSignInClick}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "4px 8px",
                borderRadius: 0.8,
                cursor: "pointer",
                minWidth: 60,
                "&:hover": { bgcolor: "rgba(255,255,255,0.1)" }
              }}
            >
              <Person sx={{ fontSize: "1.3rem" }} />
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.3, justifyContent: "center" }}>
                <Typography variant="caption" sx={{ fontSize: "0.65rem", lineHeight: 1 }}>
                  Sign In
                </Typography>
                {isSignInOpen ? (
                  <KeyboardArrowUp sx={{ fontSize: "0.9rem" }} />
                ) : (
                  <KeyboardArrowDown sx={{ fontSize: "0.9rem" }} />
                )}
              </Box>
            </Box>

            {/* Sign In Dropdown Menu */}
            <Menu
              anchorEl={signInAnchor}
              open={isSignInOpen}
              onClose={handleSignInClose}
              sx={
                {
                position:"absolute",
                left:"84vw"
                }
              }
         
              PaperProps={{
                sx: {
                  mt: 5,
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
      )}
    </>
  );

  // Mobile Navbar
  const MobileNavbar = () => (
    <>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        {/* Logo and Menu Icon */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            color="inherit"
            onClick={handleMobileMenuToggle}
            sx={{ p: 1 }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{
              bgcolor: "white",
              borderRadius: "50%",
              width: 28,
              height: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 0.6
            }}>
              <Typography sx={{
                color: "#2e3191",
                fontWeight: "bold",
                fontSize: "1rem"
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
                fontSize: "1rem",
                letterSpacing: "0.3px"
              }}
            >
              indiamart
            </Typography>
          </Box>
        </Box>

        {/* Right Icons for Mobile */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          {/* Search Icon */}
          <IconButton
            color="inherit"
            onClick={handleMobileSearchToggle}
            sx={{ p: 1 }}
          >
            <Search />
          </IconButton>

          {/* Cart Icon */}
          <IconButton color="inherit" sx={{ p: 1 }}>
            <Badge badgeContent={2} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>

          {/* User Icon */}
          <IconButton
            color="inherit"
            onClick={handleSignInClick}
            sx={{ p: 1 }}
          >
            <Person />
          </IconButton>
        </Box>
      </Box>

      {/* Mobile Search Popover */}
      <Popover
        open={mobileSearchOpen}
        onClose={handleMobileSearchToggle}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          sx: {
            width: '100%',
            maxWidth: '100vw',
            borderRadius: 0,
            mt: 7,
            p: 2,
            bgcolor: '#2e3191'
          }
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Location Selector for Mobile */}
          <Box sx={{ display: "flex", alignItems: "center", bgcolor: "white", borderRadius: 0.8, p: 1 }}>
            <LocationOn sx={{ color: "#00bfa5", fontSize: "1.1rem", mr: 1 }} />
            <FormControl size="small" fullWidth>
              <Select
                value={location}
                displayEmpty
                sx={{
                  border: "none",
                  boxShadow: "none",
                  "& .MuiOutlinedInput-notchedOutline": { border: 0 },
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  color: "#333",
                }}
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

          {/* Search Bar for Mobile */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              placeholder="Search products/services"
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                bgcolor: "white",
                borderRadius: 0.8,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 0.8,
                }
              }}
            />
            <Button
              variant="contained"
              sx={{
                bgcolor: "#00bfa5",
                color: "white",
                textTransform: "none",
                fontWeight: 600,
                minWidth: 80,
                borderRadius: 0.8,
                "&:hover": { bgcolor: "#00a88f" },
              }}
              startIcon={<Search />}
            >
              Search
            </Button>
          </Box>

          {/* Get Best Price Button for Mobile */}
          <Button
            variant="contained"
            fullWidth
            sx={{
              bgcolor: "white",
              color: "#2e3191",
              textTransform: "none",
              fontWeight: 600,
              py: 1,
              borderRadius: 0.8,
              "&:hover": { bgcolor: "#f5f5f5" },
            }}
          >
            Get Best Price
          </Button>
        </Box>
      </Popover>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
        PaperProps={{
          sx: {
            width: 280,
            bgcolor: "#2e3191",
            color: "white"
          }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Menu
            </Typography>
            <IconButton color="inherit" onClick={handleMobileMenuToggle}>
              <Close />
            </IconButton>
          </Box>
          <List>
            <ListItemButton sx={{ py: 1.5 }}>
              <ListItemIcon sx={{ minWidth: 40, color: "white" }}>
                <Language />
              </ListItemIcon>
              <ListItemText primary="Buy" />
            </ListItemButton>

            <ListItemButton sx={{ py: 1.5 }}>
              <ListItemIcon sx={{ minWidth: 40, color: "white" }}>
                <Store />
              </ListItemIcon>
              <ListItemText primary="Sell" />
            </ListItemButton>

            <ListItemButton sx={{ py: 1.5 }}>
              <ListItemIcon sx={{ minWidth: 40, color: "white" }}>
                <HelpOutline />
              </ListItemIcon>
              <ListItemText primary="Help" />
            </ListItemButton>

            <ListItemButton sx={{ py: 1.5 }}>
              <ListItemIcon sx={{ minWidth: 40, color: "white" }}>
                <Badge badgeContent={3} color="error">
                  <Message />
                </Badge>
              </ListItemIcon>
              <ListItemText primary="Messages" />
            </ListItemButton>

            <Divider sx={{ my: 2, bgcolor: "rgba(255,255,255,0.2)" }} />

            <ListItemButton sx={{ py: 1.5 }}>
              <ListItemIcon sx={{ minWidth: 40, color: "white" }}>
                <Person />
              </ListItemIcon>
              <ListItemText primary="Login / Register" />
            </ListItemButton>

            <ListItem sx={{ py: 1.5 }}>
              <ListItemText primary="My Account" sx={{ pl: 7 }} />
            </ListItem>

            <ListItem sx={{ py: 1.5 }}>
              <ListItemText primary="My Orders" sx={{ pl: 7 }} />
            </ListItem>

            <ListItem sx={{ py: 1.5 }}>
              <ListItemText primary="My Wishlist" sx={{ pl: 7 }} />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2e3191", boxShadow: "none" }}>
      <Toolbar sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        minHeight: "52px !important",
        paddingX: { xs: 1, sm: 2, md: 2.5 },
        gap: { xs: 1, md: 2 },
        py: 0.5
      }}>
        {isMobile ? <MobileNavbar /> : <DesktopNavbar />}
      </Toolbar>
    </AppBar>
  );
}