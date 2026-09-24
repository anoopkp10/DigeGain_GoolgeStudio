import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string, sectionId?: string) => void;
}

export function Header({ currentView, onNavigate }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', view: 'home', sectionId: 'hero' },
    { label: 'What We Build', view: 'home', sectionId: 'what-we-build' },
    { label: 'Solutions', view: 'home', sectionId: 'solutions' },
    { label: 'Portfolio', view: 'portfolio' },
    { label: 'Why DIGEGAIN', view: 'home', sectionId: 'why-digegain' },
    { label: 'Contact', view: 'contact' },
  ];

  const handleNavClick = (view: string, sectionId?: string) => {
    onNavigate(view, sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Zone 1: Single Brand Lockup with authentic logo */}
        <button
          onClick={() => handleNavClick('home', 'hero')}
          className="flex items-center gap-3 text-left focus-visible:outline-none"
        >
          <img
            src="/logo.svg"
            alt="DIGEGAIN Logo"
            className="h-9 w-auto object-contain"
          />
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.view, link.sectionId)}
              className={`transition-colors hover:text-[#1E89C1] ${
                currentView === link.view && !link.sectionId ? 'font-semibold text-[#1E89C1]' : ''
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            onClick={() => handleNavClick('contact')}
            data-cursor="start"
            className="flex items-center gap-2 rounded-xl bg-[#F37B20] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-orange-500/20 transition-all hover:bg-[#D9630E] hover:shadow-lg active:scale-95"
          >
            <span>START YOUR PROJECT</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-6 py-6 shadow-xl md:hidden">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.view, link.sectionId)}
                className="text-left text-base font-semibold text-slate-800 hover:text-[#1E89C1]"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2">
              <button
                onClick={() => handleNavClick('contact')}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#F37B20] py-3 text-sm font-bold text-white"
              >
                <span>START YOUR PROJECT</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
