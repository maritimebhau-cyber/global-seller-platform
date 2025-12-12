'use client';

import { Box, Typography, IconButton, Grid, TextField, Button, Card, CardContent, CardMedia } from '@mui/material';
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
import Image from 'next/image';
import Paper from '@mui/material/Paper';



// Category Data for Icon Grid
const iconCategories = [
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
  
   const brands = [
    "hyundai.png",
    "sany.png",
    "atlascopco.png",
    "canon.png",
    "jaquar.png",
    "abb.png",
    "airtel.png",
    "bharatbenz.png",
    "cummins.png",
    "stanley.png",
    "bosch.png",
  ];

  const features = [
    {
      icon: "verified.png",
      title: "Connect with verified sellers",
      desc: "Tell us your requirement & let our experts find verified sellers for you",
      btn: "Get Verified Sellers",
    },
    {
      icon: "store.png",
      title: "Sell on IndiaMART for free",
      desc: "Reach out to more than 21+ crore buyers. Sell with us.",
      btn: "Start Selling",
    },
    {
      icon: "mobile.png",
      title: "Download our App",
      desc: "Get instant notifications on the go. Download our App Now",
      btn: "Download Now",
    },
    {
      icon: "tally.png",
      title: "Tally on Mobile",
      desc: "With Live Keeping, SMEs can now connect their Tally offline data to mobile app",
      btn: "Know More",
    },
  ];
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
      url: '/images/homebanner.png',
      alt: 'Building solutions',
      hasForm: true,
    },
  ];

  const productCategories = [
    {
      title: 'Brick Making Machines',
      image: '/images/brick-machines.jpg',
      items: [
        'Fly Ash Brick Making Machine',
        'Clay Brick Making Machine',
        'Cement Brick Making Machine',
      ],
    },
    {
      title: 'Plywoods',
      image: '/images/plywood.jpg',
      items: [
        'Shuttering Plywood',
        'Laminated Plywood',
        'Waterproof Plywood',
      ],
    },
    {
      title: 'Wooden Door',
      image: '/images/wooden-door.jpg',
      items: [
        'Designer Wooden Door',
        'Plywood Door',
        'Wooden Flush Doors',
      ],
    },
  ];

  const mainServices = [
    'Prefabricated Houses',
    'Scaffolding Planks & Plates',
    'Construction Machines',
    'Crushing Machines & Plants',
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
      {/* HERO CAROUSEL - Increased Height */}
      <Box sx={{
        width: '100%',
        height: { xs: '70vh', md: '90vh' }, // Increased from 60vh/80vh to 70vh/90vh
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
          {iconCategories.map((cat, idx) => (
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
                  minHeight: '180px', // Added minimum height
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

   {/* ==================== 20 FULLY CUSTOMIZABLE CARDS - Increased Big Image Width ==================== */}
{/* ==================== 20 FULLY CUSTOMIZABLE CARDS ==================== */}
<Box sx={{ bgcolor: "#f8f9fa", py: { xs: 8, md: 12 } }}>
  <Box sx={{ maxWidth: "1400px", mx: "auto", px: { xs: 2, md: 4 } }}>

    {/* ALL 20 CARDS DATA */}
    {[
      // SECTION 1
      {
        leftHeading: "Cement Varieties",
        rightHeading: "Aggregates & Sand",
        cards: [
          {
            bigImage: "/images/cement-bags.jpg",
            services: ["OPC 53 Grade", "PPC Cement", "Slag Cement"],
            products: ["20mm Aggregate", "M-Sand", "Plaster Sand"]
          },
          {
            bigImage: "/images/ready-mix.jpg",
            services: ["RMC M20-M50", "Self Compacting", "Fiber Concrete"],
            products: ["Concrete Pump", "Boom Placer", "Transit Mixer"]
          }
        ]
      },

      // SECTION 2
      {
        leftHeading: "Brick Types",
        rightHeading: "Paving Solutions",
        cards: [
          {
            bigImage: "/images/red-bricks.jpg",
            services: ["Table Moulded Bricks", "Wire Cut Bricks", "Exposed Bricks"],
            products: ["Fly Ash Bricks", "AAC Blocks", "Clay Tiles"]
          },
          {
            bigImage: "/images/paver-blocks.jpg",
            services: ["Interlocking Pavers", "Shot Blasted", "Grass Pavers"],
            products: ["Kerb Stones", "Designer Tiles", "Chequered Tiles"]
          }
        ]
      },

      // SECTION 3
      {
        leftHeading: "TMT Bars",
        rightHeading: "Steel Sections",
        cards: [
          {
            bigImage: "/images/tmt-saria.jpg",
            services: ["TMT Fe550D CRS", "TMT Fe600", "Epoxy Coated Bars"],
            products: ["8mm - 32mm", "Cut & Bend", "Stirrups"]
          },
          {
            bigImage: "/images/steel-beams.jpg",
            services: ["RSJ Beams", "H-Beams", "I-Section"],
            products: ["MS Plates", "Chequered Plates", "GI Sheets"]
          }
        ]
      },

      // SECTION 4
      {
        leftHeading: "Plywood Types",
        rightHeading: "Door Solutions",
        cards: [
          {
            bigImage: "/images/marine-ply.jpg",
            services: ["BWP 710 Grade", "Marine Plywood", "Film Face Shuttering"],
            products: ["Gurjan", "Kerala Hardwood", "Calibrated Ply"]
          },
          {
            bigImage: "/images/door-factory.jpg",
            services: ["Membrane Doors", "Laminated Doors", "Solid Panel Doors"],
            products: ["Skin Doors", "FRP Doors", "WPC Doors"]
          }
        ]
      },

      // SECTION 5
      {
        leftHeading: "Floor Tiles",
        rightHeading: "Wall Tiles",
        cards: [
          {
            bigImage: "/images/vitrified.jpg",
            services: ["800x800 Vitrified", "Double Charge", "Full Body"],
            products: ["Nano Polished", "PGVT", "GVT"]
          },
          {
            bigImage: "/images/wall-tiles.jpg",
            services: ["Digital Wall Tiles", "Elevation Tiles", "Kitchen Tiles"],
            products: ["300x600mm", "Glossy", "Matt Finish"]
          }
        ]
      },

      // SECTION 6
      {
        leftHeading: "Sanitaryware",
        rightHeading: "CP Fittings",
        cards: [
          {
            bigImage: "/images/sanitaryware.jpg",
            services: ["One Piece WC", "Wall Hung", "Table Top Basin"],
            products: ["Jaquar", "Hindware", "Parryton"]
          },
          {
            bigImage: "/images/cp-fitting.jpg",
            services: ["Quarter Turn Faucets", "Sensor Taps", "Rain Showers"],
            products: ["Concealed Cistern", "Angle Valves", "Health Faucet"]
          }
        ]
      },

      // SECTION 7
      {
        leftHeading: "Paints",
        rightHeading: "Waterproofing",
        cards: [
          {
            bigImage: "/images/asian-paints.jpg",
            services: ["Royale Luxury", "Apex Ultima", "Tractor Emulsion"],
            products: ["Texture", "Designer Finish", "Enamel"]
          },
          {
            bigImage: "/images/waterproofing.jpg",
            services: ["Dr Fixit Roofseal", "Pidiproof LW+", "Crystalline Coating"],
            products: ["Terrace Waterproofing", "Basement", "Bathroom"]
          }
        ]
      },

      // SECTION 8
      {
        leftHeading: "Wires & Cables",
        rightHeading: "Switchgear",
        cards: [
          {
            bigImage: "/images/wires.jpg",
            services: ["Polycab FR-LSH", "Havells Life Line", "RR Kabel"],
            products: ["1.5 - 10 sqmm", "Multicore", "Submersible"]
          },
          {
            bigImage: "/images/modular-switch.jpg",
            services: ["Anchor Roma", "Legrand Mylinc", "Goldmedal"],
            products: ["Modular Switches", "MCB Box", "Fan Regulator"]
          }
        ]
      },

      // SECTION 9
      {
        leftHeading: "Glass Solutions",
        rightHeading: "UPVC Windows",
        cards: [
          {
            bigImage: "/images/toughened.jpg",
            services: ["12mm Toughened", "DGU Units", "Curved Glass"],
            products: ["Spider Glazing", "Patch Fittings", "Shower Cubicles"]
          },
          {
            bigImage: "/images/upvc.jpg",
            services: ["UPVC Windows", "Sliding Series", "Casement System"],
            products: ["Soundproof", "Mosquito Mesh", "Villa Windows"]
          }
        ]
      },

      // SECTION 10
      {
        leftHeading: "Heavy Machinery",
        rightHeading: "Scaffolding",
        cards: [
          {
            bigImage: "/images/jcb.jpg",
            services: ["JCB 3DX", "Excavator", "Backhoe Loader"],
            products: ["Hydra Crane", "Forklift", "Wheel Loader"]
          },
          {
            bigImage: "/images/scaffolding.jpg",
            services: ["Cuplock System", "H-Frame", "Adjustable Props"],
            products: ["MS Pipes", "Acrow Span", "Wall Form"]
          }
        ]
      },



    ].map((section, sectionIndex) => (
      <Box key={sectionIndex} mb={12}>
        {/* TWO HEADINGS ABOVE EACH CARD PAIR */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 4,
          px: { xs: 2, md: 0 }
        }}>
          {/* LEFT HEADING - Aligns with big image card */}
          <Box sx={{ 
            flex: 1,
            textAlign: 'left',
            pr: 2
          }}>
            <Typography
              variant="h5"
              fontWeight={700}
              color="#0d47a1"
              sx={{ fontSize: { xs: "1.2rem", md: "1.5rem" } }}
            >
              {section.leftHeading}
            </Typography>
          </Box>
          
          {/* SPACER - To match the gap between big and small cards */}
          <Box sx={{ width: 'calc(33.33% - 24px)' }} />
          
          {/* RIGHT HEADING - Aligns with small cards */}
          <Box sx={{ 
            flex: 1,
            textAlign: 'left',
            pl: 2
          }}>
            <Typography
              variant="h5"
              fontWeight={700}
              color="#0d47a1"
              sx={{ fontSize: { xs: "1.2rem", md: "1.5rem" } }}
            >
              {section.rightHeading}
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={12} justifyContent="center">
          {section.cards.map((card, cardIndex) => (
            <Grid item xs={12} sm={6} key={cardIndex}>
              <Grid container spacing={3} alignItems="stretch">
                
                {/* LEFT: Big Customizable Image Card */}
                <Grid item xs={7}>
                  <Card
                    sx={{
                      height: "420px",
                      borderRadius: 3,
                      width: "21vw",
                      overflow: "hidden",
                      position: "relative",
                      background: `url(${card.bigImage}) center/cover no-repeat`,
                    }}
                  >
                    <Box sx={{
                      p: { xs: 2.5, md: 4 },
                      color: "white",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)'
                    }}>
                      {card.services.map((service, i) => (
                        <Typography
                          key={i}
                          variant="subtitle1"
                          fontWeight={700}
                          sx={{
                            mb: 1.2,
                            textShadow: "2px 2px 8px #000",
                            fontSize: { xs: "0.95rem", md: "1.1rem" }
                          }}
                        >
                          {service}
                        </Typography>
                      ))}
                    </Box>
                  </Card>
                </Grid>

                {/* RIGHT: 3 Small Customizable Product Cards */}
                <Grid item xs={5}>
                  <Grid container direction="column" spacing={2.5} height="100%">
                    {card.products.map((product, i) => (
                      <Grid item xs={4} key={i}>
                        <Box
                          sx={{
                            borderRadius: 2.5,
                            height: "130px",
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            border: "1px solid #eae2e2ff",
                           
                          }}
                        >
                          <CardMedia
                            component="img"
                            image={`/images/small-${sectionIndex}-${cardIndex}-${i}.jpg`}
                            alt={product}
                            sx={{
                              width: 120,
                              height: "100%",
                              objectFit: "cover",
                              borderTopLeftRadius: "8px",
                              borderBottomLeftRadius: "8px"
                            }}
                          />
                          <Box sx={{
                            px: 2,
                            py: 1.5,
                            flex: 1,
                            minWidth: 0
                          }}>
                            <Typography
                              variant="subtitle2"
                              fontWeight={700}
                              sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical"
                              }}
                            >
                              {product}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>
    ))}
  </Box>
  
</Box>
   <Box sx={{  bgcolor: "#f5f5f5", p: 4 }}>
      <Grid container spacing={4} alignItems="flex-start">
        
        {/* LEFT CONTENT */}
        <Grid item xs={12} md={6}>
          <Typography
            sx={{
              fontSize: "40px",
              fontWeight: 500,
              lineHeight: 1.2,
              mb: 4,
            }}
          >
            Get <b>free</b> quotes from <br /> multiple sellers
          </Typography>

          <Grid container spacing={6} sx={{ mt: 2 }}>
            
            {/* CARD 1 */}
            <Grid item xs={12} sm={4} textAlign="center">
              <Image
                src="/icons/paperplane.png"
                width={80}
                height={80}
                alt="icon"
              />
              <Typography sx={{ mt: 1 }}>Tell us what</Typography>
              <Typography fontWeight={600}>You Need</Typography>
            </Grid>

            {/* CARD 2 */}
            <Grid item xs={12} sm={4} textAlign="center">
              <Image
                src="/icons/message.png"
                width={80}
                height={80}
                alt="icon"
              />
              <Typography sx={{ mt: 1 }}>Receive free quotes</Typography>
              <Typography fontWeight={600}>from sellers</Typography>
            </Grid>

            {/* CARD 3 */}
            <Grid item xs={12} sm={4} textAlign="center">
              <Image
                src="/icons/handshake.png"
                width={80}
                height={80}
                alt="icon"
              />
              <Typography sx={{ mt: 1 }}>Seal the</Typography>
              <Typography fontWeight={600}>Deal</Typography>
            </Grid>
          </Grid>
        </Grid>

        {/* RIGHT FORM */}
        <Grid item xs={12} md={6}>
          <Typography
            sx={{ fontSize: "22px", fontWeight: 600, mb: 2 }}
          >
            Tell us your Requirement
          </Typography>

          <TextField
            fullWidth
            placeholder="Enter Product / Service name"
            sx={{ mb: 2, bgcolor: "#fff" }}
          />

          <Grid container spacing={1} sx={{ mb: 2 }}>
            <Grid item xs={3} sm={2}>
              <TextField
                fullWidth
                value="+91"
                sx={{ bgcolor: "#fff" }}
                inputProps={{ readOnly: true }}
              />
            </Grid>

            <Grid item xs={9} sm={10}>
              <TextField
                fullWidth
                placeholder="Enter your mobile"
                sx={{ bgcolor: "#fff" }}
              />
            </Grid>
          </Grid>

          <Button
            variant="contained"
            sx={{
              bgcolor: "#00796B",
              fontSize: "18px",
              px: 4,
              py: 1.2,
              ":hover": { bgcolor: "#00695C" },
            }}
          >
            Submit Requirement
          </Button>
        </Grid>
      </Grid>
    </Box>
     <Box sx={{ width: "100%", bgcolor: "#fff", mt: 6 }}>
      
      {/* BRANDS SECTION */}
      <Typography
        sx={{
          fontSize: "26px",
          fontWeight: 600,
          mb: 3,
          px: 3,
        }}
      >
        Explore products from Premium Brands
      </Typography>

      <Grid
        container
        spacing={3}
        justifyContent="center"
        sx={{ px: 3, mb: 4 }}
      >
        {brands.map((logo, index) => (
          <Grid
            item
            xs={6}
            sm={4}
            md={2}
            key={index}
            textAlign="center"
          >
            <Image
              src={`/brands/${logo}`}
              width={130}
              height={60}
              alt="brand"
              style={{ objectFit: "contain" }}
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ width: "100%", height: "2px", bgcolor: "#eaeaea", mb: 4 }} />

      {/* MORE FOR YOU SECTION */}
      <Typography
        sx={{
          fontSize: "26px",
          fontWeight: 600,
          mb: 4,
          px: 3,
        }}
      >
        More for You
      </Typography>

      <Grid
        container
        spacing={4}
        sx={{ px: 3, pb: 6 }}
        justifyContent="space-between"
      >
        {features.map((item, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={index}
            textAlign="center"
            sx={{ borderRight: index !== 3 ? "1px solid #ddd" : "none" }}
          >
            <Image
              src={`/icons/${item.icon}`}
              width={50}
              height={50}
              alt="feature"
            />

            <Typography sx={{ fontSize: "18px", fontWeight: 600, mt: 2 }}>
              {item.title}
            </Typography>

            <Typography sx={{ fontSize: "14px", color: "#555", mt: 1 }}>
              {item.desc}
            </Typography>

            <Button
              variant="outlined"
              sx={{
                borderRadius: "20px",
                mt: 2,
                px: 4,
                textTransform: "none",
              }}
            >
              {item.btn}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
    </Box>
  );
}