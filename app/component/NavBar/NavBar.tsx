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
  Dialog,
  DialogContent,
  SelectChangeEvent,
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
  MyLocation,
  Language,
  Menu as MenuIcon,
  Close,
  Home,
  Settings,
} from "@mui/icons-material";
import { ListItemButton } from "@mui/material";

// Import CSS for flag icons
import 'flag-icons/css/flag-icons.min.css';

// Define country data type
interface CountryData {
  code: string;
  name: string;
  dial_code: string;
  flag: string;
}

// Flag component using flag-icons
const FlagIcon = ({ countryCode }: { countryCode: string }) => {
  const flagClass = `fi fi-${countryCode.toLowerCase()}`;
  
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 32,
        height: 24,
        borderRadius: '2px',
        overflow: 'hidden',
      }}
    >
      <span className={flagClass} style={{ width: '32px', height: '24px' }} />
    </Box>
  );
};

export default function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [location, setLocation] = useState("Indore");
  const [isDetecting, setIsDetecting] = useState(false);
  const [signInAnchor, setSignInAnchor] = useState<HTMLElement | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [cities] = useState([
    "Indore", "Delhi", "Mumbai", "Chennai", "Bangalore", 
    "Hyderabad", "Kolkata", "Pune", "Ahmedabad"
  ]);
  const [signInDialogOpen, setSignInDialogOpen] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [countries, setCountries] = useState<CountryData[]>([
    { code: "IN", name: "India", dial_code: "+91", flag: "in" },
    { code: "US", name: "United States", dial_code: "+1", flag: "us" },
    { code: "GB", name: "United Kingdom", dial_code: "+44", flag: "gb" },
    { code: "AE", name: "United Arab Emirates", dial_code: "+971", flag: "ae" },
    { code: "SA", name: "Saudi Arabia", dial_code: "+966", flag: "sa" },
    { code: "CA", name: "Canada", dial_code: "+1", flag: "ca" },
    { code: "AU", name: "Australia", dial_code: "+61", flag: "au" },
    { code: "DE", name: "Germany", dial_code: "+49", flag: "de" },
    { code: "FR", name: "France", dial_code: "+33", flag: "fr" },
    { code: "JP", name: "Japan", dial_code: "+81", flag: "jp" },
    { code: "SG", name: "Singapore", dial_code: "+65", flag: "sg" },
    { code: "MY", name: "Malaysia", dial_code: "+60", flag: "my" },
  ]);
  const [selectedCountry, setSelectedCountry] = useState<CountryData>({
    code: "IN",
    name: "India",
    dial_code: "+91",
    flag: "in"
  });
  const [loadingCountries, setLoadingCountries] = useState(false);

  // Fetch countries from API
  useEffect(() => {
    const fetchCountries = async () => {
      setLoadingCountries(true);
      try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=cca2,name,idd,flag');
        const data = await response.json();
        
        const formattedCountries: CountryData[] = data
          .filter((country: any) => country.idd?.root && country.idd?.suffixes?.[0])
          .map((country: any) => {
            const dialCode = `${country.idd.root}${country.idd.suffixes[0]}`;
            const flagCode = country.cca2.toLowerCase();
            
            return {
              code: country.cca2,
              name: country.name.common,
              dial_code: dialCode,
              flag: flagCode
            };
          })
          .filter((country: CountryData) => 
            country.dial_code && 
            ['IN', 'US', 'GB', 'AE', 'SA', 'CA', 'AU', 'DE', 'FR', 'JP', 'SG', 'MY'].includes(country.code)
          )
          .sort((a: CountryData, b: CountryData) => a.name.localeCompare(b.name));
        
        const indiaIndex = formattedCountries.findIndex(c => c.code === 'IN');
        if (indiaIndex > -1) {
          const [india] = formattedCountries.splice(indiaIndex, 1);
          formattedCountries.unshift(india);
        }
        
        setCountries(formattedCountries);
      } catch (error) {
        console.error('Error fetching countries:', error);
        setCountries([
          { code: "IN", name: "India", dial_code: "+91", flag: "in" },
          { code: "US", name: "United States", dial_code: "+1", flag: "us" },
          { code: "GB", name: "United Kingdom", dial_code: "+44", flag: "gb" },
          { code: "AE", name: "United Arab Emirates", dial_code: "+971", flag: "ae" },
          { code: "SA", name: "Saudi Arabia", dial_code: "+966", flag: "sa" },
          { code: "CA", name: "Canada", dial_code: "+1", flag: "ca" },
          { code: "AU", name: "Australia", dial_code: "+61", flag: "au" },
          { code: "DE", name: "Germany", dial_code: "+49", flag: "de" },
          { code: "FR", name: "France", dial_code: "+33", flag: "fr" },
          { code: "JP", name: "Japan", dial_code: "+81", flag: "jp" },
          { code: "SG", name: "Singapore", dial_code: "+65", flag: "sg" },
          { code: "MY", name: "Malaysia", dial_code: "+60", flag: "my" },
        ]);
      } finally {
        setLoadingCountries(false);
      }
    };

    fetchCountries();
  }, []);

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
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );

          if (response.ok) {
            const data = await response.json();
            const city = data.address.city || data.address.town || data.address.village;
            if (city) {
              setLocation(city);
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

  const handleSignInClick = (event: React.MouseEvent<HTMLElement>) => {
    setSignInAnchor(event.currentTarget);
  };

  const handleSignInClose = () => {
    setSignInAnchor(null);
  };

  const handleSignInMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    setSignInAnchor(event.currentTarget);
  };

  const handleSignInMouseLeave = () => {
    setTimeout(() => {
      if (signInAnchor) {
        setSignInAnchor(null);
      }
    }, 300);
  };

  const handleOpenSignInDialog = () => {
    setSignInDialogOpen(true);
    setSignInAnchor(null);
  };

  const handleCloseSignInDialog = () => {
    setSignInDialogOpen(false);
    setMobileNumber("");
  };

  const handleMobileNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, '');
    
    let maxLength = 15;
    switch(selectedCountry.code) {
      case 'IN': maxLength = 10; break;
      case 'US': maxLength = 10; break;
      case 'GB': maxLength = 11; break;
      case 'AU': maxLength = 9; break;
      case 'DE': maxLength = 10; break;
      case 'FR': maxLength = 9; break;
      case 'JP': maxLength = 10; break;
      default: maxLength = 15;
    }
    
    setMobileNumber(value.slice(0, maxLength));
  };

  const handleCountryChange = (event: SelectChangeEvent) => {
    const countryCode = event.target.value;
    const country = countries.find(c => c.code === countryCode);
    if (country) {
      setSelectedCountry(country);
      setMobileNumber("");
    }
  };

  const handleSubmitMobileNumber = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Mobile number submitted:", selectedCountry.dial_code + mobileNumber);
    handleCloseSignInDialog();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      if (mobileNumber.length >= 5) {
        handleSubmitMobileNumber(e as any);
      }
    }
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
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
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

      {!isMobile && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0 }}>
          <IconButton
            color="inherit"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "4px 8px",
              borderRadius: 0.8,
              minWidth: "auto",
            }}
          >
            <Language sx={{ fontSize: "1.3rem" }} />
            <Typography variant="caption" sx={{ fontSize: "0.65rem", mt: 0.2, lineHeight: 1 }}>
              Buy
            </Typography>
          </IconButton>

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

          <Box>
            <Box
              onClick={handleOpenSignInDialog}
              onMouseEnter={handleSignInMouseEnter}
              onMouseLeave={handleSignInMouseLeave}
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
                <KeyboardArrowDown sx={{ fontSize: "0.9rem" }} />
              </Box>
            </Box>

            <Menu
              sx={{
                position: "absolute",
                left: "78%",
              }}
              anchorEl={signInAnchor}
              open={isSignInOpen}
              onClose={handleSignInClose}
              onMouseEnter={() => {
                if (signInAnchor) {
                  setSignInAnchor(signInAnchor);
                }
              }}
              onMouseLeave={handleSignInMouseLeave}
              PaperProps={{
                sx: {
                  mt: 2,
                  fontSize: "0.2rem",
                  width: 460,
                  borderRadius: 1.5,
                  overflow: "hidden",
                },
              }}
            >
              <Box sx={{ p: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    bgcolor: "#00bfa5",
                    textTransform: "none",
                    fontWeight: 600,
                    py: 1,
                    borderRadius: 1,
                    "&:hover": { bgcolor: "#00a88f" },
                  }}
                  onClick={handleOpenSignInDialog}
                >
                  Sign In
                </Button>

                <Typography
                  sx={{
                    fontSize: "0.8rem",
                    color: "#666",
                    textAlign: "center",
                    mt: 1,
                  }}
                >
                  New to IndiaMART?{" "}
                  <Box
                    component="span"
                    sx={{ color: "#2e3191", fontWeight: 600, cursor: "pointer" }}
                    onClick={handleOpenSignInDialog}
                  >
                    Join Now
                  </Box>
                </Typography>
              </Box>

              <Divider />

              <MenuItem sx={{ py: 1.2 }} onClick={handleSignInClose}>
                <ListItemIcon>
                  <Home fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </MenuItem>

              <MenuItem sx={{ py: 1.2 }} onClick={handleSignInClose}>
                <ListItemIcon>
                  <Store fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Post Your Requirement" />
              </MenuItem>

              <MenuItem sx={{ py: 1.2 }} onClick={handleSignInClose}>
                <ListItemIcon>
                  <Person fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Verified Business Buyer" />
              </MenuItem>

              <MenuItem sx={{ py: 1.2 }} onClick={handleSignInClose}>
                <ListItemIcon>
                  <Search fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Products / Services Directory" />
              </MenuItem>

              <MenuItem sx={{ py: 1.2 }} onClick={handleSignInClose}>
                <ListItemIcon>
                  <ShoppingCart fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="My Orders" />
              </MenuItem>

              <MenuItem sx={{ py: 1.2 }} onClick={handleSignInClose}>
                <ListItemIcon>
                  <Message fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Recent Activity" />
              </MenuItem>

              <MenuItem sx={{ py: 1.2 }} onClick={handleSignInClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      Settings
                      <Box
                        sx={{
                          bgcolor: "#ffc107",
                          color: "#000",
                          fontSize: "0.65rem",
                          px: 0.8,
                          py: 0.2,
                          borderRadius: 0.8,
                          fontWeight: 600,
                        }}
                      >
                        NEW
                      </Box>
                    </Box>
                  }
                />
              </MenuItem>

              <Divider />

              <MenuItem sx={{ py: 1.2 }} onClick={handleSignInClose}>
                <ListItemText
                  primary="Ship With IndiaMART"
                  secondary="Easy booking of transport"
                />
              </MenuItem>

              <MenuItem sx={{ py: 1.2 }} onClick={handleSignInClose}>
                <ListItemText primary="Download App" />
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

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <IconButton
            color="inherit"
            onClick={handleMobileSearchToggle}
            sx={{ p: 1 }}
          >
            <Search />
          </IconButton>

          <IconButton color="inherit" sx={{ p: 1 }}>
            <Badge badgeContent={2} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>

          <IconButton
            color="inherit"
            onClick={handleOpenSignInDialog}
            sx={{ p: 1 }}
          >
            <Person />
          </IconButton>
        </Box>
      </Box>

      <Popover
        open={mobileSearchOpen}
        onClose={handleMobileSearchToggle}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 60, left: 80 }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            width: '100%',
            maxWidth: '100vw',
            borderRadius: 0,
            p: 2,
            bgcolor: '#2e3191',
            boxShadow: 'none',
            borderTop: '1px solid rgba(255,255,255,0.1)'
          }
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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

            <ListItemButton sx={{ py: 1.5 }} onClick={handleOpenSignInDialog}>
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
    <>
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

      {/* Sign In Dialog - Moved outside AppBar */}
      <Dialog
        open={signInDialogOpen}
        onClose={handleCloseSignInDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            overflow: 'hidden',
            maxWidth: 450,
            position: 'relative',
          }
        }}
      >
        <Box sx={{ 
          bgcolor: "#2e3191", 
          p: 3, 
          textAlign: "center",
          position: 'relative'
        }}>
          <IconButton
            onClick={handleCloseSignInDialog}
            sx={{
              position: 'absolute',
              right: 12,
              top: 12,
              color: 'white',
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.2)',
              }
            }}
          >
            <Close />
          </IconButton>
          <Typography variant="h5" sx={{ color: "white", fontWeight: 600 }}>
            Sign In
          </Typography>
          {/* <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)", mt: 0.5 }}>
            Enter your mobile number to continue
          </Typography> */}
        </Box>

        <DialogContent sx={{ p: 4 }}>
          <Box 
            component="div" 
            sx={{ textAlign: "center" }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 3, fontSize: '1.1rem' }}>
              Mobile Number
            </Typography>
            
            <Box sx={{ display: "flex", alignItems: "center", mb: 4, gap: 1.5 }}>
              <FormControl sx={{ minWidth: 150 }}>
                <Select
                  value={selectedCountry.code}
                  onChange={handleCountryChange}
                  sx={{
                    height: 50,
                    borderRadius: 1,
                    "& .MuiSelect-select": {
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      py: 1.5,
                      px: 2,
                    },
                    "& fieldset": {
                      borderColor: "#ddd",
                    },
                    "&:hover fieldset": {
                      borderColor: "#bbb",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#2e3191",
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        maxHeight: 300,
                        mt: 1,
                      }
                    }
                  }}
                  renderValue={(value) => {
                    const country = countries.find(c => c.code === value);
                    return country ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <FlagIcon countryCode={country.code} />
                        <Box>
                          <Typography sx={{ fontWeight: 600, fontSize: '1rem' }}>
                            {country.dial_code}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#666', fontSize: '0.8rem' }}>
                            {country.name}
                          </Typography>
                        </Box>
                      </Box>
                    ) : (
                      <Typography>Select Country</Typography>
                    );
                  }}
                >
                  {loadingCountries ? (
                    <MenuItem disabled>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', py: 2 }}>
                        <CircularProgress size={20} />
                      </Box>
                    </MenuItem>
                  ) : (
                    countries.map((country) => (
                      <MenuItem key={country.code} value={country.code} sx={{ py: 1.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                          <FlagIcon countryCode={country.code} />
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography sx={{ fontWeight: 500, fontSize: '0.95rem' }} noWrap>
                              {country.name}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#666', fontSize: '0.85rem' }} noWrap>
                              {country.dial_code}
                            </Typography>
                          </Box>
                        </Box>
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
              
              <TextField
                fullWidth
                placeholder="Enter Your Mobile Number"
                value={mobileNumber}
                onChange={handleMobileNumberChange}
                onKeyDown={handleKeyDown}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: 50,
                    fontSize: '1rem',
                    "& fieldset": {
                      borderColor: "#ddd",
                    },
                    "&:hover fieldset": {
                      borderColor: "#bbb",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#2e3191",
                      borderWidth: 1,
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    padding: '0 14px',
                  }
                }}
                inputProps={{
                  type: "tel",
                  style: {
                    fontSize: '1rem',
                  }
                }}
              />
            </Box>

            <Button
              fullWidth
              variant="contained"
              sx={{
                bgcolor: "#00bfa5",
                textTransform: "none",
                fontWeight: 600,
                py: 1.5,
                borderRadius: 1,
                fontSize: "1rem",
                "&:hover": { bgcolor: "#00a88f" },
                mb: 3,
                height: 46,
                boxShadow: 'none',
                '&:disabled': {
                  bgcolor: '#cccccc',
                  color: '#666666'
                }
              }}
              onClick={handleSubmitMobileNumber}
              disabled={mobileNumber.length < 5}
            >
              Submit
            </Button>

            {/* <Typography
              sx={{
                fontSize: "0.85rem",
                color: "#666",
                mb: 3,
              }}
            >
              New to IndiaMART?{" "}
              <Box
                component="span"
                sx={{ color: "#2e3191", fontWeight: 600, cursor: "pointer" }}
                onClick={handleCloseSignInDialog}
              >
                Join Now
              </Box>
            </Typography>

            <Typography variant="body2" sx={{ 
              color: "#666", 
              fontSize: "0.75rem",
              lineHeight: 1.4
            }}>
              By continuing, you agree to IndiaMART{" "}
              <Box component="span" sx={{ color: "#2e3191", cursor: "pointer" }}>
                Terms & Conditions
              </Box>{" "}
              and{" "}
              <Box component="span" sx={{ color: "#2e3191", cursor: "pointer" }}>
                Privacy Policy
              </Box>
            </Typography> */}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}