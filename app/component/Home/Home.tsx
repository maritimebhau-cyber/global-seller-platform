'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Circle, CircleDot } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';


// Category Data for Icon Grid - Individual size control for each icon
// sizeClass options: 'small' (120px), 'medium' (160px), 'large' (200px), 'xlarge' (240px)
const iconCategories = [
  { image: '/icon/1.RE.png', sizeClass: 'xlarge' },
  { image: '/icon/2.RE.png', sizeClass: 'xlarge' },
  { image: '/icon/3.RE.png', sizeClass: 'xlarge' },
  { image: '/icon/4.RE.png', sizeClass: 'xlarge' },
  { image: '/icon/5.RE.png', sizeClass: 'xlarge' },
  { image: '/icon/6.png', sizeClass: 'large' },
  { image: '/icon/7.REE.png', sizeClass: 'xlarge' },
  { image: '/icon/8.RE.png', sizeClass: 'xlarge' },
  { image: '/icon/9.RE.png', sizeClass: 'xlarge' },
  { image: '/icon/10.RE.png', sizeClass: 'xlarge' },
  { image: '/icon/11.png', sizeClass: 'xlarge' },
  { image: '/icon/12.RE.png', sizeClass: 'xlarge' },
  { image: '/icon/13.RE.png', sizeClass: 'xlarge' },
  { image: '/icon/14.RE.png', sizeClass: 'xlarge' },
  { image: '/icon/15.RE.png', sizeClass: 'xlarge' },
  { image: '/icon/16.RE.png', sizeClass: 'xlarge' },
  { image: '/icon/17.RE.png', sizeClass: 'large' },
  { image: '/icon/18.RE.png', sizeClass: 'large' },
  { image: '/icon/19.RE.png', sizeClass: 'xlarge' },
  { image: '/icon/20.RE.png', sizeClass: 'xlarge' },
  { image: '/icon/21.RE.png', sizeClass: 'xlarge' },
  { image: '/icon/22.RE.png', sizeClass: 'xlarge' },
  { image: '/icon/23.png', sizeClass: 'xlarge' },
  { image: '/icon/24.png', sizeClass: 'xlarge' },
  { image: '/icon/25.png', sizeClass: 'xlarge' },
  { image: '/icon/26.png', sizeClass: 'xlarge' },
  { image: '/icon/27.png', sizeClass: 'xlarge' },
  { image: '/icon/28.png', sizeClass: 'xlarge' },
  { image: '/icon/29.png', sizeClass: 'xlarge' },
  { image: '/icon/30.png', sizeClass: 'xlarge' },
  { image: '/icon/31.png', sizeClass: 'xlarge' },
  { image: '/icon/32.png', sizeClass: 'xlarge' },
  { image: '/icon/33.png', sizeClass: 'xlarge' },
  { image: '/icon/34.png', sizeClass: 'xlarge' },
  { image: '/icon/35.png', sizeClass: 'xlarge' },
  { image: '/icon/36.png', sizeClass: 'xlarge' },
  { image: '/icon/37.png', sizeClass: 'xlarge' },
  { image: '/icon/38.png', sizeClass: 'xlarge' },
  { image: '/icon/39.png', sizeClass: 'xlarge' },
  { image: '/icon/40.png', sizeClass: 'xlarge' },
  { image: '/icon/41.png', sizeClass: 'xlarge' },
  { image: '/icon/42.png', sizeClass: 'xlarge' },
  { image: '/icon/generated-image.png', sizeClass: 'xlarge' }
];

// Size mapping object
const sizeMap = {
  small: 'w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36',    // 96-144px
  medium: 'w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56',   // 128-224px
  large: 'w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64',    // 160-256px
  xlarge: 'w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72',   // 192-288px
};

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isUserScrolled, setIsUserScrolled] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [productName, setProductName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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

  // Clear interval helper
  const clearCarouselInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Start auto-play - cycles through all slides slowly
  const startAutoPlay = useCallback(() => {
    clearCarouselInterval();
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 6000);
  }, [clearCarouselInterval, carouselItems.length]);

  // Handle scroll detection
  useEffect(() => {
    let lastScrollTop = 0;
    
    const handleScroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      
      if (st > 100 && !isUserScrolled) {
        setIsUserScrolled(true);
        setIsAutoPlaying(false);
        clearCarouselInterval();
      } else if (st < 50 && isUserScrolled) {
        setIsUserScrolled(false);
        setIsAutoPlaying(true);
        setCurrentSlide(0);
      }
      
      lastScrollTop = st <= 0 ? 0 : st;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearCarouselInterval();
    };
  }, [isUserScrolled, clearCarouselInterval]);

  // Manage auto-play state
  useEffect(() => {
    if (isAutoPlaying && !isUserScrolled) {
      startAutoPlay();
    } else {
      clearCarouselInterval();
    }
    return () => clearCarouselInterval();
  }, [isAutoPlaying, isUserScrolled, startAutoPlay, clearCarouselInterval]);

  // Handle video play when slide becomes active
  useEffect(() => {
    if (videoRef.current && currentSlide === 0) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play();
          }
        });
      }
    } else if (videoRef.current && currentSlide !== 0) {
      videoRef.current.pause();
    }
  }, [currentSlide]);

  const nextSlide = () => {
    clearCarouselInterval();
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    if (isAutoPlaying) startAutoPlay();
  };

  const prevSlide = () => {
    clearCarouselInterval();
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
    if (isAutoPlaying) startAutoPlay();
  };

  const goToSlide = (index: number) => {
    clearCarouselInterval();
    setCurrentSlide(index);
    if (isAutoPlaying) startAutoPlay();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { productName, mobileNumber });
    alert('Requirement submitted successfully!');
    setProductName('');
    setMobileNumber('');
  };

  const productSections = [
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
  ];

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* HERO CAROUSEL */}
      <div className="relative w-full h-[70vh] md:h-[90vh] overflow-hidden bg-black">
        <div 
          className="flex h-full transition-transform ease-in-out duration-[2000ms]"
          style={{ 
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {carouselItems.map((item, index) => (
            <div key={index} className="relative min-w-full h-full">
              {item.type === 'video' ? (
                <div ref={videoContainerRef} className="w-full h-full">
                  <video
                    ref={videoRef}
                    src={item.url}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                    preload="auto"
                    autoPlay={index === 0}
                  />
                </div>
              ) : (
                <img
                  src={item.url}
                  alt={item.alt}
                  className="w-full h-full object-cover"
                />
              )}

              <div className={`absolute top-1/2 left-1/2 md:left-[37%] transform -translate-x-1/2 md:translate-x-0 -translate-y-1/2 text-white max-w-[90%] md:max-w-[800px] w-full flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 text-center md:text-left ${item.hasForm ? 'md:flex-row' : 'md:flex-col'}`}>
                
                <div className={`${item.hasForm ? 'flex-1 max-w-[400px]' : ''}`}>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg" style={{ textShadow: '3px 3px 6px #000' }}>
                    {item.title}
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light mb-6 drop-shadow-md" style={{ textShadow: '2px 2px 4px #000' }}>
                    {item.subtitle}
                  </p>
                  {!item.hasForm && (
                    <button 
                      onClick={() => console.log('Explore clicked')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 sm:px-8 sm:py-4 text-lg font-bold rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
                    >
                      Explore Now
                    </button>
                  )}
                </div>

                {item.hasForm && (
                  <form 
                    onSubmit={handleSubmit}
                    className="flex-1 max-w-[400px] w-full bg-white/10 backdrop-blur-md p-6 rounded-lg"
                  >
                    <h3 className="text-xl font-semibold text-teal-600 mb-4">
                      Submit Your Requirement
                    </h3>
                    <div className="flex flex-col gap-4">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1 font-medium">
                          Enter Product / Service name
                        </label>
                        <input
                          type="text"
                          placeholder="What are you looking for?"
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded focus:border-blue-600 focus:outline-none bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1 font-medium">
                          Enter your mobile
                        </label>
                        <div className="flex">
                          <span className="flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l text-teal-600 font-medium">
                            🇮🇳 +91
                          </span>
                          <input
                            type="tel"
                            placeholder="Enter your mobile number"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            required
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-r focus:border-blue-600 focus:outline-none bg-white"
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 font-semibold rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-lg"
                      >
                        Submit Requirement
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 md:left-8 -translate-y-1/2 bg-white/90 hover:bg-white w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg"
        >
          <ChevronLeft className="w-5 h-5 md:w-7 md:h-7 text-gray-800" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 md:right-8 -translate-y-1/2 bg-white/90 hover:bg-white w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg"
        >
          <ChevronRight className="w-5 h-5 md:w-7 md:h-7 text-gray-800" />
        </button>

        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm">
          {carouselItems.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className="flex items-center justify-center w-4 h-4"
            >
              {idx === currentSlide ? (
                <CircleDot className="w-3.5 h-3.5 text-blue-600 fill-current" />
              ) : (
                <Circle className="w-3.5 h-3.5 text-white/70 hover:text-white hover:scale-110 transition-all" />
              )}
            </button>
          ))}
          <span className="text-white text-sm ml-2 pl-2 border-l border-white/30 font-medium">
            {currentSlide + 1} / {carouselItems.length}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
          <div 
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${((currentSlide + 1) / carouselItems.length) * 100}%` }}
          />
        </div>
      </div>

      {/* CATEGORY ICON GRID - INDIVIDUAL SIZE CONTROL */}
      <div className="px-4 sm:px-6 lg:px-12 py-16 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-blue-600">
          Browse Categories
        </h2>
        
        {/* Flexbox layout for variable sizes with alignment */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-10 max-w-[1600px] mx-auto items-center">
          {iconCategories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => console.log(`Category clicked: ${idx + 1}`)}
              className={`group flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:drop-shadow-2xl ${sizeMap[cat.sizeClass as keyof typeof sizeMap]}`}
            >
              <div className="w-full h-full relative">
                <Image
                  src={cat.image}
                  alt={`Category ${idx + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PRODUCT SECTIONS - SYMMETRICAL CARDS */}
      <div className="bg-gray-50 py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          {productSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-12 md:mb-16 last:mb-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {section.cards.map((card, cardIndex) => (
                  <div key={cardIndex} className="flex flex-col">
                    <h3 className="text-xl md:text-2xl font-bold text-blue-900 mb-4 text-center md:text-left">
                      {cardIndex === 0 ? section.leftHeading : section.rightHeading}
                    </h3>
                    
                    <div className="flex flex-col md:flex-row gap-4 h-full">
                      <div className="w-full md:w-[60%] h-[300px] md:h-[420px] relative rounded-xl overflow-hidden group">
                        <Image
                          src={card.bigImage}
                          alt="Product"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4 md:p-6">
                          {card.services.map((service, i) => (
                            <p 
                              key={i} 
                              className="text-white font-bold text-sm md:text-base mb-1 drop-shadow-lg"
                            >
                              {service}
                            </p>
                          ))}
                        </div>
                      </div>

                      <div className="w-full md:w-[40%] flex flex-col gap-3">
                        {card.products.map((product, i) => (
                          <div 
                            key={i} 
                            className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow h-[96px] md:h-[132px]"
                          >
                            <div className="w-24 md:w-32 h-full relative flex-shrink-0">
                              <Image
                                src={`/images/small-${sectionIndex}-${cardIndex}-${i}.jpg`}
                                alt={product}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="px-3 md:px-4 flex-1 min-w-0">
                              <Link 
                                href={`/machine/${product.toLowerCase().replace(/ /g, '-')}`}
                                className="text-sm md:text-base font-bold text-gray-900 hover:text-blue-600 line-clamp-2"
                              >
                                {product}
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* REQUIREMENT SECTION */}
      <div className="bg-gray-100 p-6 md:p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          <div>
            <h2 className="text-3xl md:text-4xl font-medium leading-tight mb-8">
              Get <b>free</b> quotes from <br /> multiple sellers
            </h2>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto relative">
                  <Image
                    src="/icons/paperplane.png"
                    alt="icon"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="mt-2 text-sm">Tell us what</p>
                <p className="font-semibold">You Need</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 mx-auto relative">
                  <Image
                    src="/icons/message.png"
                    alt="icon"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="mt-2 text-sm">Receive free quotes</p>
                <p className="font-semibold">from sellers</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 mx-auto relative">
                  <Image
                    src="/icons/handshake.png"
                    alt="icon"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="mt-2 text-sm">Seal the</p>
                <p className="font-semibold">Deal</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">
              Tell us your Requirement
            </h3>

            <input
              type="text"
              placeholder="Enter Product / Service name"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded bg-white focus:border-blue-600 focus:outline-none"
            />

            <div className="flex mb-4">
              <input
                type="text"
                value="+91"
                readOnly
                className="w-20 px-4 py-2 border border-gray-300 rounded-l bg-gray-100 text-center"
              />
              <input
                type="tel"
                placeholder="Enter your mobile"
                className="flex-1 px-4 py-2 border border-l-0 border-gray-300 rounded-r bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>

            <button className="bg-teal-700 hover:bg-teal-800 text-white px-6 py-2 rounded text-lg font-medium transition-colors">
              Submit Requirement
            </button>
          </div>
        </div>
      </div>

      {/* BRANDS & FEATURES SECTION */}
      <div className="w-full bg-white mt-8">
        
        <div className="px-6 py-8">
          <h2 className="text-2xl font-semibold mb-6">
            Explore products from Premium Brands
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-items-center">
            {brands.map((logo, index) => (
              <div key={index} className="w-[130px] h-[60px] relative">
                <Image
                  src={`/brands/${logo}`}
                  alt="brand"
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full h-0.5 bg-gray-200 my-4" />

        <div className="px-6 py-8">
          <h2 className="text-2xl font-semibold mb-8">
            More for You
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((item, index) => (
              <div 
                key={index} 
                className={`text-center px-4 ${index !== 3 ? 'lg:border-r lg:border-gray-300' : ''}`}
              >
                <div className="w-12 h-12 mx-auto relative mb-4">
                  <Image
                    src={`/icons/${item.icon}`}
                    alt="feature"
                    fill
                    className="object-contain"
                  />
                </div>

                <h3 className="text-lg font-semibold mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-600 mb-4">
                  {item.desc}
                </p>

                <button className="px-6 py-2 border border-gray-400 rounded-full text-sm hover:bg-gray-50 transition-colors">
                  {item.btn}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}