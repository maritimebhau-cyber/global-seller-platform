'use client';

import { Box, Typography, Button, useTheme, useMediaQuery } from "@mui/material";

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ width: "100%", bgcolor: "#f5f5f5", minHeight: "100vh" }}>

      {/* Hero Banner - Responsive */}
      <Box
        sx={{
          width: "100%",
          height: { xs: 200, sm: 250, md: 300 },
          bgcolor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: { xs: 2, sm: 3, md: 4 },
          px: { xs: 1, sm: 2, md: 0 },
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&h=400&q=80"
          alt="hero banner"
          style={{ 
            width: "100%", 
            maxWidth: "1200px",
            height: "100%", 
            borderRadius: 10,
            objectFit: "cover"
          }}
        />
      </Box>

      {/* Buyer Seller Section - Responsive */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          gap: { xs: 2, md: 4 },
          padding: { xs: 2, sm: 3, md: 4 },
          bgcolor: "white",
          mx: "auto",
        }}
      >
        <Box sx={{ width: { xs: "100%", md: "40%" }, textAlign: { xs: "center", md: "left" } }}>
          <Typography variant={isMobile ? "h5" : "h4"} fontWeight="bold" mb={2}>
            We connect Buyers & Sellers
          </Typography>
          <Typography variant="body1" mb={3}>
            IndiaMART is India's largest online B2B marketplace, connecting buyers with suppliers.
          </Typography>
          <Button 
            variant="contained" 
            sx={{ 
              bgcolor: "#1976d2",
              px: 3,
              py: 1,
              fontSize: { xs: 14, sm: 16 }
            }}
          >
            Explore Marketplace
          </Button>
        </Box>

        <Box sx={{ width: { xs: "100%", md: "40%" } }}>
          <img
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&h=400&q=80"
            alt="buyers sellers illustration"
            style={{ 
              width: "100%", 
              borderRadius: 10,
              height: isMobile ? "200px" : "300px",
              objectFit: "cover"
            }}
          />
        </Box>
      </Box>

      {/* BUILDING CONSTRUCTION SECTION - Responsive */}
      <Box sx={{ 
        width: "100%", 
        padding: { xs: 2, sm: 3, md: 4 }, 
        bgcolor: "white", 
        mt: { xs: 2, sm: 3, md: 4 },
        maxWidth: "1400px",
        mx: "auto",
      }}>

        <Typography variant={isMobile ? "h6" : "h5"} fontWeight="bold" mb={3}>
          Building Construction Material & Equipment
        </Typography>

        <Box sx={{ 
          display: "flex", 
          flexDirection: { xs: "column", md: "row" },
          gap: 3 
        }}>

          {/* Left Big Image Box - Responsive */}
          <Box
            sx={{
              width: { xs: "100%", md: "30%" },
              position: "relative",
              borderRadius: 2,
              overflow: "hidden",
              minHeight: { xs: "300px", md: "600px" },
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&h=800&q=80"
              alt="Construction equipment"
              style={{ 
                width: "100%", 
                height: "100%",
                objectFit: "cover"
              }}
            />

            <Box
              sx={{
                position: "absolute",
                bottom: 20,
                left: 20,
                color: "white",
                fontSize: { xs: 14, sm: 16 },
                display: "flex",
                flexDirection: "column",
                gap: 1,
                textShadow: "1px 1px 3px rgba(0,0,0,0.7)",
                width: "90%",
              }}
            >
              <Typography variant="h6" fontWeight="bold" color="white">
                Construction Essentials
              </Typography>
              <div>Prefabricated Houses</div>
              <div>Scaffolding Planks & Plates</div>
              <div>Construction Machines</div>
              <div>Crushing Machines & Plants</div>

              <Button
                variant="contained"
                sx={{ 
                  mt: 2, 
                  bgcolor: "#00796b", 
                  width: "120px",
                  fontSize: { xs: 12, sm: 14 }
                }}
              >
                View All
              </Button>
            </Box>
          </Box>

          {/* Right Grid - Responsive */}
          <Box
            sx={{
              width: { xs: "100%", md: "70%" },
              display: "grid",
              gridTemplateColumns: { 
                xs: "1fr", 
                sm: "repeat(2, 1fr)", 
                md: "repeat(3, 1fr)" 
              },
              gap: { xs: 2, sm: 2, md: 3 },
            }}
          >

            {/* Each Small Card */}
            {[
              {
                img: "https://images.unsplash.com/photo-1581094794329-c8112a89af5b?auto=format&fit=crop&w=400&h=250&q=80",
                title: "Brick Making Machines",
                list: ["Fly Ash Brick Making Machine", "Clay Brick Making Machine", "Cement Brick Making Machine"],
              },
              {
                img: "https://images.unsplash.com/photo-1581094794329-c8112a89af5c?auto=format&fit=crop&w=400&h=250&q=80",
                title: "Passenger Lifts",
                list: ["Residential Elevator", "Kone Passenger Lift", "Stair Lift"],
              },
              {
                img: "https://images.unsplash.com/photo-1581094794329-c8112a89af5d?auto=format&fit=crop&w=400&h=250&q=80",
                title: "TMT Bars",
                list: ["TMT Steel Bars", "TATA TMT Bars", "Kamdhenu TMT Bars"],
              },
              {
                img: "https://images.unsplash.com/photo-1581094794329-c8112a89af5e?auto=format&fit=crop&w=400&h=250&q=80",
                title: "Plywoods",
                list: ["Shuttering Plywood", "Laminated Plywood", "Waterproof Plywood"],
              },
              {
                img: "https://images.unsplash.com/photo-1581094794329-c8112a89af5f?auto=format&fit=crop&w=400&h=250&q=80",
                title: "Excavator",
                list: ["Hitachi Excavator", "Hyundai Excavator", "Komatsu Excavator"],
              },
              {
                img: "https://images.unsplash.com/photo-1581094794329-c8112a89af60?auto=format&fit=crop&w=400&h=250&q=80",
                title: "Emulsion Paints",
                list: ["Asian Emulsion Paints", "Berger Emulsion Paints", "Nerolac Emulsion Paints"],
              },
              {
                img: "https://images.unsplash.com/photo-1581094794329-c8112a89af61?auto=format&fit=crop&w=400&h=250&q=80",
                title: "Wooden Door",
                list: ["Designer Wooden Door", "Plywood Door", "Wooden Flush Doors"],
              },
              {
                img: "https://images.unsplash.com/photo-1581094794329-c8112a89af62?auto=format&fit=crop&w=400&h=250&q=80",
                title: "PVC Pipes",
                list: ["Finolex Pipes", "Rigid PVC Pipes", "Flexible PVC Pipes"],
              },
              {
                img: "https://images.unsplash.com/photo-1581094794329-c8112a89af63?auto=format&fit=crop&w=400&h=250&q=80",
                title: "Building Brick",
                list: ["Red Brick", "Fly Ash Bricks", "Cement Brick"],
              },
            ].map((item, index) => (
              <Box
                key={index}
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                  padding: { xs: 1.5, sm: 2 },
                  bgcolor: "white",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  '&:hover': {
                    transform: "translateY(-4px)",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                  },
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box sx={{ 
                  width: "100%", 
                  height: { xs: "120px", sm: "140px", md: "150px" },
                  overflow: "hidden",
                  borderRadius: 1,
                  mb: 1,
                }}>
                  <img 
                    src={item.img} 
                    alt={item.title}
                    style={{ 
                      width: "100%", 
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.3s",
                      '&:hover': {
                        transform: "scale(1.05)",
                      }
                    }} 
                  />
                </Box>

                <Typography 
                  fontWeight="bold" 
                  sx={{ 
                    fontSize: { xs: 14, sm: 15, md: 16 },
                    mb: 1,
                    flexGrow: 1,
                  }}
                >
                  {item.title}
                </Typography>

                <Box sx={{ flexGrow: 1 }}>
                  {item.list.map((l, i) => (
                    <Typography 
                      key={i} 
                      sx={{ 
                        fontSize: { xs: 12, sm: 13, md: 14 },
                        color: "#666",
                        mb: 0.5,
                      }}
                    >
                      {l}
                    </Typography>
                  ))}
                </Box>

                <Button 
                  variant="outlined" 
                  size="small"
                  sx={{ 
                    mt: 1, 
                    fontSize: { xs: 11, sm: 12 },
                    py: 0.5,
                  }}
                >
                  View Products
                </Button>
              </Box>
            ))}

          </Box>
        </Box>
      </Box>

      {/* Additional Responsive Features */}
      <Box sx={{ 
        width: "100%", 
        padding: { xs: 2, sm: 3, md: 4 },
        bgcolor: "white",
        mt: { xs: 2, sm: 3, md: 4 },
        textAlign: "center"
      }}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Trusted by Thousands of Businesses
        </Typography>
        <Box sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: { xs: 2, sm: 3, md: 4 },
          mt: 2,
        }}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Box
              key={item}
              sx={{
                width: { xs: 80, sm: 100, md: 120 },
                height: { xs: 40, sm: 50, md: 60 },
                bgcolor: "#f0f0f0",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: { xs: 12, sm: 14 },
                fontWeight: "bold",
                color: "#666",
              }}
            >
              Brand {item}
            </Box>
          ))}
        </Box>
      </Box>

    </Box>
  );
}