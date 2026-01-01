'use client';

import React from 'react';
import styles from '../../../component/styles/Sidebar.module.css';
import {
  FiGrid,
  FiMessageSquare,
  FiShield,
  FiUser,
  FiDollarSign,
  FiTruck,
  FiHeadphones,
  FiEdit,
  FiChevronRight,
  FiMapPin,
  FiPhone,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';


const Sidebar: React.FC = () => {
  return (
    <aside className={styles.sidebar}>
      {/* ===== PROFILE ===== */}
      <div className={styles.profile}>
        <div className={styles.avatar}>R</div>

        <div>
          <div className={styles.name}>Ritik</div>

          <div className={styles.phone}>
            <FiPhone /> 8518900...
          </div>

          <div className={styles.location}>
            <FiMapPin /> Jabalpur <FiEdit />
          </div>
        </div>
      </div>

      {/* ===== MENU ===== */}
      <nav className={styles.menu}>
        <MenuItem icon={<FiGrid />} text="Dashboard" active />
        <MenuItem icon={<FiMessageSquare />} text="Messages" />
        <MenuItem icon={<FiShield />} text="Know Your Seller" highlight />
        <MenuItem
          icon={<FiUser />}
          text="My Profile"
          badge="32% complete"
        />
        <MenuItem icon={<FiDollarSign />} text="Finance" />
        <MenuItem icon={<FiTruck />} text="Ship With IM" />
        <MenuItem icon={<FiHeadphones />} text="My Tickets" />
        <MenuItem icon={<FiEdit />} text="Any Suggestion" />
      </nav>

      {/* ===== HELP CARD ===== */}
      <div className={styles.helpCard}>
        <div className={styles.helpHeader}>
          <FaWhatsapp className={styles.whatsappIcon} />
          <div>
            <div className={styles.helpTitle}>Need Help?</div>
            <div className={styles.helpCall}>
              Call: 096-9696-9696
            </div>
          </div>
        </div>

        <button className={styles.chatBtn}>
          <FaWhatsapp />
          Chat With Us
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

/* ===== Menu Item ===== */
const MenuItem = ({
  icon,
  text,
  active,
  badge,
  highlight,
}: {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  badge?: string;
  highlight?: boolean;
}) => (
  <div
    className={`${styles.menuItem} ${
      active ? styles.active : ''
    } ${highlight ? styles.highlight : ''}`}
  >
    <span className={styles.icon}>{icon}</span>
    <span className={styles.text}>{text}</span>

    {badge && <span className={styles.badge}>{badge}</span>}

    <FiChevronRight className={styles.arrow} />
  </div>
);
