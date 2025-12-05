'use client';

import { Box, Typography, IconButton, Grid } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

// Category Icons
import BuildIcon from '@mui/icons-material/Build';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SchoolIcon from '@mui/icons-material/School';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import ChairIcon from '@mui/icons-material/Chair';
import FlightIcon from '@mui/icons-material/Flight';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ComputerIcon from '@mui/icons-material/Computer';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';

// Category Data
const categories = [
  { icon: <BuildIcon sx={{ fontSize: 40 }} />, label: 'Repairs & Service' },
  { icon: <LocalShippingIcon sx={{ fontSize: 40 }} />, label: 'Logistics' },
  { icon: <HomeRepairServiceIcon sx={{ fontSize: 40 }} />, label: 'Contractors' },
  { icon: <BusinessCenterIcon sx={{ fontSize: 40 }} />, label: 'Business Needs' },
  { icon: <LocalHospitalIcon sx={{ fontSize: 40 }} />, label: 'Doctors & Clinics' },
  { icon: <SchoolIcon sx={{ fontSize: 40 }} />, label: 'Education & Coaching' },
  { icon: <RestaurantIcon sx={{ fontSize: 40 }} />, label: 'Restaurants & Food' },
  { icon: <ContentCutIcon sx={{ fontSize: 40 }} />, label: 'Salon & Beauty' },
  { icon: <ChairIcon sx={{ fontSize: 40 }} />, label: 'Furniture' },
  { icon: <FlightIcon sx={{ fontSize: 40 }} />, label: 'Travel & Tourism' },
  { icon: <PhoneAndroidIcon sx={{ fontSize: 40 }} />, label: 'Electronics' },
  { icon: <DirectionsCarIcon sx={{ fontSize: 40 }} />, label: 'Automobiles' },
  { icon: <AttachMoneyIcon sx={{ fontSize: 40 }} />, label: 'Financial Services' },
  { icon: <ComputerIcon sx={{ fontSize: 40 }} />, label: 'IT Services' },
  { icon: <SportsSoccerIcon sx={{ fontSize: 40 }} />, label: 'Sports' },
  { icon: <LocalFloristIcon sx={{ fontSize: 40 }} />, label: 'Flowers & Pets' },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef(null);

  const carouselItems = [
    {
      type: 'video',
      url: '/images/boatimage.mp4',
      alt: 'We connect Buyers & Sellers',
      title: 'Premium Construction Materials',
      subtitle: 'MarineMart is India\'s largest online B2B marketplace, connecting buyers with suppliers.',
    },
    {
      type: 'image',
      url: '/images/connectivity.png',
      alt: 'Industrial equipment',
      title: 'Industrial Equipment & Machinery',
      subtitle: 'State-of-the-art machinery for modern construction',
    },
    {
      type: 'image',
      url: '/images/homebanner.jpg',
      alt: 'Building solutions',
      title: 'Complete Building Solutions',
      subtitle: 'One-stop shop for all construction requirements',
    },
  ];

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselItems.length]);

  // Handle video play when slide becomes active
  useEffect(() => {
    if (videoRef.current && carouselItems[currentSlide].type === 'video') {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay prevented:", error);
      });
    }
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      {/* HERO CAROUSEL */}
      <Box sx={{ 
        width: '100%', 
        height: { xs: '60vh', md: '80vh' }, 
        position: 'relative', 
        overflow: 'hidden', 
        bgcolor: 'black' 
      }}>
        <Box sx={{ 
          width: '100%', 
          height: '100%', 
          position: 'relative' 
        }}>
          {/* Slides Container */}
          <Box sx={{ 
            display: 'flex', 
            height: '100%', 
            transform: `translateX(-${currentSlide * 100}%)`, 
            transition: 'transform 0.7s ease-in-out' 
          }}>
            {carouselItems.map((item, index) => (
              <Box 
                key={index} 
                sx={{ 
                  minWidth: '100%', 
                  height: '100%', 
                  position: 'relative' 
                }}
              >
                {item.type === 'video' ? (
                  <video
                    ref={index === currentSlide ? videoRef : null}
                    src={item.url}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                    muted
                    loop
                    playsInline
                    autoPlay={index === currentSlide}
                  />
                ) : (
                  <img 
                    src={item.url} 
                    alt={item.alt} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover' 
                    }} 
                  />
                )}
                
                {/* Overlay Gradient */}
                <Box sx={{ 
                  position: 'absolute', 
                  inset: 0, 
                  background: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.1))' 
                }} />
                
                {/* Content */}
                <Box sx={{ 
                  position: 'absolute', 
                  top: '50%', 
                  left: { xs: '20px', md: '100px' }, 
                  transform: 'translateY(-50%)', 
                  color: 'white', 
                  maxWidth: { xs: '90%', md: '600px' } 
                }}>
                  <Typography 
                    variant="h2" 
                    fontWeight="bold" 
                    sx={{ 
                      mb: 2, 
                      fontSize: { xs: '2rem', md: '4rem' }, 
                      textShadow: '3px 3px 6px #000' 
                    }}
                  >
                    {item.title}
                  </Typography>
                  
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      mb: 4, 
                      fontSize: { xs: '1rem', md: '1.5rem' }, 
                      fontWeight: 300, 
                      textShadow: '2px 2px 4px #000' 
                    }}
                  >
                    {item.subtitle}
                  </Typography>
                  
                  <Box 
                    component="button" 
                    onClick={() => console.log('Explore clicked')}
                    sx={{ 
                      bgcolor: '#1976d2', 
                      color: 'white', 
                      border: 'none', 
                      p: { xs: '12px 24px', sm: '16px 32px' }, 
                      fontSize: '1.1rem', 
                      fontWeight: 'bold', 
                      borderRadius: '8px', 
                      cursor: 'pointer', 
                      transition: 'all 0.3s', 
                      '&:hover': { 
                        bgcolor: '#1565c0', 
                        transform: 'translateY(-2px)', 
                        boxShadow: '0 6px 20px rgba(0,0,0,0.4)' 
                      } 
                    }}
                  >
                    Explore Now
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Navigation Arrows */}
          <IconButton 
            onClick={prevSlide}
            sx={{ 
              position: 'absolute', 
              top: '50%', 
              left: { xs: '10px', md: '30px' }, 
              transform: 'translateY(-50%)', 
              bgcolor: 'rgba(255,255,255,.9)', 
              width: { xs: 40, md: 60 }, 
              height: { xs: 40, md: 60 }, 
              '&:hover': { 
                bgcolor: '#fff', 
                transform: 'translateY(-50%) scale(1.1)' 
              } 
            }}
          >
            <ChevronLeftIcon sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }} />
          </IconButton>
          
          <IconButton 
            onClick={nextSlide}
            sx={{ 
              position: 'absolute', 
              top: '50%', 
              right: { xs: '10px', md: '30px' }, 
              transform: 'translateY(-50%)', 
              bgcolor: 'rgba(255,255,255,.9)', 
              width: { xs: 40, md: 60 }, 
              height: { xs: 40, md: 60 }, 
              '&:hover': { 
                bgcolor: '#fff', 
                transform: 'translateY(-50%) scale(1.1)' 
              } 
            }}
          >
            <ChevronRightIcon sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }} />
          </IconButton>

          {/* Dots Indicator */}
          <Box sx={{ 
            position: 'absolute', 
            bottom: { xs: '20px', md: '40px' }, 
            left: '50%', 
            transform: 'translateX(-50%)', 
            display: 'flex', 
            gap: 1.5, 
            alignItems: 'center', 
            bgcolor: 'rgba(0,0,0,.4)', 
            px: { xs: 2, sm: 3 }, 
            py: 1, 
            borderRadius: '50px', 
            backdropFilter: 'blur(4px)' 
          }}>
            {carouselItems.map((_, idx) => (
              <Box 
                key={idx} 
                onClick={() => goToSlide(idx)}
                sx={{ 
                  cursor: 'pointer', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  width: 14, 
                  height: 14 
                }}
              >
                {idx === currentSlide ? 
                  <CircleIcon sx={{ fontSize: 14, color: '#1976d2' }} /> : 
                  <CircleOutlinedIcon sx={{ 
                    fontSize: 14, 
                    color: 'rgba(255,255,255,.7)', 
                    '&:hover': { 
                      color: '#fff', 
                      transform: 'scale(1.2)' 
                    } 
                  }} />}
              </Box>
            ))}
            
            <Typography sx={{ 
              color: '#fff', 
              fontSize: { xs: '.75rem', sm: '.875rem' }, 
              ml: 1, 
              pl: 1, 
              borderLeft: '1px solid rgba(255,255,255,.3)', 
              fontWeight: 500 
            }}>
              {currentSlide + 1} / {carouselItems.length}
            </Typography>
          </Box>

          {/* Progress Bar */}
          <Box sx={{ 
            position: 'absolute', 
            bottom: 0, 
            left: 0, 
            width: '100%', 
            height: 3, 
            bgcolor: 'rgba(255,255,255,.2)' 
          }}>
            <Box sx={{ 
              height: '100%', 
              width: `${((currentSlide + 1) / carouselItems.length) * 100}%`, 
              bgcolor: '#1976d2', 
              transition: 'width .3s' 
            }} />
          </Box>
        </Box>
      </Box>

      {/* CATEGORY ICON GRID */}
      <Box sx={{ 
        px: { xs: 2, sm: 4, md: 8 }, 
        py: 6, 
        bgcolor: '#fff' 
      }}>
        <Typography 
          variant="h4" 
          fontWeight={700} 
          textAlign="center" 
          mb={4} 
          color="#1976d2"
        >
          Browse Categories
        </Typography>
        
        <Grid container spacing={3} justifyContent="center">
          {categories.map((cat, idx) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={idx}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                  p: 3,
                  border: '1px solid #e0e0e0',
                  borderRadius: 3,
                  cursor: 'pointer',
                  transition: 'all .3s',
                  '&:hover': { 
                    borderColor: '#1976d2', 
                    transform: 'translateY(-4px)', 
                    boxShadow: '0 8px 20px rgba(0,0,0,0.1)' 
                  },
                }}
                onClick={() => console.log(`Category clicked: ${cat.label}`)}
              >
                <Box sx={{ color: '#1976d2' }}>
                  {cat.icon}
                </Box>
                <Typography 
                  variant="body2" 
                  textAlign="center" 
                  fontWeight={500}
                >
                  {cat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}