'use client';

import React from 'react';
import Image from 'next/image';
import {
  LocationOn,
  KeyboardArrowDown,
  Lock,
  FlashOn,
  Handshake,
  Chat,
  Description,
  TrendingUp,
  ChatBubbleOutline,
  Call,
  VerifiedUser,
  Store,
  PhoneAndroid,
  Calculate,
} from '@mui/icons-material';
import styles from '../../component/styles/Buyer.module.css';

/* ================= INFO CARD ================= */
type InfoCardProps = {
  icon: React.ReactNode;
  title: string;
  desc: string;
  btn: string;
};

function InfoCard({ icon, title, desc, btn }: InfoCardProps) {
  return (
    <div className={styles.infoCard}>
      <div className={styles.iconBox}>{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
      <button>{btn}</button>
    </div>
  );
}

/* ================= ACTIVITY CARD ================= */
type ActivityCardProps = {
  icon: React.ReactNode;
  count: number;
  label: string;
  variant: 'blue' | 'green' | 'lightGreen' | 'orange';
};

function ActivityCard({
  icon,
  count,
  label,
  variant,
}: ActivityCardProps) {
  return (
    <div className={`${styles.activityCard} ${styles[variant]}`}>
      <div className={styles.activityIcon}>{icon}</div>
      <div className={styles.activityCount}>{count}</div>
      <div className={styles.activityLabel}>{label}</div>
    </div>
  );
}

/* ================= MORE CARD ================= */
type CardProps = {
  icon: React.ReactNode;
  title: string;
  desc: string;
  btn: string;
  variant: 'blue' | 'green' | 'orange' | 'purple';
};

function MoreCard({ icon, title, desc, btn, variant }: CardProps) {
  return (
    <div className={`${styles.moreCard} ${styles[variant]}`}>
      <div className={styles.moreIcon}>{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
      <button>{btn}</button>
    </div>
  );
}

/* ================= MAIN PAGE ================= */
export default function BuyerPage() {
  return (
    <div className={styles.container}>
      {/* ===== SEARCH BAR ===== */}
      <div className={styles.searchCard}>
        <div className={styles.locationBox}>
          <LocationOn />
          <span>Indore</span>
          <KeyboardArrowDown />
        </div>

        <input
          className={styles.searchInput}
          placeholder="Enter product / service"
        />

        <button className={styles.advanceBtn}>
          ✨ Advance Search
        </button>
      </div>

      <div className={styles.recent}>Recent Searches:</div>

      {/* ===== MAIN GRID ===== */}
      <div className={styles.grid}>
        {/* ===== LEFT: CATEGORIES ===== */}
        <div className={styles.categoriesCard}>
          <h2>Categories You May Like</h2>

          <div className={styles.categoriesRow}>
            {[
              { title: 'Generic Medicines', img: '/med.jpg' },
              { title: 'Surgical Gloves', img: '/gloves.jpg' },
              { title: 'Basmati Rice', img: '/rice.jpg' },
              { title: 'Flex Printing Machine', img: '/printer.jpg' },
            ].map((item) => (
              <div className={styles.categoryBox} key={item.title}>
                <Image
                  src={item.img}
                  alt={item.title}
                  width={220}
                  height={140}
                />
                <p>{item.title}</p>
                <button>Get Quotes</button>
              </div>
            ))}
          </div>
        </div>

        {/* ===== RIGHT: LOGIN CARD ===== */}
        <div className={styles.loginCard}>
          <h3>
            <Lock /> Complete Your Login
          </h3>

          <p className={styles.loginSub}>
            Secure access to your account via OTP verification.
          </p>

          <button className={styles.otpBtn}>Send OTP</button>

          <p className={styles.switchUser}>
            Sign in as different user
          </p>

          <hr />

          <h4>Unlock Full Access & Features:</h4>

          <ul>
            <li>
              <FlashOn />
              <span>
                <b>Take Control:</b> Manage Profile Settings, check Posted
                Requirements, and Raise Tickets.
              </span>
            </li>

            <li>
              <Handshake />
              <span>
                <b>Optimize Sourcing:</b> View Sellers Matched, compare Quotes,
                and check Seller Trust Scores.
              </span>
            </li>

            <li>
              <Chat />
              <span>
                <b>Engage & Review:</b> Chat directly with sellers, Rate &
                Review their services, and Mark Favourites.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* ===== SECOND CATEGORIES CAROUSEL ===== */}
      <div className={styles.categoriesCard}>
        <h2>Categories You May Like</h2>

        <div className={styles.carouselWrapper}>
          <div className={styles.categoriesRow} id="category-carousel">
            {[
              {
                title: 'Nutraceuticals',
                img: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843',
              },
              {
                title: 'Bricks',
                img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
              },
              {
                title: 'Wood Boards',
                img: 'https://images.unsplash.com/photo-1582582621959-48d27397dc69',
              },
              {
                title: 'Rapid Test Kit',
                img: 'https://images.unsplash.com/photo-1581595219315-a187dd40c322',
              },
            ].map((item) => (
              <div className={styles.categoryBox} key={item.title}>
                <img src={item.img} alt={item.title} />
                <p>{item.title}</p>
                <button>Get Quotes</button>
              </div>
            ))}
          </div>

          {/* RIGHT ARROW */}
          <button
            className={styles.carouselArrow}
            onClick={() => {
              const el = document.getElementById('category-carousel');
              el?.scrollBy({ left: 300, behavior: 'smooth' });
            }}
          >
            ❯
          </button>
        </div>
      </div>

      {/* ===== YOUR ACTIVITY ===== */}
      <section className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>Your Activity</h2>

        <div className={styles.activityGrid}>
          <ActivityCard
            icon={<Description />}
            count={4}
            label="Enquiry Posted"
            variant="blue"
          />
          <ActivityCard
            icon={<TrendingUp />}
            count={0}
            label="BuyLead Posted"
            variant="green"
          />
          <ActivityCard
            icon={<ChatBubbleOutline />}
            count={0}
            label="Replies"
            variant="lightGreen"
          />
          <ActivityCard
            icon={<Call />}
            count={1}
            label="Calls"
            variant="orange"
          />
        </div>
      </section>

      {/* ===== TOP BRANDS (AUTO CAROUSEL) ===== */}
      <section className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>
          Top Brands on IndiaMART
        </h2>

        <div className={styles.brandCarousel}>
          <div className={styles.brandTrack}>
            {[
              {
                name: 'Cummins',
                src: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Cummins_logo.svg',
              },
              {
                name: 'Stanley Black & Decker',
                src: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Stanley_Black_%26_Decker_logo.svg',
              },
              {
                name: 'Hyundai',
                src: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Hyundai_Construction_Equipment_logo.svg',
              },
              {
                name: 'SANY',
                src: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/SANY_logo.svg',
              },

              /* DUPLICATE for seamless loop */
              {
                name: 'Cummins-2',
                src: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Cummins_logo.svg',
              },
              {
                name: 'Stanley-2',
                src: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Stanley_Black_%26_Decker_logo.svg',
              },
              {
                name: 'Hyundai-2',
                src: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Hyundai_Construction_Equipment_logo.svg',
              },
              {
                name: 'SANY-2',
                src: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/SANY_logo.svg',
              },
            ].map((brand) => (
              <div key={brand.name} className={styles.brandItem}>
                <Image
                  src={brand.src}
                  alt={brand.name}
                  width={160}
                  height={60}
                  className={styles.brandLogo}
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MORE FOR YOU ===== */}
      <section className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>More For You</h2>

        <div className={styles.moreForYouGrid}>
          <MoreCard
            icon={<VerifiedUser />}
            title="Get verified sellers"
            desc="Tell us your requirement & let our experts find verified sellers for you"
            btn="Get verified sellers"
            variant="blue"
          />

          <MoreCard
            icon={<Store />}
            title="Sell on IndiaMART for free"
            desc="Reach out to more than 21+ crore buyers. Sell with us."
            btn="Start Selling"
            variant="green"
          />

          <MoreCard
            icon={<PhoneAndroid />}
            title="Download our App"
            desc="Get instant notifications on the go. Download our App Now"
            btn="Download Now"
            variant="orange"
          />

          <MoreCard
            icon={<Calculate />}
            title="Tally on Mobile"
            desc="With Live Keeping, SMEs can now connect their Tally offline data to mobile app"
            btn="Know More"
            variant="purple"
          />
        </div>
      </section>
      {/* ===== WHAT OUR BUYERS SAY ===== */}
<section className={styles.sectionCard}>
  <h2 className={styles.sectionTitle}>What Our Buyers Say</h2>

  <div className={styles.testimonialGrid}>
    {[
      {
        text: `IndiaMART has made it convenient for me to search for vendors of electronic appliances right from my office, saving time, cost, and manpower.`,
        name: 'Manoj Choudhary',
        role: 'Construction Material Contractor',
        img: 'https://images.unsplash.com/photo-1603415526960-f7e0328f7b34',
      },
      {
        text: `I have been using IndiaMART for my purchases for over 1.5 years now, as it offers the most reasonable prices along with a wide variety of products.`,
        name: 'Rajat Arora',
        role: 'Electronics Wholesaler',
        img: 'https://images.unsplash.com/photo-1589571894960-20bbe2828d0a',
        active: true,
      },
      {
        text: `For my bulk requirements, I easily find suppliers who help me save around 40% on costs while delivering quality items within the guaranteed time.`,
        name: 'Madan Gopal',
        role: 'Disposable Items Wholesaler',
        img: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6',
      },
      {
        text: `Every month, I am able to save more than Rs 1.5 lakh by choosing IndiaMART to procure fabric for my business needs.`,
        name: 'Jitendra Kumar',
        role: 'Garment Manufacturer',
        img: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e',
      },
    ].map((item, index) => (
      <div
        key={index}
        className={`${styles.testimonialCard} ${
          item.active ? styles.activeTestimonial : ''
        }`}
      >
        <p className={styles.testimonialText}>{item.text}</p>

        <div className={styles.videoBox}>
          <img src={item.img} alt={item.name} />
          <div className={styles.playButton}>▶</div>
        </div>

        <h4 className={styles.buyerName}>{item.name}</h4>
        <p className={styles.buyerRole}>{item.role}</p>
      </div>
    ))}
  </div>
</section>

    </div>
  );
}