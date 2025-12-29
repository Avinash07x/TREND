import React, { useState } from "react";
import { Menu, X, ShoppingBag, Search, User } from "lucide-react";
import logo from "../assets/t.png";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">

          {/* Logo + Desktop Menu */}
          <div className="flex items-center gap-6 lg:gap-12">
            <div className="flex items-center gap-2">
              <img src={logo} alt="" className="w-10 h-10 sm:w-12 sm:h-12" />
            </div>

            {/* Desktop Links */}
            <div className="hidden lg:flex gap-8">
              <a href="/" className="text-white hover:text-[#CCFF00] transition-colors">
                Home
              </a>
              <a href="/collections" className="text-white hover:text-[#CCFF00] transition-colors">
                Collections
              </a>
              <a href="/all-Products" className="text-white hover:text-[#CCFF00] transition-colors">
                All Products
              </a>
              <a href="/carts" className="text-white hover:text-[#CCFF00] transition-colors">
                My Cart
              </a>
            </div>
          </div>

          {/* Icons + Mobile Menu Button */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden lg:flex items-center gap-4">
              <a href="/Carts">
                <button className="text-white hover:text-[#CCFF00] transition-colors">
                  <ShoppingBag className="w-5 h-5" />
                </button>
              </a>

            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="lg:hidden text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-700 pt-4">
            <div className="flex flex-col gap-4">
              <a href="/" className="text-white hover:text-[#CCFF00] transition-colors">
                Home
              </a>
              <a href="/Collections" className="text-white hover:text-[#CCFF00] transition-colors">
                Collections
              </a>
              <a href="/All-Products" className="text-white hover:text-[#CCFF00] transition-colors">
                All Products
              </a>
              <a href="/Carts" className="text-white hover:text-[#CCFF00] transition-colors">
                My Cart
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
