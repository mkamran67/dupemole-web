"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const navLinks = [
  { label: "Scan", href: "#scan" },
  { label: "Results", href: "#results" },
  { label: "Filters", href: "#filters" },
  { label: "Settings", href: "#settings" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const openGithub = () => {
    window.open("https://github.com/mkamran67/DupeMole", "_blank");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-[70px] flex items-center transition-all duration-300 ${
        scrolled ? "bg-[#2c1810]/95 backdrop-blur-md border-b border-white/10 shadow-prominent" : "bg-transparent"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" onClick={(e) => handleNav(e, "#home")} className="flex items-center gap-3 cursor-pointer group">
          <img
            src="/logo.png"
            alt="DupeMole Logo"
            className="w-12 h-12 rounded-lg object-cover bg-[#2c1810]"
          />
          <span className="font-bold text-white text-lg tracking-tight group-hover:text-[#e89b9b] transition-colors duration-200">
            DupeMole
          </span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                className="text-white/70 hover:text-[#f5c542] text-sm font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={openGithub}
          className="hidden md:flex items-center gap-2 bg-[#f5c542] text-[#2c1810] text-sm font-semibold px-5 py-2.5 rounded-pill hover:bg-[#e0b038] transition-colors duration-200 cursor-pointer whitespace-nowrap"
        >
          <i className="ri-github-line text-base"></i>
          Github
          <i className="ri-external-link-line text-xs opacity-60"></i>
        </button>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white text-2xl w-8 h-8 flex items-center justify-center cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <i className={menuOpen ? "ri-close-line" : "ri-menu-line"}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-[70px] left-0 right-0 bg-[#2c1810]/98 backdrop-blur-md border-b border-white/10 md:hidden">
          <ul className="flex flex-col py-4 px-6 gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNav(e, link.href)}
                  className="text-white/80 hover:text-[#f5c542] text-base font-medium transition-colors duration-200 cursor-pointer block py-1"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={openGithub}
                className="w-full text-left flex items-center gap-2 text-[#f5c542] text-base font-semibold cursor-pointer py-1"
              >
                <i className="ri-github-line"></i>
                Github
                <i className="ri-external-link-line text-xs opacity-60"></i>
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
