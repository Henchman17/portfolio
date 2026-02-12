"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { site } from "@/data/site";

const nav = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/credentials", label: "Credentials" },
  { href: "/resume", label: "Resume" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Static Navbar - becomes sticky on scroll */}
      <header 
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-neutral-200/50 py-3" 
            : "bg-white/95 backdrop-blur-md py-4"
        }`}
      >
        <div className="max-w-5xl mx-auto px-4">
          <nav 
            className="flex items-center justify-between px-6 py-3"
          >
            {/* Logo */}
            <Link 
              href="/" 
              className="text-lg font-bold tracking-tight text-neutral-900 hover:opacity-70 transition-opacity"
            >
              {site.name.split(" ")[0]}
              <span className="text-neutral-400">.</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {nav.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                      isActive
                        ? "text-neutral-900"
                        : "text-neutral-500 hover:text-neutral-900"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute inset-0 bg-neutral-100 rounded-lg -z-10" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* CTA Button - Desktop */}
            <Link 
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md"
              href="/resume"
            >
              Resume
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl hover:bg-neutral-100 transition-colors"
              aria-label="Toggle menu"
            >
              <svg 
                className="w-5 h-5 text-neutral-700" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                ) : (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                )}
              </svg>
            </button>
          </nav>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-2 rounded-2xl bg-white/95 backdrop-blur-xl border border-neutral-200/50 p-2 shadow-xl shadow-black/5 animate-in slide-in-from-top-2">
              {nav.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-neutral-900 text-white"
                        : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </Link>
                );
              })}
              <div className="mt-2 pt-2 border-t border-neutral-100">
                <Link 
                  className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl bg-neutral-900 text-white hover:bg-neutral-800 transition-colors"
                  href="/resume"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Download Resume
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

    </>
  );
}
