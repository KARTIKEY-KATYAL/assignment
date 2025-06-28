import React from 'react';

function Header({ isMobileMenuOpen, setIsMobileMenuOpen, setIsModalOpen }) {
  return (
    <>
      {/* Top Bar with Book A Demo Button and Contact Info */}
      <div className="absolute top-6 left-4 right-4 md:left-8 md:right-8 z-30 flex justify-between items-center">
        {/* Book A Demo Button - Left Side */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus-ring text-sm md:text-base"
          aria-label="Book a demo"
        >
          Book A Demo ▶
        </button>

        {/* Contact Info - Right Side (Horizontal) */}
        <div className="hidden lg:flex items-center space-x-6 text-sm">
          <div className="flex items-center">
            <span className="mr-2">📞</span>
            <a href="tel:+918303837930" className="hover:text-cyan-400 transition-colors">+91 83038 37930</a>
          </div>
          <div className="flex items-center">
            <span className="mr-2">✉️</span>
            <a href="mailto:contactus@a2developers.org" className="hover:text-cyan-400 transition-colors">contactus@a2developers.org</a>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <header className="relative z-20 flex justify-between items-center px-4 md:px-8 py-6 mt-16">
        {/* Logo */}
        <div className="flex items-center">
          <img 
            src="/logo.png" 
            alt="A2 Developers logo - Unified Data Platform Solutions" 
            className="h-10 md:h-12 w-auto" 
            loading="eager"
          />
          <span className="ml-3 text-xl md:text-2xl font-bold">A2 Developers</span>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden md:flex space-x-8 font-medium text-lg">
          <a href="#home" className="hover:text-cyan-400 transition-colors border-b-2 border-cyan-400 pb-1" aria-label="Home">Home</a>
          <a href="#about" className="hover:text-cyan-400 transition-colors" aria-label="About Us">About Us</a>
          <a href="#product" className="hover:text-cyan-400 transition-colors" aria-label="Product">Product</a>
          <a href="#contact" className="hover:text-cyan-400 transition-colors" aria-label="Contact Us">Contact Us</a>
          <a href="#services" className="hover:text-cyan-400 transition-colors" aria-label="Services">Services</a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white text-2xl hover:text-cyan-400 transition-colors" 
          aria-label="Menu"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-24 left-0 right-0 z-30 bg-black/90 backdrop-blur-md">
          <nav className="flex flex-col p-6 space-y-4">
            {/* Contact Info at top of mobile menu */}
            <div className="pb-4 border-b border-gray-600">
              <div className="flex items-center mb-2">
                <span className="mr-2">📞</span>
                <a href="tel:+918303837930" className="text-cyan-400">+91 83038 37930</a>
              </div>
              <div className="flex items-center">
                <span className="mr-2">✉️</span>
                <a href="mailto:contactus@a2developers.org" className="text-cyan-400">contactus@a2developers.org</a>
              </div>
            </div>
            <a href="#home" className="text-white hover:text-cyan-400 transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
            <a href="#about" className="text-white hover:text-cyan-400 transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>About Us</a>
            <a href="#product" className="text-white hover:text-cyan-400 transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Product</a>
            <a href="#contact" className="text-white hover:text-cyan-400 transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</a>
            <a href="#services" className="text-white hover:text-cyan-400 transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Services</a>
          </nav>
        </div>
      )}
    </>
  );
}

export default Header;
