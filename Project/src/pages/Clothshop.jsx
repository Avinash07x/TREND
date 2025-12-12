import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Menu, X, ShoppingBag, Search, User, MapPin, Phone, Clock, Star, Car, Award, Users, TrendingUp } from 'lucide-react';

// Particle Cursor Component
const ParticleCursor = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.life = 100;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 2;
        if (this.size > 0.1) this.size -= 0.05;
      }

      draw() {
        ctx.fillStyle = `rgba(204, 255, 0, ${this.life / 100})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const handleMouseMove = (e) => {
      for (let i = 0; i < 3; i++) {
        particlesRef.current.push(new Particle(e.clientX, e.clientY));
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter(particle => {
        particle.update();
        particle.draw();
        return particle.life > 0;
      });

      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};


// Hero Section
const ClothshopHero = () => {
  return (
    <div className="relative h-screen bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-transparent z-10" />
      <img
        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80"
        alt="Store"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold text-white mb-6 leading-tight">
              TREND CLOTHSHOP
            </h1>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-[#CCFF00] mb-8">
              EXPERIENCE FASHION
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl">
              Visit our premium retail space where style meets innovation. Discover exclusive collections and personalized shopping experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[#CCFF00] text-black px-8 py-4 font-bold hover:bg-[#b8e600] transition-colors">
                GET DIRECTIONS
              </button>
              <button className="border-2 border-white text-white px-8 py-4 font-bold hover:bg-white hover:text-black transition-colors">
                BOOK APPOINTMENT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Store Info Section
const StoreInfo = () => {
  const info = [
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "LOCATION",
      details: ["1611 N South Third Street", "Suite 119A", "Montprey XX 94-2033"]
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "OPENING HOURS",
      details: ["Monday - Friday: 10AM - 9PM", "Saturday: 10AM - 10PM", "Sunday: 11AM - 8PM"]
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "CONTACT",
      details: ["Phone: +1 (800) 123-4567", "Email: store@trend.com", "WhatsApp: +1 (800) 123-4568"]
    },
    {
      icon: <Car className="w-8 h-8" />,
      title: "PARKING",
      details: ["Free parking available", "Underground garage access", "Valet service on weekends"]
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-16 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 text-center">STORE INFORMATION</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {info.map((item, index) => (
            <div key={index} className="border-2 border-gray-200 p-6 hover:border-[#CCFF00] transition-all group">
              <div className="text-[#CCFF00] mb-4 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <ul className="space-y-2 text-gray-600">
                {item.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Store Features
const StoreFeatures = () => {
  const features = [
    {
      icon: <Award className="w-16 h-16" />,
      title: "PREMIUM QUALITY",
      description: "Handpicked collections from world-class designers and brands"
    },
    {
      icon: <Users className="w-16 h-16" />,
      title: "PERSONAL STYLING",
      description: "Expert stylists available for one-on-one consultations"
    },
    {
      icon: <TrendingUp className="w-16 h-16" />,
      title: "LATEST TRENDS",
      description: "First access to new arrivals and exclusive launches"
    },
    {
      icon: <Star className="w-16 h-16" />,
      title: "VIP EXPERIENCE",
      description: "Exclusive shopping environment with complimentary refreshments"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-16 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 text-center">WHY VISIT US</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="text-[#CCFF00] mb-6 flex justify-center group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Store Gallery
const StoreGallery = () => {
  const images = [
    "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80",
    "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80",
    "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80"
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-16 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 text-center">STORE GALLERY</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative h-64 sm:h-80 overflow-hidden group cursor-pointer">
              <img
                src={image}
                alt={`Store ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Map Section
const MapSection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-16 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 text-center">FIND US</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-300 h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-600" />
              <p className="text-gray-600 font-semibold">Interactive Map</p>
              <p className="text-sm text-gray-500">Map integration would go here</p>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-6">DIRECTIONS</h3>
            <div className="space-y-4 text-gray-600">
              <p>
                <strong>By Car:</strong> Take Highway 101 North, exit at Main Street. Turn right on Third Street. Our store is on the left side after 2 blocks.
              </p>
              <p>
                <strong>By Public Transit:</strong> Take Metro Line 7 or Bus 42. Stop at South Third Street Station. Walk 5 minutes north.
              </p>
              <p>
                <strong>Parking:</strong> Free underground parking available. Enter from Fourth Street entrance.
              </p>
            </div>
            <button className="mt-8 bg-[#CCFF00] text-black px-8 py-4 font-bold hover:bg-[#b8e600] transition-colors w-fit">
              OPEN IN GOOGLE MAPS
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Reviews Section
const ReviewsSection = () => {
  const reviews = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment: "Amazing store! The staff is incredibly helpful and the collection is stunning. Best shopping experience ever!",
      date: "2 weeks ago"
    },
    {
      name: "Michael Chen",
      rating: 5,
      comment: "Love the atmosphere and exclusive pieces. The personal styling service is a game-changer.",
      date: "1 month ago"
    },
    {
      name: "Emma Davis",
      rating: 5,
      comment: "Beautiful store with an incredible selection. The team made my shopping experience unforgettable!",
      date: "1 month ago"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-16 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 text-center">CUSTOMER REVIEWS</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="border-2 border-gray-200 p-6 hover:border-[#CCFF00] transition-all">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#CCFF00] text-[#CCFF00]" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">{review.comment}</p>
              <div className="flex items-center justify-between">
                <p className="font-bold">{review.name}</p>
                <p className="text-sm text-gray-500">{review.date}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Average Rating: 4.9/5.0 based on 487 reviews</p>
          <button className="border-2 border-black px-8 py-3 font-bold hover:bg-black hover:text-white transition-colors">
            READ ALL REVIEWS
          </button>
        </div>
      </div>
    </section>
  );
};


const Clothshop = () => {
  return (
    <div className="bg-white">
      <ParticleCursor />
      <ClothshopHero />
      <StoreInfo />
      <StoreFeatures />
      <StoreGallery />
      <MapSection />
      <ReviewsSection />
    </div>
  );
};

export default Clothshop;