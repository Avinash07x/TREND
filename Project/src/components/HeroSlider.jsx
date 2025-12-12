import React, { useState, useEffect} from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroSlider = () => {
  const slides = [
    {
      title: "TRANSFORM YOUR LOOK WITH FASHION",
      subtitle: "THAT SPEAKS TO YOU",
      description: "Elevate your style by embracing the latest trends and Levi's attention to every detail to reflect your unique personality.",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
      cashback: "UP TO 50% CASHBACK"
    },
    {
      title: "NEW SEASON",
      subtitle: "ARRIVALS",
      description: "Discover the latest trends in fashion with our exclusive collection designed for the modern trendsetter.",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
      cashback: "UP TO 50% CASHBACK"
    },
    {
      title: "STREET STYLE",
      subtitle: "ESSENTIALS",
      description: "Urban fashion meets comfort. Explore our curated selection of streetwear essentials.",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
      cashback: "UP TO 50% CASHBACK"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen bg-black overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10" />
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-16">
              <div className="max-w-2xl">
                <h1 className="text-3xl sm:text-4xl lg:text-7xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                  {slide.title}
                </h1>
                <h2 className="text-2xl sm:text-3xl lg:text-6xl font-bold text-[#CCFF00] mb-4 sm:mb-6">
                  {slide.subtitle}
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-300 mb-6 sm:mb-8 max-w-xl">
                  {slide.description}
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                  <button className="bg-[#CCFF00] text-black px-6 sm:px-8 py-3 sm:py-4 font-bold hover:bg-[#b8e600] transition-colors">
                    NEW ARRIVAL
                  </button>
                  <span className="text-white font-semibold text-sm sm:text-base">{slide.cashback}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-1 top-1/2 -translate-y-1/2 z-30 bg-white/10 backdrop-blur-sm p-2 sm:p-3 hover:bg-white/20 transition-colors"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-1 top-1/2 -translate-y-1/2 z-30 bg-white/10 backdrop-blur-sm p-2 sm:p-3 hover:bg-white/20 transition-colors"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </button>

      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-8 sm:w-12 h-1 transition-all ${
              index === currentSlide ? 'bg-[#CCFF00]' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;