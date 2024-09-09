// components/Navbar.js
"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/decarb-horizontal.svg";
import avatar from "@/assets/avatar.svg";
import styles from "@/ui/NavBar/navBar.module.css";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";

export default function NavBar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { handleLogout } = useAuth();

  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
    },
    {
      title: "Another Page",
      path: "/dashboard/anotherpage",
    },
  ];

  return (
    <nav className={styles.navBar}>
      <div className={styles.navBarContainer}>
        <Link href="/dashboard">
          <Image src={logo} alt="Decarb.Earth Logo" />
        </Link>

        <div className="hidden md:flex md:items-center md:space-x-4">
          {menuItems.map((item, index) => (
            <Link
              href={item.path}
              key={index}
              className={`${styles.navLink} ${
                pathname === item.path && styles.active
              }`}
            >
              {item.title}
            </Link>
          ))}
        </div>

        {/* Profile Avatar */}
        <div className="relative hidden md:block">
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={styles.profile}
          >
            <Image src={avatar} alt="Profile" className={styles.profileImg} />
          </div>

          {dropdownOpen && (
            <div className={styles.dropdownContainer}>
              <Link className={styles.dropdownLink} href="/dashboard/profile">
                Profile
              </Link>
              <div
                className={styles.dropdownLink}
                onClick={() => handleLogout()}
              >
                Logout
              </div>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={styles.hamburger}
          >
            <svg
              className="h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={styles.navBarMobile}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item, index) => (
              <Link
                href={item.path}
                key={index}
                className={`${styles.navLinkMobile} ${
                  pathname === item.path && styles.active
                }`}
              >
                {item.title}
              </Link>
            ))}
             <Link className={`${styles.navLinkMobile} ${
                  pathname === '/dashboard/profile' && styles.active
                }`} href="/dashboard/profile">
                Profile
              </Link>
              <div
                className={styles.navLinkMobile}
                onClick={() => handleLogout()}
              >
                Logout
              </div>
          </div>
        </div>
      )}
    </nav>
  );
}
