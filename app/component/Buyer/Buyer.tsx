// pages/index.tsx
import React from 'react';
import {
  Dashboard,
  Message,
  Person,
  AttachMoney,
  LocalShipping,
  SupportAgent,
  Chat,
  Place,
  LocalHospital,
  RequestQuote,
  Verified,
  Security,
  ContactMail,
  Lock
} from '@mui/icons-material';
import styles from '../styles/dashboard.module.css';

const DashboardPage: React.FC = () => {
  // Menu items for sidebar
  const menuItems = [
    { icon: <Dashboard />, text: 'Dashboard', active: false },
    { icon: <Message />, text: 'Messages', active: false },
    { icon: <Person />, text: 'Know Your Seller', active: false },
    { icon: <Person />, text: 'My Profile', subtext: 'Complete your profile', active: true },
    { icon: <AttachMoney />, text: 'Finance', active: false },
    { icon: <LocalShipping />, text: 'Ship With IM', active: false },
    { icon: <SupportAgent />, text: 'My Tickets', active: false },
    { icon: <SupportAgent />, text: 'Any Suggestion', active: false },
  ];

  // Recent searches
  const recentSearches = ['Khandwa', 'Indore', 'Bhopal', 'Mumbai', 'Delhi'];

  // Categories
  const categories = [
    {
      icon: <LocalHospital />,
      title: 'Generic Medicines',
      description: 'Get quality medicines at affordable prices'
    },
    {
      icon: <RequestQuote />,
      title: 'Get Quotes',
      description: 'Get competitive quotes from verified sellers'
    }
  ];

  // Know Your Seller features
  const sellerFeatures = [
    {
      icon: <Verified />,
      title: 'Verified Business Information',
      description: 'Confirm the seller\'s credibility with verified business details and credentials.'
    },
    {
      icon: <Security />,
      title: 'TrustSEAL Verification',
      description: 'Trusted sellers who are committed to quality and transparency in business.',
      highlight: 'TrustSEAL'
    },
    {
      icon: <ContactMail />,
      title: 'Contact & Activity Details',
      description: 'Know how responsive the seller is and how long they\'ve been active on IndiaMART.'
    },
    {
      icon: <Lock />,
      title: 'Privacy Protection',
      description: 'Your data is secure with every transaction and complies with privacy standards.'
    }
  ];

  // Full access features
  const fullAccessFeatures = [
    'Take Contact Manage Profile Settings, check Posted Requirements, and Rules Tickets.',
    'Optimize Searching View Sellers Matched, compare Quotes, and check Seller Trust Scores.',
    'Engage & Review Chat Directly with sellers, base & Review their services, and Mark Favorites.'
  ];

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}># End</h2>
        </div>
        
        <h3 className={styles.userSection}>## USER</h3>
        
        {menuItems.map((item, index) => (
          <div 
            key={index} 
            className={`${styles.menuItem} ${item.active ? styles.active : ''}`}
          >
            <span className={styles.menuIcon}>{item.icon}</span>
            <div>
              <div>{item.text}</div>
              {item.subtext && (
                <div className={styles.menuSubtext}>
                  {item.subtext}
                </div>
              )}
            </div>
          </div>
        ))}
        
        <div className={styles.divider} />
        
        {/* Help Section */}
        <div className={styles.helpSection}>
          <h4 className={styles.helpTitle}>Need Help?</h4>
          <div className={styles.phoneNumber}>096-9696-9696</div>
          <button className={styles.chatButton}>
            <Chat />
            Chat With Us
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Recent Searches */}
        <div className={styles.card}>
          <div className={styles.locationHeader}>
            <Place />
            <h3 className={styles.subheading}>Khandwa</h3>
          </div>
          
          <div className={styles.recentSearchesLabel}>Recent Searches:</div>
          
          <div className={styles.searchBadgesContainer}>
            {recentSearches.map((search, index) => (
              <span key={index} className={styles.searchBadge}>
                {search}
              </span>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className={styles.subheading}>Categories You May Like</h3>
          
          <div className={styles.categoriesGrid}>
            {categories.map((category, index) => (
              <div key={index} className={styles.categoryCard}>
                <div style={{ fontSize: '40px', marginBottom: '10px' }}>
                  {category.icon}
                </div>
                <div className={styles.categoryTitle}>{category.title}</div>
                <div className={styles.categoryDescription}>{category.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Know Your Seller */}
        <div className={styles.card}>
          <h3 className={styles.subheading}>
            Ensure Safe Transactions with Know Your Seller!
          </h3>
          <p className={styles.description}>
            IndiaMART's Know Your Seller feature gives you detailed information about the seller's business, including:
          </p>
          
          <div className={styles.featuresGrid}>
            {sellerFeatures.map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <div className={styles.featureHeader}>
                  <span className={styles.featureIcon}>
                    {feature.icon}
                  </span>
                  <div className={styles.featureTitle}>
                    {feature.title}
                    {feature.highlight && (
                      <span className={styles.trustSeal}>{feature.highlight}</span>
                    )}
                  </div>
                </div>
                <div className={styles.featureDescription}>
                  {feature.description}
                </div>
              </div>
            ))}
          </div>
          
          <button className={styles.primaryButton}>
            Check the seller's profile now to make more informed and safer buying decisions.
          </button>
        </div>

        {/* OTP Section */}
        <div className={styles.otpSection}>
          <h3 className={styles.subheading}>Complete Your Login</h3>
          <p className={styles.otpDescription}>
            Secure access to your account via OTP verification.
          </p>
          
          <input 
            type="text" 
            placeholder="Enter mobile number" 
            className={styles.otpInput}
          />
          
          <button className={styles.otpButton}>
            Send OTP
          </button>
          
          <div className={styles.signInText}>
            Sign in at different user
          </div>
        </div>

        {/* Full Access Features */}
        <div className={styles.card}>
          <h3 className={styles.subheading}>Unlock Full Access & Features:</h3>
          
          <div className={styles.featureList}>
            {fullAccessFeatures.map((feature, index) => (
              <div key={index} className={styles.featureListItem}>
                <span className={styles.bullet}>•</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;