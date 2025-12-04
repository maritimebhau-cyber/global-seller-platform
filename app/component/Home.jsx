'use client';

import { Box, Typography, IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

export default function Home() {
  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Carousel images data
  const carouselImages = [
    {
      url: "/images/boatimage.jpeg",
      alt: "We connect Buyers & Sellers",
      title: "Premium Construction Materials",
      subtitle: "MarineMart is India's largest online B2B marketplace, connecting buyers with suppliers."
    },
    {
      url: "/images/connectivity.png",
      alt: "Industrial equipment",
      title: "Industrial Equipment & Machinery",
      subtitle: "State-of-the-art machinery for modern construction"
    },
    {
      url: "/images/homebanner.jpg",
      alt: "Building solutions",
      title: "Complete Building Solutions",
      subtitle: "One-stop shop for all construction requirements"
    },
    {
      url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&h=600&q=80",
      alt: "Safety equipment",
      title: "Safety & Protection Gear",
      subtitle: "Ensuring safety at every construction site"
    }
  ];

  // Auto slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  // Navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Hero Banner Carousel - Enhanced Big Version */}
      <Box
        sx={{
          width: "100%",
          height: { xs: "60vh", sm: "70vh", md: "80vh" },
          position: "relative",
          overflow: "hidden",
          bgcolor: "black",
        }}
      >
        {/* Carousel Container */}
        <Box
          sx={{
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          {/* Slides Container */}
          <Box
            sx={{
              display: "flex",
              height: "100%",
              transform: `translateX(-${currentSlide * 100}%)`,
              transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {carouselImages.map((image, index) => (
              <Box
                key={index}
                sx={{
                  minWidth: "100%",
                  height: "100%",
                  position: "relative",
                }}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                {/* Gradient Overlay */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)",
                  }}
                />
                
                {/* Text Content - Centered and Bigger */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: { xs: "20px", sm: "50px", md: "100px" },
                    transform: "translateY(-50%)",
                    color: "white",
                    maxWidth: { xs: "90%", sm: "80%", md: "600px" },
                    textAlign: "left",
                  }}
                >
                  <Typography
                    variant="h2"
                    fontWeight="bold"
                    sx={{ 
                      mb: 2,
                      fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
                      lineHeight: 1.2,
                      textShadow: "3px 3px 6px rgba(0,0,0,0.5)",
                    }}
                  >
                    {image.title}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ 
                      mb: 4,
                      fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                      fontWeight: 300,
                      lineHeight: 1.5,
                      textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                    }}
                  >
                    {image.subtitle}
                  </Typography>
                  
                  {/* Call to Action Button */}
                  <Box
                    component="button"
                    onClick={() => console.log("Explore clicked")}
                    sx={{
                      bgcolor: "#1976d2",
                      color: "white",
                      border: "none",
                      padding: { xs: "12px 24px", sm: "16px 32px" },
                      fontSize: { xs: "1rem", sm: "1.1rem" },
                      fontWeight: "bold",
                      borderRadius: "8px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      '&:hover': {
                        bgcolor: "#1565c0",
                        transform: "translateY(-2px)",
                        boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
                      },
                      '&:active': {
                        transform: "translateY(0)",
                      }
                    }}
                  >
                    Explore Now
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Navigation Buttons - Bigger */}
          <IconButton
            onClick={prevSlide}
            sx={{
              position: "absolute",
              top: "50%",
              left: { xs: "10px", sm: "20px", md: "30px" },
              transform: "translateY(-50%)",
              bgcolor: "rgba(255,255,255,0.9)",
              width: { xs: "40px", sm: "50px", md: "60px" },
              height: { xs: "40px", sm: "50px", md: "60px" },
              '&:hover': {
                bgcolor: "white",
                transform: "translateY(-50%) scale(1.1)",
              },
            }}
          >
            <ChevronLeftIcon sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }} />
          </IconButton>

          <IconButton
            onClick={nextSlide}
            sx={{
              position: "absolute",
              top: "50%",
              right: { xs: "10px", sm: "20px", md: "30px" },
              transform: "translateY(-50%)",
              bgcolor: "rgba(255,255,255,0.9)",
              width: { xs: "40px", sm: "50px", md: "60px" },
              height: { xs: "40px", sm: "50px", md: "60px" },
              '&:hover': {
                bgcolor: "white",
                transform: "translateY(-50%) scale(1.1)",
              },
            }}
          >
            <ChevronRightIcon sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }} />
          </IconButton>

          {/* Dots Indicator - Enhanced */}
          <Box
            sx={{
              position: "absolute",
              bottom: { xs: "20px", sm: "30px", md: "40px" },
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: { xs: 1, sm: 1.5 },
              alignItems: "center",
              bgcolor: "rgba(0,0,0,0.4)",
              padding: { xs: "8px 12px", sm: "10px 16px" },
              borderRadius: "50px",
              backdropFilter: "blur(4px)",
            }}
          >
            {carouselImages.map((_, index) => (
              <Box
                key={index}
                onClick={() => goToSlide(index)}
                sx={{ 
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: { xs: "12px", sm: "14px" },
                  height: { xs: "12px", sm: "14px" },
                }}
              >
                {index === currentSlide ? (
                  <CircleIcon sx={{ 
                    fontSize: { xs: "12px", sm: "14px" }, 
                    color: "#1976d2",
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
                  }} />
                ) : (
                  <CircleOutlinedIcon sx={{ 
                    fontSize: { xs: "12px", sm: "14px" }, 
                    color: "rgba(255,255,255,0.7)",
                    transition: "all 0.3s",
                    '&:hover': {
                      color: "white",
                      transform: "scale(1.2)",
                    }
                  }} />
                )}
              </Box>
            ))}
            
            {/* Slide Counter */}
            <Typography
              sx={{
                color: "white",
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                ml: 1,
                pl: 1,
                borderLeft: "1px solid rgba(255,255,255,0.3)",
                fontWeight: "medium",
              }}
            >
              {currentSlide + 1} / {carouselImages.length}
            </Typography>
          </Box>

          {/* Progress Bar */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "3px",
              bgcolor: "rgba(255,255,255,0.2)",
            }}
          >
            <Box
              sx={{
                height: "100%",
                width: `${((currentSlide + 1) / carouselImages.length) * 100}%`,
                bgcolor: "#1976d2",
                transition: "width 0.3s ease",
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}