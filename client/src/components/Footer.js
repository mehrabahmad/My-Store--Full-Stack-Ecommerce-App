import React from "react";

const Footer = () => {
  return (
    <footer className=" bg-gray-900 text-gray-300 py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left: Brand and Copy */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold text-white">MyStore</h2>
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} MyStore. All rights reserved.
          </p>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex space-x-6 text-sm">
          <a href="/" className="hover:text-white transition">
            Home
          </a>
          <a href="/products" className="hover:text-white transition">
            Shop
          </a>
          <a href="/profile" className="hover:text-white transition">
            Profile
          </a>
          <a href="/orders" className="hover:text-white transition">
            Orders
          </a>
        </div>

        {/* Right: Social */}
        <div className="flex space-x-4 text-sm">
          <a
            href="https://www.facebook.com/MyStore"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition"
          >
            Facebook
          </a>
          <a
            href="https://www.instagram.com/MyStore"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition"
          >
            Instagram
          </a>
          <a
            href="https://www.twitter.com/MyStore"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-400 transition"
          >
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
