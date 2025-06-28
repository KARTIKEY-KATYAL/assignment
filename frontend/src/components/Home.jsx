import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Header from "./Header";
import ContactForm from "./ContactForm";

function Home() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institution: '',
    requirements: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  
  const videos = useMemo(() => ["/1.mp4", "/2.mp4", "/3.mp4"], []);
  const videoRef = useRef(null);
  const intervalRef = useRef(null);

  // Enhanced video switching with preloading - Fixed to 3 seconds
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
      setIsVideoLoaded(false);
    }, 3000); // Changed to 3 seconds as requested

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [videos.length]);

  // Handle form input changes with validation
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [formErrors]);

  // Handle form submission
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'institution'];
    const missingFields = requiredFields.filter(field => !formData[field].trim());
    
    if (missingFields.length > 0) {
      setSubmitMessage('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitMessage('Please enter a valid email address.');
      setIsSubmitting(false);
      return;
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      setSubmitMessage('Please enter a valid 10-digit phone number.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitMessage('Thank you! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        institution: '',
        requirements: ''
      });
      
      // Auto close modal after success
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitMessage('');
      }, 3000);
    } catch (error) {
      setSubmitMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  // Handle modal close
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSubmitMessage('');
    setFormErrors({});
    setFormData({
      name: '',
      email: '',
      phone: '',
      institution: '',
      requirements: ''
    });
  }, []);

  // Preload next video for smoother transitions
  useEffect(() => {
    const nextVideoIndex = (currentVideo + 1) % videos.length;
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'video';
    link.href = videos[nextVideoIndex];
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, [currentVideo, videos]);

  // Handle keyboard events for modal and accessibility
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isModalOpen) {
        handleCloseModal();
      }
      // Close mobile menu on escape
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isModalOpen || isMobileMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    // Prevent background scrolling when modal is open
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, isMobileMenuOpen, handleCloseModal]);

  // Add intersection observer for animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);

    // Observe animated elements
    const animatedElements = document.querySelectorAll('.network-dot');
    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden text-white bg-black">
      {/* Background Video */}
      <video
        ref={videoRef}
        key={`video-${currentVideo}`}
        className="absolute top-0 left-0 w-full h-full object-cover opacity-70 transition-opacity duration-1000"
        src={videos[currentVideo]}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onLoadedData={() => {
          setIsVideoLoaded(true);
          // Force video to play when loaded
          if (videoRef.current) {
            videoRef.current.play().catch(console.warn);
          }
        }}
        onLoadStart={() => setIsVideoLoaded(false)}
        onError={(e) => {
          console.warn(`Failed to load video: ${videos[currentVideo]}`, e);
          // Skip to next video on error
          setCurrentVideo(prev => (prev + 1) % videos.length);
        }}
        onCanPlay={() => {
          if (videoRef.current) {
            videoRef.current.play().catch(console.warn);
          }
        }}
      />

      {/* Loading Indicator */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 z-15 flex items-center justify-center bg-black">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-400 mb-4"></div>
            <p className="text-cyan-400 text-sm">Loading Experience...</p>
          </div>
        </div>
      )}

      {/* Overlay to darken background */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>

      {/* Header Component */}
      <Header 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        setIsModalOpen={setIsModalOpen}
      />

      {/* Hero Section */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 -mt-20">

        {/* Main Content */}
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight heading-responsive">
            All Your Information in One Place
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl font-medium text-cyan-300 max-w-2xl mx-auto text-responsive">
            Simplify Management with a Unified Data Platform.
          </p>
        </div>

              </div>

              {/* Contact Form Modal */}
      <ContactForm 
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        submitMessage={submitMessage}
        handleSubmit={handleSubmit}
        formData={formData}
        handleInputChange={handleInputChange}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

export default Home;
