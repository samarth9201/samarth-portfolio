import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import React from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiMoon, FiSun } from "react-icons/fi";

const LinkMap = [
  { name: "About", link: "/" },
  { name: "Projects", link: "/projects" },
  { name: "News", link: "/news" },
  // { name: "Contact", link: "/contact" },
];

interface NavbarProps {
  DisplayName?: boolean;
}

const Navbar = (props: NavbarProps) => {
  const { theme, colors, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isAnimating, setAnimating] = React.useState(false); // Track animation state

  const handleMenuToggle = () => {
    if (isMobileMenuOpen) {
      setAnimating(true); // Start the slideOut animation
      setTimeout(() => {
        setMobileMenuOpen(false); // Hide the menu after animation completes
        setAnimating(false);
      }, 500); // Match animation duration
    } else {
      setMobileMenuOpen(true); // Show the menu
    }
  };

  return (
    <nav
      style={{
        backgroundColor: colors.nav_background,
        color: colors.text,
        boxShadow: colors.shadow,
      }}
      className={`fixed w-full top-0 z-50 h-16`}
    >
      <div className="flex items-center justify-between px-6 py-4 md:px-20 h-full">
        {/* Branding */}
        <Link href="/" className="text-2xl" style={{ color: colors.text }}>
          {props.DisplayName && (
            <>
              <span className="font-bold">Samarth</span> Bhadane
            </>
          )}
        </Link>

        <div className="flex items-center gap-4">
          {/* Desktop Links */}
          <div className="hidden md:flex gap-4">
            {LinkMap.map(({ name, link }) => (
              <Link
                href={link}
                key={name}
                className="hover:rounded-lg px-2 py-1 transition"
                style={{
                  color: colors.text,
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    colors.linkHoverBackground;
                  e.currentTarget.style.color = colors.linkHoverText;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = colors.text;
                }}
              >
                {name}
              </Link>
            ))}
          </div>

          {/* Theme Toggle */}
          <button
            className="hidden md:block text-lg focus:outline-none"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <FiSun style={{ color: colors.linkHoverBackground }} />
            ) : (
              <FiMoon style={{ color: colors.linkHoverBackground }} />
            )}
          </button>
        </div>

        {/* Hamburger Icon */}
        <button
          className="md:hidden focus:outline-none"
          onClick={handleMenuToggle}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? (
            <FaTimes style={{ color: colors.text }} className="w-6 h-6" />
          ) : (
            <FaBars style={{ color: colors.text }} className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        style={{
          backgroundColor: colors.background,
          color: colors.text,
          display: isMobileMenuOpen || isAnimating ? "flex" : "none", // Keep it rendered
        }}
        className={`fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center gap-8 transition-transform duration-500 ${
          isMobileMenuOpen ? "animate-slideIn" : "animate-slideOut"
        }`}
      >
        <button
          className={`absolute top-5 right-5 focus:outline-none`}
          onClick={handleMenuToggle}
          aria-label="Close Menu"
        >
          <FaTimes style={{ color: colors.text }} className="w-8 h-8" />
        </button>
        {LinkMap.map(({ name, link }) => (
          <Link
            href={link}
            key={name}
            className="text-xl hover:rounded-lg px-6 py-3 transition"
            style={{
              color: colors.text,
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                colors.linkHoverBackground;
              e.currentTarget.style.color = colors.linkHoverText;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = colors.text;
            }}
            onClick={handleMenuToggle}
          >
            {name}
          </Link>
        ))}
        <button
          className="mt-6 text-lg focus:outline-none"
          onClick={toggleTheme}
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? (
            <FiSun style={{ color: colors.linkHoverBackground }} />
          ) : (
            <FiMoon style={{ color: colors.linkHoverBackground }} />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
