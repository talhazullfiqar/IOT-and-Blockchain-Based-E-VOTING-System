"use client";
import { useState } from "react";
import BackgroundGradient from "@/components/MainBackgroundGradient/backgroundGradient";
import BackgroundSparkle from "@/components/MainPageComponents/backgroundSparkles/backgroundSparkle";
import avatar from "../../../assets/images/avatar.jpg";
import styles from "./VotingNavBar.module.css";
import Image from "next/image";
import { HiOutlineLogout } from "react-icons/hi";
import Link from "next/link";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <BackgroundGradient />
      <nav className={styles.navContainer}>
        <div className={styles.navLogo}>Logo</div>
        <div className={styles.profileContainer}>
          <div
            className={styles.profileIconContainer}
            onClick={toggleDropdown}
            role="button"
            aria-expanded={dropdownOpen}
          >
            <Image className={styles.profileImage} alt="profile" src={avatar} />
          </div>
          {dropdownOpen && (
            <div className={styles.dropdownMenu}>
              <Link className={styles.logoutButton} href="/">
                <HiOutlineLogout className={styles.logoutIcon} />
                Logout
              </Link>
            </div>
          )}
        </div>
      </nav>
      <BackgroundSparkle />
    </>
  );
}
