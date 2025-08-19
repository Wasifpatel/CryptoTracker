import React from 'react';

// Assuming you have your logo component in a separate file or can be defined here
const CryptoTrackerLogo = () => (
  <div className="flex items-center space-x-2">
    {/* Logo Box */}
    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#805ad5] to-[#9f7aea] flex items-center justify-center">
      <span className="text-white font-bold text-sm">C</span>
    </div>
    {/* Gradient Text */}
    <span className="text-xl font-bold bg-gradient-to-r from-[#9f7aea] via-[#805ad5] to-[#6b46c1] bg-clip-text text-transparent">
      CryptoTracker
    </span>
  </div>
);

const Footer = () => {
  return (
    <footer className="bg-[#10121B] text-gray-300 py-16 px-4 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-gray-600 pb-12">
        {/* Left Section: Logo, Description, Socials */}
        <div>
          <CryptoTrackerLogo />
          <p className="mt-4 text-sm leading-relaxed">
            The world's most trusted cryptocurrency tracking platform. Get real-time prices, market data, and insights for thousands of cryptocurrencies.
          </p>
          <div className="flex space-x-4 mt-6 text-gray-400">
            {/* Social Media Icons - Replace with actual SVG or component icons */}
            <a href="#" aria-label="Twitter">
              <svg className="h-6 w-6 hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                {/* Twitter Path */}
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg className="h-6 w-6 hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                {/* LinkedIn Path */}
              </svg>
            </a>
            <a href="#" aria-label="Email">
              <svg className="h-6 w-6 hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                {/* Email Path */}
              </svg>
            </a>
          </div>
        </div>

        {/* Middle Section: Quick Links */}
        <div className="md:ml-24">
          <h4 className="text-white font-semibold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-sm hover:text-white transition-colors">Home</a></li>
            <li><a href="#" className="text-sm hover:text-white transition-colors">Features</a></li>
            <li><a href="#" className="text-sm hover:text-white transition-colors">Pricing</a></li>
            <li><a href="#" className="text-sm hover:text-white transition-colors">Blog</a></li>
          </ul>
        </div>

        {/* Right Section: Support */}
        <div>
          <h4 className="text-white font-semibold text-lg mb-4">Support</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-sm hover:text-white transition-colors">Help Center</a></li>
            <li><a href="#" className="text-sm hover:text-white transition-colors">Contact Us</a></li>
            <li><a href="#" className="text-sm hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="text-sm hover:text-white transition-colors">Terms of Service</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Section: Copyright */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mt-8 text-sm text-gray-500">
        <p>© 2024 CryptoTracker. All rights reserved.</p>
        <p className="mt-4 md:mt-0">Powered by CoinGecko API</p>
      </div>
    </footer>
  );
};

export default Footer;