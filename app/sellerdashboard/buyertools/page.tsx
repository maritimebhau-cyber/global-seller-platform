"use client";

import React, { useState, useRef, useCallback } from "react";
import type { StaticImageData } from "next/image";
import { ExternalLink, MessageSquare, ChevronUp, Search, ChevronDown, ShoppingCart, MapPin, Phone, User, Star, CheckCircle, XCircle, ArrowLeftRight } from "lucide-react";
import Image from "next/image";
import buyertoolsbgimage from "../../../public/images/buyertoolsbgimage.jpeg";

// --- INTERFACES ---

interface Order {
  id: string;
  title: string;
  suppliers: number;
  date: string;
  postedDate: string;
  closedDate?: string;
  description: string;
  status: "open" | "closed";
  suppliersList: Supplier[];
}

interface Supplier {
  id: string;
  name: string;
  rating: number;
  location: string;
  phone: string;
  contactPerson?: string;
  designation?: string;
}

interface Category {
  id: string;
  name: string;
  image: string;
}

interface Product {
  id: string;
  name: string;
  company: string;
  image: string | StaticImageData;
}

interface Tab {
  name: string;
  active: boolean;
  badge?: string;
}

interface RelatedItem {
  id: string;
  name: string;
  image: string;
}

interface ProductCategorySection {
  id: string;
  title: string;
  featuredImage: string;
  featuredLabels: string[];
  products: {
    id: string;
    name: string;
    image: string;
  }[];
}

interface SoftwareProduct {
  id: string;
  name: string;
  image: string;
  logo?: string;
}

interface LogisticsService {
  id: string;
  name: string;
  image: string;
}

interface LoanService {
  id: string;
  name: string;
  image: string;
}

interface PastSearch {
  id: string;
  term: string;
  date: string;
}

interface PastSearchGroup {
  date: string;
  searches: PastSearch[];
}

interface TransportService {
  id: string;
  label: string;
  icon: string;
  desc: string;
}

interface WeightOption {
  id: string;
  label: string;
}

// --- DATA ---

const orders: Order[] = [
  { 
    id: "1", 
    title: "Create Seller Account", 
    suppliers: 1, 
    date: "10-Mar-2026",
    postedDate: "10-Mar-2026",
    description: "I am interested in Create Seller Account",
    status: "open",
    suppliersList: [
      {
        id: "s1",
        name: "Bullzeye Services",
        rating: 3.4,
        location: "New Delhi/Delhi",
        phone: "+(91)-8047691174,7060"
      }
    ]
  },
  { 
    id: "2", 
    title: "Create Seller Account", 
    suppliers: 5, 
    date: "28-FEB-26",
    postedDate: "28-Feb-2026",
    closedDate: "28-FEB-26",
    description: "",
    status: "closed",
    suppliersList: [
      {
        id: "s2",
        name: "Ecomm 11",
        rating: 4.1,
        location: "Lucknow/Uttar Pradesh",
        phone: "+(91)-7949086795",
        contactPerson: "Ashwani Mishra",
        designation: "CEO"
      }
    ]
  },
];

const categories: Category[] = [
  { id: "1", name: "Account Management Service", image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=300&h=300&fit=crop" },
  { id: "2", name: "Rubber Coatings", image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=300&h=300&fit=crop" },
  { id: "3", name: "Thyristors", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=300&fit=crop" },
  { id: "4", name: "Builder Hardware", image: "https://images.unsplash.com/photo-1581092921461-eab62e97a782?w=300&h=300&fit=crop" },
  { id: "5", name: "Account Management Consultancy", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=300&fit=crop" },
  { id: "6", name: "Bricks", image: "https://images.unsplash.com/photo-1590247813693-5541d1c609fd?w=300&h=300&fit=crop" },
  { id: "7", name: "Nutraceuticals", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop" },
  { id: "8", name: "Wood Boards", image: "https://images.unsplash.com/photo-1541123603104-512919d6a96c?w=300&h=300&fit=crop" },
  { id: "9", name: "Raymond Shirting Fabrics", image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=300&h=300&fit=crop" },
  { id: "10", name: "Liquid Rubber", image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=300&h=300&fit=crop" },
];

const productsOfInterest: Product[] = [
  { id: "1", name: "Create Seller Account", company: "Bullzeye Services", image: buyertoolsbgimage },
];

const relatedItems: RelatedItem[] = [
  { id: "1", name: "Waterproof Coatings", image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=300&h=300&fit=crop" },
  { id: "2", name: "Birla opus alldry wall N roof 10", image: "https://images.unsplash.com/photo-1581092921461-eab62e97a782?w=300&h=300&fit=crop" },
  { id: "3", name: "FloArm Coat APB", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop" },
  { id: "4", name: "Waterproof Coatings", image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=300&h=300&fit=crop" },
  { id: "5", name: "Birla Opus Wall Fix 4", image: "https://images.unsplash.com/photo-1581092921461-eab62e97a782?w=300&h=300&fit=crop" },
  { id: "6", name: "Ardex Roofguard White", image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=300&h=300&fit=crop" },
  { id: "7", name: "Penetron Crystalline Waterproofing Chemical", image: "https://images.unsplash.com/photo-1581092921461-eab62e97a782?w=300&h=300&fit=crop" },
  { id: "8", name: "Exterior Waterproof Coating", image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=300&h=300&fit=crop" },
  { id: "9", name: "Waterproof Elastomeric Coatings", image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=300&h=300&fit=crop" },
  { id: "10", name: "Trubuild Rooftect Pro Waterproofing Coating", image: "https://images.unsplash.com/photo-1581092921461-eab62e97a782?w=300&h=300&fit=crop" },
];

const pastSearches: PastSearchGroup[] = [
  { date: "05-Mar-2026", searches: [
    { id: "s1", term: "Building Brick", date: "05-Mar-2026" },
    { id: "s2", term: "Builders Hardware", date: "05-Mar-2026" },
    { id: "s3", term: "Rubber Coatings", date: "05-Mar-2026" },
  ]},
  { date: "28-Feb-2026", searches: [
    { id: "s4", term: "Account Management Consultancy", date: "28-Feb-2026" },
  ]},
];

const brands = ["hyundai.png", "sany.png", "atlascopco.png", "canon.png", "jaquar.png", "abb.png", "airtel.png", "bharatbenz.png", "cummins.png", "stanley.png", "bosch.png"];

const commonServices = [
  { name: "Accounting Software", active: true },
  { name: "Logistic Services", active: false },
  { name: "Business Loan", active: false },
];

const accountingSoftwareProducts: SoftwareProduct[] = [
  { id: "1", name: "VOIP Billing Software", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop", logo: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=100&h=100&fit=crop" },
  { id: "2", name: "Online Billing Solution", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop" },
  { id: "3", name: "Billing Software", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop" },
  { id: "4", name: "Tally Integration Software", image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=400&h=300&fit=crop", logo: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=100&h=100&fit=crop" },
  { id: "5", name: "Tally Software", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop" },
  { id: "6", name: "POS Software", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop" },
];

const logisticsServices: LogisticsService[] = [
  { id: "1", name: "Goods Transport Services", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=300&h=200&fit=crop" },
  { id: "2", name: "Transportation Services", image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=300&h=200&fit=crop" },
  { id: "3", name: "Parcel Delivery Services", image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=300&h=200&fit=crop" },
  { id: "4", name: "Courier Service", image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=300&h=200&fit=crop" },
  { id: "5", name: "Air Cargo Service", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=300&h=200&fit=crop" },
];

const loanServices: LoanService[] = [
  { id: "1", name: "Bill Discounting", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=300&h=200&fit=crop" },
  { id: "2", name: "Commercial Loans", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=200&fit=crop" },
  { id: "3", name: "Agricultural Loan", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=300&h=200&fit=crop" },
  { id: "4", name: "Project Loan", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=300&h=200&fit=crop" },
  { id: "5", name: "Machinery Loans", image: "https://images.unsplash.com/photo-1581092921461-eab62e97a782?w=300&h=200&fit=crop" },
  { id: "6", name: "Construction Equipment Loan", image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=300&h=200&fit=crop" },
];

const productCategorySections: ProductCategorySection[] = [
  {
    id: "1",
    title: "Cement Varieties",
    featuredImage: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=600&fit=crop",
    featuredLabels: ["OPC 53 Grade", "PPC Cement", "Slag Cement"],
    products: [
      { id: "1", name: "20mm Aggregate", image: "https://images.unsplash.com/photo-1541123603104-512919d6a96c?w=150&h=150&fit=crop" },
      { id: "2", name: "M-Sand", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=150&h=150&fit=crop" },
      { id: "3", name: "Plaster Sand", image: "https://images.unsplash.com/photo-1595841055906-bd1b5ce2f609?w=150&h=150&fit=crop" },
    ]
  },
  {
    id: "2",
    title: "Aggregates & Sand",
    featuredImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=600&fit=crop",
    featuredLabels: ["RMC M20-M50", "Self Compacting", "Fiber Concrete"],
    products: [
      { id: "1", name: "Concrete Pump", image: "https://images.unsplash.com/photo-1581092921461-eab62e97a782?w=150&h=150&fit=crop" },
      { id: "2", name: "Boom Placer", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=150&h=150&fit=crop" },
      { id: "3", name: "Transit Mixer", image: "https://images.unsplash.com/photo-1581092921461-eab62e97a782?w=150&h=150&fit=crop" },
    ]
  },
  {
    id: "3",
    title: "Steel & Iron",
    featuredImage: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=600&fit=crop",
    featuredLabels: ["TMT Bars", "MS Angles", "Steel Plates"],
    products: [
      { id: "1", name: "Fe 500D TMT", image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=150&h=150&fit=crop" },
      { id: "2", name: "Structural Steel", image: "https://images.unsplash.com/photo-1581092921461-eab62e97a782?w=150&h=150&fit=crop" },
      { id: "3", name: "Galvanized Iron", image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=150&h=150&fit=crop" },
    ]
  },
  {
    id: "4",
    title: "Bricks & Blocks",
    featuredImage: "https://images.unsplash.com/photo-1590247813693-5541d1c609fd?w=400&h=600&fit=crop",
    featuredLabels: ["Red Clay Bricks", "Fly Ash Bricks", "AAC Blocks"],
    products: [
      { id: "1", name: "Wire Cut Bricks", image: "https://images.unsplash.com/photo-1590247813693-5541d1c609fd?w=150&h=150&fit=crop" },
      { id: "2", name: "Concrete Blocks", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=150&h=150&fit=crop" },
      { id: "3", name: "Hollow Blocks", image: "https://images.unsplash.com/photo-1590247813693-5541d1c609fd?w=150&h=150&fit=crop" },
    ]
  },
  {
    id: "5",
    title: "Tiles & Flooring",
    featuredImage: "https://images.unsplash.com/photo-1581092921461-eab62e97a782?w=400&h=600&fit=crop",
    featuredLabels: ["Ceramic Tiles", "Vitrified Tiles", "Marble"],
    products: [
      { id: "1", name: "Wall Tiles", image: "https://images.unsplash.com/photo-1581092921461-eab62e97a782?w=150&h=150&fit=crop" },
      { id: "2", name: "Floor Tiles", image: "https://images.unsplash.com/photo-1581092921461-eab62e97a782?w=150&h=150&fit=crop" },
      { id: "3", name: "Parking Tiles", image: "https://images.unsplash.com/photo-1581092921461-eab62e97a782?w=150&h=150&fit=crop" },
    ]
  },
  {
    id: "6",
    title: "Plumbing & Pipes",
    featuredImage: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=600&fit=crop",
    featuredLabels: ["PVC Pipes", "CPVC Pipes", "HDPE Pipes"],
    products: [
      { id: "1", name: "uPVC Pipes", image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=150&h=150&fit=crop" },
      { id: "2", name: "Pipe Fittings", image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=150&h=150&fit=crop" },
      { id: "3", name: "Valves", image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=150&h=150&fit=crop" },
    ]
  },
  {
    id: "7",
    title: "Electrical & Lighting",
    featuredImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=600&fit=crop",
    featuredLabels: ["Wires & Cables", "Switches", "LED Lights"],
    products: [
      { id: "1", name: "Copper Wires", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=150&h=150&fit=crop" },
      { id: "2", name: "MCB & Distribution", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=150&h=150&fit=crop" },
      { id: "3", name: "Panel Boards", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=150&h=150&fit=crop" },
    ]
  },
  {
    id: "8",
    title: "Paints & Chemicals",
    featuredImage: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=600&fit=crop",
    featuredLabels: ["Interior Paints", "Exterior Paints", "Primers"],
    products: [
      { id: "1", name: "Emulsion Paint", image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=150&h=150&fit=crop" },
      { id: "2", name: "Enamel Paint", image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=150&h=150&fit=crop" },
      { id: "3", name: "Waterproofing", image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=150&h=150&fit=crop" },
    ]
  },
  {
    id: "9",
    title: "Wood & Laminates",
    featuredImage: "https://images.unsplash.com/photo-1541123603104-512919d6a96c?w=400&h=600&fit=crop",
    featuredLabels: ["Plywood", "MDF Boards", "Particle Board"],
    products: [
      { id: "1", name: "Commercial Plywood", image: "https://images.unsplash.com/photo-1541123603104-512919d6a96c?w=150&h=150&fit=crop" },
      { id: "2", name: "Marine Plywood", image: "https://images.unsplash.com/photo-1541123603104-512919d6a96c?w=150&h=150&fit=crop" },
      { id: "3", name: "Laminates", image: "https://images.unsplash.com/photo-1541123603104-512919d6a96c?w=150&h=150&fit=crop" },
    ]
  },
  {
    id: "10",
    title: "Hardware & Tools",
    featuredImage: "https://images.unsplash.com/photo-1581092921461-eab62e97a782?w=400&h=600&fit=crop",
    featuredLabels: ["Power Tools", "Hand Tools", "Safety Equipment"],
    products: [
      { id: "1", name: "Drill Machines", image: "https://images.unsplash.com/photo-1581092921461-eab62e97a782?w=150&h=150&fit=crop" },
      { id: "2", name: "Cutting Wheels", image: "https://images.unsplash.com/photo-1581092921461-eab62e97a782?w=150&h=150&fit=crop" },
      { id: "3", name: "Safety Helmets", image: "https://images.unsplash.com/photo-1581092921461-eab62e97a782?w=150&h=150&fit=crop" },
    ]
  },
];

// --- SHIP WITH IM DATA ---
const transportServices: TransportService[] = [
  { id: 'full-truck', label: 'Full Truck', icon: '🚚', desc: 'More than 2.5 Tons' },
  { id: 'part-truck', label: 'Part Truck', icon: '🚐', desc: '30 Kg to 2500 Kg' },
  { id: 'courier', label: 'Courier', icon: '📦', desc: 'Less than 30 Kg' },
];

const pickupPopularCities: string[] = ['Delhi', 'Mumbai', 'Pune', 'Kolkata'];
const dropPopularCities: string[] = ['Mumbai', 'Delhi', 'Ahmedabad', 'Pune'];

// --- MAIN COMPONENT ---

export default function MarineKmartDashboard() {
  const [activeTab, setActiveTab] = useState<string>("Past Searches");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [serviceSearch, setServiceSearch] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("Accounting Software");
  const [filterBy, setFilterBy] = useState<string>("Last 50 Requirements");
  const [expandedOrders, setExpandedOrders] = useState<string[]>(["1"]);
  
  // Form states for Get Quotes section
  const [productName, setProductName] = useState<string>("");
  const [requirementDetails, setRequirementDetails] = useState<string>("");
  const [gstNumber, setGstNumber] = useState<string>("");

  // Refs for scrolling to sections
  const accountingRef = useRef<HTMLDivElement>(null);
  const logisticsRef = useRef<HTMLDivElement>(null);
  const loanRef = useRef<HTMLDivElement>(null);

  const tabs: Tab[] = [
    { name: "Post Buy Requirement", active: false },
    { name: "Services For Business Growth", active: false },
    { name: "My Orders", active: false },
    { name: "Products Of Interest", active: false },
    { name: "Recommended Categories", active: false },
    { name: "Past Searches", active: true },
    { name: "Ship With IM", active: false },
  ];

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const scrollToSection = (sectionName: string) => {
    setSelectedService(sectionName);
    let ref;
    switch(sectionName) {
      case "Accounting Software": ref = accountingRef; break;
      case "Logistic Services": ref = logisticsRef; break;
      case "Business Loan": ref = loanRef; break;
      default: ref = accountingRef;
    }
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Submitting requirement:", searchQuery);
  };

  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  const handleSuggestionClick = (): void => {
    setSearchQuery("Account Management");
  };

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGetQuotesSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Get Quotes submitted:", { productName, requirementDetails, gstNumber });
  };

  const handlePastSearch = (term: string): void => {
    console.log("Searching for:", term);
    setSearchQuery(term);
  };

  // --- SHIP WITH IM COMPONENT ---
  const ShipWithIMPage = () => {
    const [selectedTransportService, setSelectedTransportService] = useState<string>('full-truck');
    const [pickupCity, setPickupCity] = useState<string>('');
    const [dropCity, setDropCity] = useState<string>('');
    const [selectedWeight, setSelectedWeight] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const getWeightOptions = useCallback((): WeightOption[] => {
      if (selectedTransportService === 'courier') {
        return [
          { id: 'upto5', label: 'Upto 5 Kg' },
          { id: '5to10', label: '5 to 10 Kg' },
          { id: '11to20', label: '11 to 20 Kg' },
          { id: 'morethan20', label: 'More than 20 Kg' }
        ];
      }
      return [
        { id: 'morethan18', label: 'More than 18 Ton' },
        { id: '9to18', label: '9 to 18 Ton' },
        { id: '3to9', label: '3 to 9 Ton' },
        { id: 'upto3', label: 'Upto 3 Ton' }
      ];
    }, [selectedTransportService]);

    const handleTransportSubmit = useCallback(async (): Promise<void> => {
      if (!pickupCity.trim() || !dropCity.trim() || !selectedWeight) {
        alert('Please fill in all required fields');
        return;
      }
      setIsSubmitting(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert('Finding services...');
      } catch (error) {
        console.error('Submission error:', error);
        alert('An error occurred. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }, [pickupCity, dropCity, selectedWeight]);

    const clearPickup = useCallback((): void => setPickupCity(''), []);
    const clearDrop = useCallback((): void => setDropCity(''), []);

    const handleServiceChange = useCallback((serviceId: string): void => {
      setSelectedTransportService(serviceId);
      setSelectedWeight('');
    }, []);

    const handleSwapCities = useCallback((): void => {
      setPickupCity(dropCity);
      setDropCity(pickupCity);
    }, [pickupCity, dropCity]);

    return (
      <div className="min-h-screen bg-gray-100 font-sans w-full">
        {/* Hero Section */}
        <div className="relative h-[50vh] min-h-[400px] w-full">
          <div className="absolute inset-0 z-0">
            <Image
              src={buyertoolsbgimage}
              alt="Transportation background"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(50,60,100,0.6)] to-[rgba(50,60,100,0.6)]" />
          </div>
          
          <div className="relative z-10 w-full px-4 h-full flex flex-col justify-center items-center">
            <h1 className="text-white text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 font-sans">
              Book Transportation Service
            </h1>
            
            <div className="flex justify-center gap-3 md:gap-4 flex-wrap">
              {transportServices.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => handleServiceChange(service.id)}
                  className={`bg-white rounded-lg p-3 md:p-4 w-32 md:w-48 flex flex-col items-center hover:shadow-xl transition-all relative ${
                    selectedTransportService === service.id ? 'ring-2 ring-teal-600 shadow-xl' : ''
                  }`}
                  aria-pressed={selectedTransportService === service.id}
                  aria-label={`Select ${service.label} service`}
                >
                  <span className="text-3xl md:text-4xl mb-1 md:mb-2" role="img" aria-label={service.label}>
                    {service.icon}
                  </span>
                  <span className="font-bold text-gray-800 text-sm md:text-base mb-1 font-sans">
                    {service.label}
                  </span>
                  <span className="text-xs md:text-sm text-gray-600 text-center leading-tight font-sans">
                    {service.desc}
                  </span>
                  
                  {selectedTransportService === service.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-1.5 bg-teal-600 rounded-b-lg" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Form Card */}
        <div className="w-full px-4 -mt-16 md:-mt-20 relative z-10 pb-8">
          <div className="bg-white rounded-lg shadow-xl p-4 md:p-8 w-full">
            <h2 className="text-base md:text-lg font-bold mb-4 md:mb-5 text-gray-800 font-sans">
              Enter Your Shipment Details
            </h2>
            
            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6 w-full">
              {/* Pickup City */}
              <div className="flex-1">
                <label htmlFor="pickup-city" className="block text-sm font-bold mb-2 text-gray-700 font-sans">
                  Pickup City <span className="text-red-500" aria-label="required">*</span>
                </label>
                <div className="relative">
                  <input
                    id="pickup-city"
                    type="text"
                    placeholder="Enter pickup city"
                    value={pickupCity}
                    onChange={(e) => setPickupCity(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 pr-8 text-sm font-sans"
                    aria-required="true"
                  />
                  {pickupCity && (
                    <button
                      type="button"
                      onClick={clearPickup}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm p-1"
                      aria-label="Clear pickup city"
                      title="Clear"
                    >
                      ✕
                    </button>
                  )}
                </div>
                <div className="mt-2 flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-blue-600 font-bold font-sans">Popular:</span>
                  {pickupPopularCities.map((city) => (
                    <button
                      key={`pickup-${city}`}
                      type="button"
                      onClick={() => setPickupCity(city)}
                      className="text-xs px-2 py-0.5 border border-gray-300 rounded-full hover:bg-gray-50 text-gray-700 transition-colors font-sans"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              {/* Swap Icon */}
              <div className="flex md:items-start justify-center md:pt-8 order-3 md:order-2">
                <button
                  type="button"
                  onClick={handleSwapCities}
                  className="w-9 h-9 rounded-full border-2 border-gray-300 flex items-center justify-center bg-white flex-shrink-0 rotate-90 md:rotate-0 hover:border-teal-500 hover:text-teal-600 transition-colors"
                  aria-label="Swap pickup and drop cities"
                  title="Swap cities"
                >
                  <ArrowLeftRight className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* Drop City */}
              <div className="flex-1 order-2 md:order-3">
                <label htmlFor="drop-city" className="block text-sm font-bold mb-2 text-gray-700 font-sans">
                  Drop City <span className="text-red-500" aria-label="required">*</span>
                </label>
                <div className="relative">
                  <input
                    id="drop-city"
                    type="text"
                    placeholder="Enter drop city"
                    value={dropCity}
                    onChange={(e) => setDropCity(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 pr-8 text-sm font-sans"
                    aria-required="true"
                  />
                  {dropCity && (
                    <button
                      type="button"
                      onClick={clearDrop}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm p-1"
                      aria-label="Clear drop city"
                      title="Clear"
                    >
                      ✕
                    </button>
                  )}
                </div>
                <div className="mt-2 flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-blue-600 font-bold font-sans">Popular:</span>
                  {dropPopularCities.map((city) => (
                    <button
                      key={`drop-${city}`}
                      type="button"
                      onClick={() => setDropCity(city)}
                      className="text-xs px-2 py-0.5 border border-gray-300 rounded-full hover:bg-gray-50 text-gray-700 transition-colors font-sans"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material Weight */}
              <div className="flex-1 order-4">
                <fieldset>
                  <legend className="block text-sm font-bold mb-2 text-gray-700 font-sans">
                    Material Weight <span className="text-red-500" aria-label="required">*</span>
                    <span 
                      className="ml-1 inline-flex items-center justify-center w-4 h-4 text-xs border border-gray-400 rounded-full text-gray-500 cursor-help"
                      title="Select the approximate weight of your shipment"
                      aria-label="Weight information"
                    >
                      ⓘ
                    </span>
                  </legend>
                  <div className="grid grid-cols-2 gap-2">
                    {getWeightOptions().map((option) => (
                      <label
                        key={option.id}
                        htmlFor={`weight-${option.id}`}
                        className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                      >
                        <input
                          id={`weight-${option.id}`}
                          type="radio"
                          name="weight"
                          value={option.id}
                          checked={selectedWeight === option.id}
                          onChange={(e) => setSelectedWeight(e.target.value)}
                          className="w-3.5 h-3.5 text-teal-600 focus:ring-teal-500 cursor-pointer"
                        />
                        <span className="text-xs text-gray-700 font-sans">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>
            </div>

            {/* Progress Dots */}
            <div className="flex justify-center gap-2 mt-6 mb-5" role="progressbar" aria-valuenow={1} aria-valuemax={2} aria-label="Form progress">
              <span className="w-2 h-2 rounded-full bg-teal-600" />
              <span className="w-2 h-2 rounded-full bg-gray-300" />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="button"
                onClick={handleTransportSubmit}
                disabled={isSubmitting}
                className="bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 disabled:cursor-not-allowed text-white font-bold px-12 md:px-16 py-2.5 rounded-md transition-colors shadow-md text-sm w-full md:w-auto font-sans"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- OTHER PAGE COMPONENTS ---

  const MyOrdersPage = () => (
    <div className="w-full px-4 py-6 bg-gray-50 min-h-screen font-sans">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-gray-700 font-bold font-sans">Filter By:</span>
          <div className="relative">
            <select 
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded px-4 py-2 pr-8 text-gray-700 focus:outline-none focus:border-blue-500 cursor-pointer font-sans"
            >
              <option>Last 50 Requirements</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>All Requirements</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
        </div>
        <button className="flex items-center gap-2 text-blue-800 hover:text-blue-900 font-bold transition-colors font-sans">
          <span className="text-lg">+</span>
          Post a New Requirement
        </button>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-100 px-6 py-4 flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-gray-900 font-sans">{order.title}</h3>
                  {order.status === "closed" && (
                    <div className="flex items-center gap-1 text-red-600">
                      <XCircle className="w-4 h-4" />
                      <span className="text-sm font-bold font-sans">Closed</span>
                    </div>
                  )}
                </div>
                <div className="text-sm text-gray-600 space-y-1 font-sans">
                  <p>
                    Posted on: <span className="text-gray-500">{order.postedDate}</span>
                    {order.closedDate && (
                      <span className="ml-2">| Closed on : <span className="text-gray-500">{order.closedDate}</span></span>
                    )}
                  </p>
                  <p className="text-gray-700 font-sans">
                    {order.suppliers} {order.suppliers === 1 ? 'Supplier' : 'Suppliers'} {order.status === "closed" ? "were" : ""} Connected
                  </p>
                  {order.description && (
                    <p className="text-gray-600 italic mt-2 font-sans">{order.description}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded text-sm font-bold transition-colors min-w-[140px] font-sans">
                  Share Feedback
                </button>
                {order.status === "closed" && (
                  <button className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded text-sm font-bold transition-colors min-w-[140px] font-sans">
                    Re-Post Requirement
                  </button>
                )}
              </div>
            </div>

            {expandedOrders.includes(order.id) && order.suppliersList.map((supplier, idx) => (
              <div key={supplier.id} className="px-6 py-4 border-t border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-gray-500 font-bold w-6 font-sans">{idx + 1}.</span>
                      <h4 className="text-base font-bold text-gray-900 font-sans">{supplier.name}</h4>
                      <div className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded">
                        <span className="text-sm font-bold text-gray-700 font-sans">{supplier.rating}/5</span>
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      </div>
                    </div>
                    <div className="ml-9 space-y-1 text-sm font-sans">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{supplier.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span>{supplier.phone}</span>
                      </div>
                      {supplier.contactPerson && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <User className="w-4 h-4 text-gray-400" />
                          <span>{supplier.contactPerson}{supplier.designation ? `, ${supplier.designation}` : ''}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <div className="flex flex-col gap-2 text-right">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-bold font-sans">
                        View Catalog
                      </button>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-bold font-sans">
                        Send Message
                      </button>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-sm text-gray-700 font-bold font-sans">Satisfied with the match?</span>
                      <div className="flex gap-2">
                        <button className="px-6 py-1.5 border border-red-400 text-red-600 rounded text-sm font-bold hover:bg-red-50 transition-colors font-sans">
                          No
                        </button>
                        <button className="px-6 py-1.5 border border-green-500 text-green-600 rounded text-sm font-bold hover:bg-green-50 transition-colors font-sans">
                          Yes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="px-6 py-2 bg-white border-t border-gray-200 flex justify-center">
              <button 
                onClick={() => toggleOrderDetails(order.id)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 text-sm font-bold transition-colors font-sans"
              >
                {expandedOrders.includes(order.id) ? (
                  <><ChevronUp className="w-4 h-4" /> Hide Details</>
                ) : (
                  <><ChevronDown className="w-4 h-4" /> Show Details</>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ProductsOfInterestPage = () => (
    <div className="w-full px-4 py-6 bg-white min-h-screen font-sans">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productsOfInterest.map((product) => (
          <div 
            key={product.id}
            className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow max-w-[280px]"
          >
            <div className="relative w-full h-48 bg-gray-100">
              <Image 
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="280px"
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-base font-bold text-blue-900 mb-1 font-sans">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-4 font-sans">By: {product.company}</p>
              <button className="w-full border-2 border-teal-500 text-teal-600 hover:bg-teal-50 font-bold py-2 px-4 rounded transition-colors text-sm font-sans">
                Get Quotes
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const RecommendedCategoriesPage = () => (
    <div className="w-full px-4 py-6 bg-white min-h-screen font-sans">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {categories.map((category) => (
          <div 
            key={category.id}
            className="bg-white rounded-lg overflow-hidden hover:shadow-md transition-shadow group"
          >
            <div className="relative w-full aspect-square bg-gray-50 mb-3">
              <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
              <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors border border-gray-200">
                <ExternalLink className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <h3 className="text-sm font-bold text-gray-900 text-center mb-3 px-2 line-clamp-2 min-h-[40px] font-sans">
              {category.name}
            </h3>
            <button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2.5 px-4 rounded transition-colors text-sm font-sans">
              Get Quotes
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const PastSearchesPage = () => (
    <div className="w-full bg-white min-h-screen font-sans">
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {pastSearches.map((group, groupIndex) => (
          <div key={group.date}>
            <div className="bg-gray-100 px-6 py-3 border-b border-gray-200">
              <span className="text-sm font-bold text-gray-800 font-sans">{group.date}</span>
            </div>
            {group.searches.map((search, searchIndex) => (
              <div 
                key={search.id}
                className={`flex items-center justify-between px-6 py-4 ${
                  searchIndex !== group.searches.length - 1 || groupIndex !== pastSearches.length - 1 
                    ? 'border-b border-gray-200' 
                    : ''
                } ${searchIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
              >
                <span className="text-sm text-gray-800 font-sans">{search.term}</span>
                <button 
                  onClick={() => handlePastSearch(search.term)}
                  className="flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded text-sm font-bold transition-colors font-sans"
                >
                  <Search className="w-4 h-4" />
                  Search
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  const ServicesForBusinessGrowthPage = () => (
    <div className="w-full px-4 py-6 bg-white font-sans">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-3 font-sans">Services for Business Growth</h1>
        <p className="text-gray-700 text-sm leading-relaxed font-sans">
          Take advantage of these trusted quality service providers to manage your day to day operations.<br />
          Find the best service providers in your own city, preferred location or across India and grow your business with ease.
        </p>
      </div>

      <div className="bg-green-50 border border-green-100 rounded-sm p-3 mb-6 sticky top-0 z-30">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-gray-700 text-sm font-bold font-sans">Commonly Used Services:</span>
            {commonServices.map((service, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(service.name)}
                className={`text-sm font-bold transition-colors font-sans ${
                  selectedService === service.name
                    ? "text-gray-900 underline decoration-2 underline-offset-4" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {service.name}
              </button>
            ))}
          </div>
          <div className="flex w-full lg:w-auto">
            <input
              type="text"
              placeholder="Search for more services"
              value={serviceSearch}
              onChange={(e) => setServiceSearch(e.target.value)}
              className="flex-1 lg:w-64 px-3 py-1.5 border border-gray-300 rounded-l text-sm focus:outline-none focus:border-teal-500 font-sans"
            />
            <button className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1.5 rounded-r transition-colors">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div ref={accountingRef} className="mb-8 scroll-mt-20">
        <h2 className="text-lg font-bold text-gray-900 mb-2 font-sans">Accounting Software</h2>
        <p className="text-gray-600 mb-4 text-sm font-sans">
          Manage your day-to-day inventory, accounting, CRM, financial reports and much more with these software solutions.
        </p>
        <div className="bg-green-50 border border-green-100 rounded-sm p-4 mb-6">
          <h3 className="text-sm font-bold text-gray-900 mb-4 font-sans">Recommended Accounting Software</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-24 h-16 bg-white rounded border border-gray-200 flex items-center justify-center p-2 flex-shrink-0">
                <div className="text-center">
                  <div className="bg-blue-700 text-white font-bold text-xs px-2 py-0.5 rounded-sm font-sans">Busy</div>
                  <div className="text-[5px] text-gray-500 mt-0.5 leading-tight font-sans">BUSINESS ACCOUNTING SOFTWARE</div>
                  <div className="text-[5px] text-red-500 mt-0.5 font-sans">an indiamart company</div>
                </div>
              </div>
              <div>
                <div className="font-bold text-gray-900 text-sm font-sans">Busy</div>
                <div className="text-xs text-gray-600 font-sans">Accounting Software</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-24 h-16 bg-white rounded border border-gray-200 flex items-center justify-center p-2 flex-shrink-0">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                    <div className="text-green-600 font-bold text-xs font-sans">Live Keeping</div>
                  </div>
                  <div className="text-[5px] text-gray-500 mt-0.5 font-sans">on indiamart Company</div>
                </div>
              </div>
              <div>
                <div className="font-bold text-gray-900 text-sm font-sans">Live Keeping</div>
                <div className="text-xs text-gray-600 font-sans">Tally on Mobile</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-24 h-16 bg-white rounded border border-gray-200 flex items-center justify-center p-2 flex-shrink-0">
                <div className="text-red-500 font-bold text-lg italic font-sans">Vyapar</div>
              </div>
              <div>
                <div className="font-bold text-gray-900 text-sm font-sans">Vyapar</div>
                <div className="text-xs text-gray-600 font-sans">Accounting Software</div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
          {accountingSoftwareProducts.map((product) => (
            <div key={product.id} className="flex items-center gap-3 cursor-pointer group relative">
              <div className="w-28 h-20 flex-shrink-0 bg-gray-50 rounded overflow-hidden border border-gray-200">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              {product.logo && (
                <div className="w-10 h-10 flex-shrink-0 rounded-full overflow-hidden border border-gray-200 bg-white absolute left-20 top-10 shadow-sm">
                  <img src={product.logo} alt={`${product.name} logo`} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1 ml-2">
                <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 font-sans">{product.name}</h4>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-8 rounded flex items-center gap-2 transition-colors text-sm font-sans">
            View More
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div ref={logisticsRef} className="border-t border-gray-200 pt-6 mb-8 scroll-mt-20">
        <h2 className="text-lg font-bold text-gray-900 mb-2 font-sans">Logistics Services</h2>
        <p className="text-gray-600 mb-4 text-sm font-sans">
          These trusted service providers will enable you to send your products from your location to the buyer&apos;s location hassle free.
        </p>
        <div className="flex gap-4">
          <div className="w-1/4 flex-shrink-0">
            <div className="h-64 rounded overflow-hidden">
              <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=600&fit=crop" alt="Warehouse" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="flex-1 grid grid-cols-3 gap-4">
            {logisticsServices.map((service) => (
              <div key={service.id} className="flex items-center gap-3 cursor-pointer group">
                <div className="w-20 h-16 flex-shrink-0 rounded overflow-hidden border border-gray-200">
                  <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 leading-tight font-sans">{service.name}</h4>
                </div>
              </div>
            ))}
            <div className="flex items-center">
              <button className="text-blue-800 font-bold text-sm hover:underline transition-colors font-sans">
                View Other Services
              </button>
            </div>
          </div>
        </div>
      </div>

      <div ref={loanRef} className="border-t border-gray-200 pt-6 mb-8 scroll-mt-20">
        <h2 className="text-lg font-bold text-gray-900 mb-2 font-sans">Business Loan</h2>
        <p className="text-gray-600 mb-4 text-sm font-sans">
          You can leverage these loan providers to rebuild and scale your credit operations and thrive in the economy.
        </p>
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-sm p-4 mb-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                <div className="text-blue-600 text-xs font-bold font-sans">LENDING</div>
              </div>
              <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                <div className="text-blue-800 text-xs font-bold font-sans">ignosis</div>
              </div>
              <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                <div className="text-blue-600 text-[8px] text-center leading-tight font-sans">Credit<br/>Enable</div>
              </div>
            </div>
            <div className="text-center flex-1 px-4">
              <h3 className="text-xl font-bold mb-1 font-sans">ALL-IN-ONE PLACE</h3>
              <p className="text-xs text-blue-100 font-sans">Unlock the potential of your business with our diverse lending network</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                <div className="text-orange-500 text-[8px] font-bold text-center font-sans">IIFL</div>
              </div>
              <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                <div className="text-red-600 text-[8px] font-bold text-center font-sans">ICICI<br/>Bank</div>
              </div>
              <button className="bg-teal-500 hover:bg-teal-600 text-white text-sm font-bold py-2 px-4 rounded transition-colors font-sans">
                Apply Now
              </button>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-1/4 flex-shrink-0">
            <div className="h-64 rounded overflow-hidden">
              <img src="https://images.unsplash.com/photo-1565514020176-db9e96af6f96?w=400&h=600&fit=crop" alt="Business Loan" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="flex-1 grid grid-cols-3 gap-4">
            {loanServices.map((loan) => (
              <div key={loan.id} className="flex items-center gap-3 cursor-pointer group">
                <div className="w-20 h-16 flex-shrink-0 rounded overflow-hidden border border-gray-200">
                  <img src={loan.image} alt={loan.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 leading-tight font-sans">{loan.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-8 rounded flex items-center gap-2 transition-colors text-sm font-sans">
            View More
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="w-full bg-gray-50 py-12 mt-8 border-t border-gray-200">
        <div className="w-full px-4">
          <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-teal-600 rounded-t-lg p-4 flex items-center justify-center gap-3">
            <div className="flex items-center gap-2 text-white">
              <div className="flex flex-col items-end">
                <div className="w-8 h-0.5 bg-white/60 mb-1"></div>
                <div className="w-6 h-0.5 bg-white/60 mb-1"></div>
                <div className="w-4 h-0.5 bg-white/60"></div>
              </div>
              <ShoppingCart className="w-6 h-6" />
            </div>
            <h2 className="text-white text-lg font-bold font-sans">
              Tell us what you need & Get verified suppliers instantly
            </h2>
          </div>
          <div className="bg-white border border-gray-200 rounded-b-lg shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 font-sans">Requirement Information</h3>
            <form onSubmit={handleGetQuotesSubmit} className="space-y-6">
              <div className="flex items-center gap-4">
                <label className="w-40 text-sm font-bold text-gray-700 text-right font-sans">Product/Service name</label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Enter Product / Service name"
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 font-sans"
                />
              </div>
              <div className="flex items-start gap-4">
                <label className="w-40 text-sm font-bold text-gray-700 text-right pt-2 font-sans">Requirement Details</label>
                <textarea
                  value={requirementDetails}
                  onChange={(e) => setRequirementDetails(e.target.value)}
                  rows={3}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 resize-none font-sans"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="w-40 text-sm font-bold text-gray-700 text-right font-sans">GST Number</label>
                <input
                  type="text"
                  value={gstNumber}
                  onChange={(e) => setGstNumber(e.target.value)}
                  placeholder="Please enter GST Number to reach more sellers"
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 font-sans"
                />
              </div>
            </form>
          </div>
          <div className="flex justify-center mt-6">
            <button
              onClick={() => handleGetQuotesSubmit}
              className="bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white font-bold py-3 px-10 rounded flex items-center gap-2 transition-all shadow-md font-sans"
            >
              Get Quotes from Sellers
              <span className="text-lg">›</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // --- MAIN RENDER ---

  return (
    <div className="min-h-screen bg-gray-100 font-sans w-full mt-6">
      {/* PAGE NAVBAR */}
      <nav className="bg-gray-100 border-b border-gray-300 h-10 w-full">
        <div className="flex items-center h-full px-2 overflow-x-auto w-full">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(tab.name)}
              className={`relative flex items-center px-4 py-2 text-xs font-bold whitespace-nowrap transition-colors h-full font-sans ${
                activeTab === tab.name 
                  ? "text-blue-900 bg-white border-t-2 border-blue-900" 
                  : "text-black hover:bg-gray-200"
              }`}
            >
              {tab.name}
              {tab.badge && (
                <span className="ml-1 bg-red-500 text-white text-[8px] font-bold px-1 rounded font-sans">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="w-full">
        {activeTab === "My Orders" ? (
          <MyOrdersPage />
        ) : activeTab === "Services For Business Growth" ? (
          <ServicesForBusinessGrowthPage />
        ) : activeTab === "Products Of Interest" ? (
          <ProductsOfInterestPage />
        ) : activeTab === "Recommended Categories" ? (
          <RecommendedCategoriesPage />
        ) : activeTab === "Past Searches" ? (
          <PastSearchesPage />
        ) : activeTab === "Ship With IM" ? (
          <ShipWithIMPage />
        ) : activeTab === "Post Buy Requirement" ? (
          <>
            {/* Hero Section */}
            <div 
              className="relative bg-cover bg-center mt-4 w-full"
              style={{
                backgroundImage: `linear-gradient(rgba(0,20,40,0.4), rgba(0,20,40,0.4)), url(${buyertoolsbgimage.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="w-full px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">
                  <div className="flex-1 w-full lg:w-[650px]">
                    <div className="bg-gray-100 rounded shadow-lg p-6 w-full">
                      <h1 className="text-2xl font-bold text-blue-900 text-center mb-5 font-sans">
                        Tell us what you Need
                      </h1>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={handleSearchQueryChange}
                          placeholder="Enter Product / Service name"
                          className="w-full px-4 py-3 border border-gray-400 rounded text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:border-teal-500 font-sans"
                        />
                        <button
                          type="submit"
                          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-4 rounded text-sm uppercase tracking-wide transition-colors font-sans"
                        >
                          Submit Requirement
                        </button>
                      </form>
                      <div className="mt-5 pt-5 border-t border-gray-300">
                        <p className="text-center text-gray-700 text-sm font-bold mb-4 font-sans">
                          You may be looking to buy
                        </p>
                        <div className="flex justify-center gap-2 flex-wrap">
                          <button
                            onClick={() => setSearchQuery("Builders Hardware")}
                            className="px-4 py-2 bg-white border border-gray-400 rounded-full text-sm text-gray-600 hover:border-teal-500 hover:text-teal-500 transition-colors font-sans"
                          >
                            Builders Hardw...
                          </button>
                          <button
                            onClick={() => setSearchQuery("Rubber Coatings")}
                            className="px-4 py-2 bg-white border border-gray-400 rounded-full text-sm text-gray-600 hover:border-teal-500 hover:text-teal-500 transition-colors font-sans"
                          >
                            Rubber Coatings
                          </button>
                          <button
                            onClick={handleSuggestionClick}
                            className="px-4 py-2 bg-white border border-gray-400 rounded-full text-sm text-gray-600 hover:border-teal-500 hover:text-teal-500 transition-colors flex items-center gap-2 font-sans"
                          >
                            Account Manag...
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-80">
                    <div className="bg-white rounded shadow-lg overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                        <h2 className="text-base font-bold text-black font-sans">My Orders</h2>
                        <button className="text-xs text-gray-600 hover:text-teal-500 transition-colors font-bold font-sans">
                          View All...
                        </button>
                      </div>
                      <div className="divide-y divide-gray-200">
                        {orders.map((order) => (
                          <div 
                            key={order.id} 
                            className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <h3 className="text-xs font-bold text-black font-sans">{order.title}</h3>
                                <p className="text-[11px] text-gray-500 mt-0.5 font-sans">
                                  {order.suppliers} {order.suppliers === 1 ? 'Supplier' : 'Suppliers'}
                                </p>
                              </div>
                              <span className="text-[11px] text-gray-400 font-sans">{order.date}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Sections */}
            <div className="w-full px-4 py-4">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-1/2">
                  <h2 className="text-xl font-bold text-black mb-4 font-sans">Recommended Categories</h2>
                  <div className="space-y-4">
                    {categories.slice(0, 5).map((category) => (
                      <div 
                        key={category.id}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex h-32"
                      >
                        <div className="w-32 h-32 bg-gray-100 flex-shrink-0 relative">
                          <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 p-4 flex flex-col justify-center items-center relative">
                          <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors bg-white rounded-full p-1 border border-gray-200">
                            <ExternalLink className="w-3 h-3" />
                          </button>
                          <h3 className="text-base font-bold text-black text-center font-sans">{category.name}</h3>
                          <p className="text-sm text-black font-bold mt-2 font-sans">Get Quotes</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-full lg:w-1/2">
                  <h2 className="text-xl font-bold text-black mb-4 font-sans">Product of Interest</h2>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden w-80">
                    <div className="relative w-80 h-44">
                      <Image 
                        src={buyertoolsbgimage}
                        alt={productsOfInterest[0].name}
                        fill
                        className="object-cover"
                        sizes="320px"
                        priority
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="text-base font-bold text-blue-900 font-sans">{productsOfInterest[0].name}</h3>
                      <p className="text-sm text-gray-500 mt-1 font-sans">By: {productsOfInterest[0].company}</p>
                      <button className="mt-4 text-teal-500 text-sm font-bold flex items-center justify-center gap-2 mx-auto hover:underline transition-all font-sans">
                        <MessageSquare className="w-4 h-4" />
                        Contact Seller
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Items */}
            <div className="w-full px-4 py-6">
              <h2 className="text-xl font-bold text-black mb-4 font-sans">Related to items you&apos;ve viewed</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {relatedItems.map((item) => (
                  <div 
                    key={item.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="h-40 bg-gray-100 relative p-4 flex items-center justify-center">
                      <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm text-black text-center line-clamp-2 min-h-[40px] font-bold font-sans">{item.name}</h3>
                      <button className="mt-3 w-full bg-teal-500 hover:bg-teal-600 text-white text-xs font-bold py-2 px-3 rounded transition-colors font-sans">
                        More Like This
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Categories */}
            <div className="w-full px-4 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {productCategorySections.map((section) => (
                  <div key={section.id} className="w-full">
                    <h2 className="text-2xl font-bold text-blue-900 mb-4 font-sans">{section.title}</h2>
                    <div className="flex gap-4 h-96">
                      <div className="w-1/2 h-full relative rounded-lg overflow-hidden">
                        <img src={section.featuredImage} alt="Product" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          {section.featuredLabels.map((label, idx) => (
                            <p key={idx} className="text-white font-bold text-base mb-1 font-sans">{label}</p>
                          ))}
                        </div>
                      </div>
                      <div className="w-1/2 h-full flex flex-col gap-3">
                        {section.products.map((product) => (
                          <div 
                            key={product.id}
                            className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex"
                          >
                            <div className="w-1/2 h-full relative">
                              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="w-1/2 h-full flex items-center justify-center p-4">
                              <h3 className="text-base font-bold text-gray-900 text-center leading-tight font-sans">{product.name}</h3>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-12">
                <button 
                  onClick={() => console.log('View All Categories clicked')}
                  className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-12 rounded transition-colors text-base font-sans"
                >
                  View All Categories
                </button>
              </div>
            </div>

            {/* Premium Brands */}
            <div className="w-full bg-white mt-8 py-8 mb-16">
              <div className="w-full px-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 font-sans">
                  Explore products from Premium Brands
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-items-center">
                  {brands.map((logo, index) => (
                    <div key={index} className="w-32 h-16 relative grayscale hover:grayscale-0 transition-all duration-300">
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
            </div>
          </>
        ) : (
          <div className="w-full px-4 py-16 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-sans">{activeTab}</h2>
            <p className="text-gray-600 font-sans">This section is under development.</p>
          </div>
        )}
      </main>

      {/* Back to Top */}
      <div className="fixed bottom-4 right-4 flex flex-col items-center z-40">
        <button 
          onClick={scrollToTop}
          className="bg-white border border-gray-300 rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
        >
          <ChevronUp className="w-5 h-5 text-gray-600" />
        </button>
        <span className="text-xs text-gray-600 mt-1 font-bold font-sans">Back to Top</span>
      </div>
    </div>
  );
}