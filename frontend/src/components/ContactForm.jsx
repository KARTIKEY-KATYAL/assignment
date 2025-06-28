import React, { useState, useCallback } from 'react';
import { createContact } from '../services/api.js';
import API_CONFIG from '../config/api.js';

function ContactForm({ isModalOpen, handleCloseModal }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institution: '',
    requirements: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});

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
      // Send data to backend API
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CONTACTS}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
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
          handleCloseModal();
          setSubmitMessage('');
        }, 3000);
      } else {
        // Handle API errors
        if (result.error === 'Email already exists') {
          setSubmitMessage('This email is already registered. Please use a different email.');
        } else if (result.details && result.details.length > 0) {
          setSubmitMessage(result.details[0].msg);
        } else {
          setSubmitMessage(result.message || 'Something went wrong. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setSubmitMessage('Unable to connect to server. Please check your connection and try again.');
      } else {
        setSubmitMessage('Something went wrong. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, handleCloseModal]);

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center md:justify-end pt-16 md:pt-20 px-4 md:pr-8 md:pl-0">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleCloseModal}
      ></div>
      
      {/* Modal */}
      <div className="relative bg-white text-gray-800 w-full max-w-md md:w-96 max-h-[85vh] md:max-h-[80vh] p-6 md:p-8 shadow-xl overflow-y-auto animate-slide-in-right rounded-lg border">
        {/* Arrow pointing to button - only show on larger screens */}
        <div className="hidden md:block absolute -top-2 right-12 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white"></div>
        
        {/* Close Button */}
        <button 
          onClick={handleCloseModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl transition-colors"
          aria-label="Close modal"
        >
          ×
        </button>

        {/* Modal Content */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Get In Touch</h2>
          <p className="text-gray-600 mb-8">
            Have questions about our Products? Fill out the form below to get a call with us.
          </p>

          {submitMessage && (
            <div className={`mb-4 p-3 rounded-lg text-sm ${
              submitMessage.includes('Thank you') 
                ? 'bg-green-100 text-green-800 border border-green-300' 
                : 'bg-red-100 text-red-800 border border-red-300'
            }`}>
              {submitMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name *
              </label>
              <input 
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
                autoComplete="name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
                autoComplete="email"
              />
            </div>

            {/* Contact Number Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Number *
              </label>
              <div className="flex">
                <select className="px-3 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 transition-all duration-200">
                  <option>+91</option>
                  <option>+1</option>
                  <option>+44</option>
                  <option>+61</option>
                </select>
                <input 
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter 10-digit number"
                  className="flex-1 px-4 py-3 border border-gray-300 border-l-0 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                  pattern="[0-9]{10}"
                  maxLength="10"
                  autoComplete="tel"
                />
              </div>
            </div>

            {/* Institution Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Institution Name *
              </label>
              <input 
                type="text"
                name="institution"
                value={formData.institution}
                onChange={handleInputChange}
                placeholder="Enter your institution name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
                autoComplete="organization"
              />
            </div>

            {/* Requirements Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Requirements
              </label>
              <textarea 
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                placeholder="Tell us about your specific requirements..."
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
                maxLength="500"
              ></textarea>
              <div className="text-xs text-gray-500 mt-1">
                {formData.requirements.length}/500 characters
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-lg font-semibold transition-all duration-200 transform ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed text-white' 
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:scale-105 shadow-lg hover:shadow-xl'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Submitting...
                </div>
              ) : (
                'Submit'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
