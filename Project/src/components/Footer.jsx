import React from "react";
import logo from "../assets/t.png";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-16">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between mb-8 sm:mb-12 gap-8">
          <div className="mb-8 lg:mb-0">
              <img src={logo} alt="" className="w-10 h-10 sm:w-12 sm:h-12" />
            <p className="text-sm sm:text-base text-gray-400 max-w-md mb-4 sm:mb-6">
              FREE SHIPPING ON ORDERS OVER $99 | FREE SHIPPING ON ORDERS OVER $99
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <h3 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">HELP</h3>
              <ul className="space-y-2 text-sm sm:text-base text-gray-400">
                <li><a href="/Support" className="hover:text-[#CCFF00] transition-colors">Support</a></li>
                <li><a href="/Clothshop" className="hover:text-[#CCFF00] transition-colors">Clothshop</a></li>
                <li><a href="/FAQ" className="hover:text-[#CCFF00] transition-colors">FAQS</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">FOLLOW US</h3>
              <ul className="space-y-2 text-sm sm:text-base text-gray-400">
                <li><a href="#" className="hover:text-[#CCFF00] transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-[#CCFF00] transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-[#CCFF00] transition-colors">X(Twitter)</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-3 sm:mb- text-sm sm:text-base">CONTACT</h3>
              <ul className="space-y-2 text-sm sm:text-base text-gray-400">
                <li>1611 N South Third Street</li>
                <li>Suite 119A</li>
                <li>Montprey XX 94-2033</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;