'use client';

import { Box, Typography, IconButton, Grid, TextField, Button } from '@mui/material';
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
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);
  const [isUserScrolled, setIsUserScrolled] = useState(false);
  const videoRef = useRef(null);
  const [productName, setProductName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [transitionSpeed, setTransitionSpeed] = useState(1000); // Default speed

  const carouselItems = [
    {
      type: 'video',
      url: '/images/boatimage.mp4',
      alt: 'We connect Buyers & Sellers',
      title: 'Premium Construction Materials',
      subtitle: 'MarineMart is India\'s largest online B2B marketplace, connecting buyers with suppliers.',
      hasForm: false,
    },
    {
      type: 'image',
      url: '/images/connectivity.png',
      alt: 'Industrial equipment',
      title: 'Industrial Equipment & Machinery',
      subtitle: 'State-of-the-art machinery for modern construction',
      hasForm: false,
    },
    {
      type: 'image',
      url: '/images/homebanner.jpg',
      alt: 'Building solutions',
      hasForm: true,
    },
  ];

  // Handle scroll detection
  useEffect(() => {
    let lastScrollTop = 0;
    
    const handleScroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      
      if (st > lastScrollTop && st > 100) {
        // User is scrolling down
        setIsUserScrolled(true);
      } else if (st < lastScrollTop && st < 50) {
        // User is at the top
        setIsUserScrolled(false);
      }
      
      lastScrollTop = st <= 0 ? 0 : st;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Auto-advance slides with pause on 3rd slide and when user scrolls down
  useEffect(() => {
    if (!autoPlayEnabled) return;

    let interval;
    
    if (currentSlide === 2) {
      // Stop at 3rd slide (index 2)
      setAutoPlayEnabled(false);
      return;
    }

    // Only auto-play when user is at the top of the page
    if (!isUserScrolled) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => {
          if (prev === 1) {
            // When moving to 3rd slide, slow down
            setTransitionSpeed(2000); // 2 seconds for transition to 3rd slide
            return 2;
          } else {
            setTransitionSpeed(1000); // Normal speed for other transitions
            return (prev + 1) % carouselItems.length;
          }
        });
      }, 7000); // 7 seconds interval for auto-play
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoPlayEnabled, currentSlide, isUserScrolled, carouselItems.length]);

  // Reset auto-play when user comes back to top and not on 3rd slide
  useEffect(() => {
    if (!isUserScrolled && currentSlide !== 2) {
      setAutoPlayEnabled(true);
    }
  }, [isUserScrolled, currentSlide]);

  // Handle video play when slide becomes active
  useEffect(() => {
    if (videoRef.current && carouselItems[currentSlide].type === 'video') {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay prevented:", error);
      });
    }
  }, [currentSlide]);

  const nextSlide = () => {
    if (currentSlide === 2) {
      // If on 3rd slide, go back to first
      setTransitionSpeed(1000);
      setCurrentSlide(0);
      setAutoPlayEnabled(true);
    } else {
      // Normal transition
      setTransitionSpeed(currentSlide === 1 ? 2000 : 1000); // Slow when moving to 3rd slide
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
      
      if (currentSlide + 1 === 2) {
        // We're moving to 3rd slide
        setAutoPlayEnabled(false);
      } else {
        setAutoPlayEnabled(true);
      }
    }
  };

  const prevSlide = () => {
    setTransitionSpeed(1000);
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
    
    if (currentSlide === 2) {
      // If leaving 3rd slide, re-enable auto-play
      setAutoPlayEnabled(true);
    }
  };

  const goToSlide = (index) => {
    setTransitionSpeed(index === 2 ? 2000 : 1000); // Slow when going directly to 3rd slide
    
    if (index === 2) {
      setAutoPlayEnabled(false);
    } else {
      setAutoPlayEnabled(true);
    }
    
    setCurrentSlide(index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { productName, mobileNumber });
    // Here you would typically send the data to your backend
    alert('Requirement submitted successfully!');
    setProductName('');
    setMobileNumber('');
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
            transition: `transform ${transitionSpeed}ms ease-in-out` 
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
                }} />
                
                {/* Content */}
                <Box sx={{ 
                  position: 'absolute', 
                  top: '50%', 
                  left: { xs: '10em', md: '37%' }, 
                  transform: 'translateY(-50%)', 
                  color: 'white', 
                  maxWidth: { xs: '90%', md: item.hasForm ? '800px' : '600px' },
                  width: '100%',
                  display: 'flex',
                  flexDirection: { xs: 'column', md: item.hasForm ? 'row' : 'column' },
                  alignItems: { xs: 'flex-start', md: item.hasForm ? 'flex-start' : 'flex-start' },
                  gap: { xs: 2, md: item.hasForm ? 6 : 0 }
                }}>
                  {/* Text Content */}
                  <Box sx={{ 
                    flex: item.hasForm ? 1 : 'none',
                    maxWidth: item.hasForm ? '400px' : '100%'
                  }}>
                    <Typography 
                      variant="h2" 
                      fontWeight="bold" 
                      sx={{ 
                        mb: 2, 
                        fontSize: { xs: '1.8rem', sm: '2.5rem', md: item.hasForm ? '3rem' : '4rem' }, 
                        textShadow: '3px 3px 6px #000' 
                      }}
                    >
                      {item.title}
                    </Typography>
                    
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        mb: 4, 
                        fontSize: { xs: '1rem', sm: '1.2rem', md: item.hasForm ? '1.3rem' : '1.5rem' }, 
                        fontWeight: 300, 
                        textShadow: '2px 2px 4px #000' 
                      }}
                    >
                      {item.subtitle}
                    </Typography>
                    
                    {!item.hasForm && (
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
                    )}
                  </Box>
                  
                  {/* Form (only for third slide) */}
                  {item.hasForm && (
                    <Box 
                      component="form" 
                      onSubmit={handleSubmit}
                      sx={{ 
                        flex: 1,
                        maxWidth: '400px',
                        p: { xs: 2, sm: 3 },
                        borderRadius: 2,
                        // backdropFilter: 'blur(10px)'
                      }}
                    >
                      <Typography 
                        variant="h6" 
                        fontWeight={600} 
                        color="#007a6e" 
                        mb={2}
                        sx={{ fontSize: { xs: '1.1rem', sm: '1.3rem' } }}
                      >
                        Submit Your Requirement
                      </Typography>
                      
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                        {/* Product/Service Name Input */}
                        <Box>
                          <Typography 
                            variant="caption" 
                            color="text.secondary" 
                            display="block" 
                            mb={0.5}
                            sx={{ fontSize: '0.8rem', fontWeight: 500 }}
                          >
                            Enter Product / Service name
                          </Typography>
                          <TextField
                            fullWidth
                            placeholder="What are you looking for?"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            required
                            sx={{
                              bgcolor: 'white',
                              borderRadius: 1,
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  borderColor: '#e0e0e0',
                                },
                                '&:hover fieldset': {
                                  borderColor: '#1976d2',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#1976d2',
                                },
                              },
                            }}
                          />
                        </Box>
                        
                        {/* Mobile Number Input */}
                        <Box>
                          <Typography 
                            variant="caption" 
                            color="text.secondary" 
                            display="block" 
                            mb={0.5}
                            sx={{ fontSize: '0.8rem', fontWeight: 500 }}
                          >
                            Enter your mobile
                          </Typography>
                          <TextField
                            fullWidth
                            placeholder="Enter your mobile number"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            required
                            type="tel"
                            InputProps={{
                              startAdornment: (
                                <Box sx={{ 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  mr: 1,
                                  color: '#007a6e',
                                  fontWeight: 500
                                }}>
                                  🇮🇳 +91
                                </Box>
                              ),
                            }}
                            sx={{
                              bgcolor: 'white',
                              borderRadius: 1,
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  borderColor: '#e0e0e0',
                                },
                                '&:hover fieldset': {
                                  borderColor: '#1976d2',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#1976d2',
                                },
                              },
                            }}
                          />
                        </Box>
                        
                        {/* Submit Button */}
                        <Button
                          type="submit"
                          variant="contained"
                          fullWidth
                          sx={{
                            bgcolor: '#007a6e',
                            color: 'white',
                            py: 1.5,
                            fontSize: '1rem',
                            fontWeight: 600,
                            borderRadius: '8px',
                            mt: 1,
                            '&:hover': {
                              bgcolor: '#007a6e',
                              transform: 'translateY(-2px)',
                              boxShadow: '0 6px 20px rgba(25, 118, 210, 0.4)'
                            },
                          }}
                        >
                          Submit Requirement
                        </Button>
                      </Box>
                    </Box>
                  )}
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