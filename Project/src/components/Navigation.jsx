import React, { useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import logo from "../assets/t.png";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">

          {/* Logo + Desktop Menu */}
          <div className="flex items-center gap-6 lg:gap-12">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Logo" className="w-10 h-10 sm:w-12 sm:h-12" />
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex gap-8 text-white">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/collections" className="nav-link">Collections</Link>
              <Link to="/all-products" className="nav-link">All Products</Link>
              <Link to="/carts" className="nav-link">My Cart</Link>
              <Link to="/clothshop" className="nav-link">Clothshop</Link>
              <Link to="/faq" className="nav-link">FAQ</Link>
              <Link to="/support" className="nav-link">Support</Link>
            </div>
          </div>

          {/* Icons + Mobile Menu Button */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden lg:flex items-center gap-4">
              <Link to="/carts" className="text-white hover:text-[#CCFF00]">
                <ShoppingBag className="w-5 h-5" />
              </Link>
            </div>

            <button
              onClick={() => setIsMenuOpen(prev => !prev)}
              className="lg:hidden text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-700 pt-4">
            <div className="flex flex-col gap-4 text-white">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/collections" className="nav-link">Collections</Link>
              <Link to="/all-products" className="nav-link">All Products</Link>
              <Link to="/carts" className="nav-link">My Cart</Link>
              <Link to="/clothshop" className="nav-link">Clothshop</Link>
              <Link to="/faq" className="nav-link">FAQ</Link>
              <Link to="/support" className="nav-link">Support</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
