import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, TrendingUp, Sparkles, Zap } from 'lucide-react';

// Particle Cursor Component
const ParticleCursor = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });

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
      mouseRef.current = { x: e.clientX, y: e.clientY };
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


// Hero Section for Collections
const CollectionsHero = () => {
  return (
    <div className="relative h-screen bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10" />
      <img
        src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80"
        alt="Collections"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold text-white mb-6 leading-tight">
              CURATED STYLE
            </h1>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-[#CCFF00] mb-8">
              FOR EVERY SEASON
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl">
              Explore our handpicked collections designed to elevate your wardrobe with timeless pieces and contemporary trends.
            </p>
            <button className="bg-[#CCFF00] text-black px-8 sm:px-10 py-4 sm:py-5 font-bold hover:bg-[#b8e600] transition-colors text-lg group flex items-center gap-3">
              EXPLORE COLLECTIONS
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Collection Card Component
const CollectionCard = ({ collection, featured }) => {
  if (featured) {
    return (
      <div className="relative h-96 sm:h-[600px] lg:h-[700px] overflow-hidden group cursor-pointer">
        <img
          src={collection.image}
          alt={collection.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-12">
          <div className="flex items-center gap-3 mb-4">
            {collection.icon}
            <span className="bg-[#CCFF00] text-black px-4 py-1 text-xs sm:text-sm font-bold">
              {collection.tag}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-4">
            {collection.title}
          </h2>
          <p className="text-base sm:text-lg text-gray-300 mb-6 max-w-xl">
            {collection.description}
          </p>
          <div className="flex items-center gap-4">
            <button className="bg-white text-black px-6 sm:px-8 py-3 sm:py-4 font-bold hover:bg-[#CCFF00] transition-colors">
              SHOP NOW
            </button>
            <span className="text-white font-semibold">{collection.items} Items</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden group cursor-pointer">
      <img
        src={collection.image}
        alt={collection.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
        {collection.tag && (
          <div className="mb-3">
            <span className="bg-[#CCFF00] text-black px-3 py-1 text-xs font-bold">
              {collection.tag}
            </span>
          </div>
        )}
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
          {collection.title}
        </h3>
        <p className="text-sm sm:text-base text-gray-300 mb-4">
          {collection.description}
        </p>
        <button className="self-start flex items-center gap-2 text-[#CCFF00] font-bold hover:gap-4 transition-all">
          VIEW COLLECTION
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

// Trending Collections Section
const TrendingCollections = () => {
  const collections = [
    {
      title: "WINTER ESSENTIALS 2024",
      description: "Stay warm and stylish with our premium winter collection",
      image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800&q=80",
      tag: "TRENDING",
      items: 48,
      icon: <TrendingUp className="w-6 h-6 text-[#CCFF00]" />
    },
    {
      title: "STREET STYLE",
      description: "Urban fashion meets contemporary comfort",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
      tag: "NEW",
      items: 36
    },
    {
      title: "PREMIUM DENIM",
      description: "Handcrafted denim for the modern wardrobe",
      image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80",
      tag: "EXCLUSIVE",
      items: 24
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-16 bg-white">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">TRENDING NOW</h2>
            <p className="text-lg text-gray-600">Collections everyone is talking about</p>
          </div>
          <button className="hidden sm:block text-[#CCFF00] font-semibold hover:underline">
            VIEW ALL →
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <CollectionCard collection={collections[0]} featured={true} />
          <div className="grid grid-cols-1 gap-6 sm:gap-8">
            <CollectionCard collection={collections[1]} />
            <CollectionCard collection={collections[2]} />
          </div>
        </div>
      </div>
    </section>
  );
};

// Seasonal Collections
const SeasonalCollections = () => {
  const seasons = [
    {
      title: "SPRING AWAKENING",
      description: "Fresh colors and lightweight fabrics for the new season",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
      tag: "COMING SOON",
      items: 52,
      icon: <Sparkles className="w-6 h-6 text-[#CCFF00]" />
    },
    {
      title: "SUMMER VIBES",
      description: "Beat the heat with our cool and comfortable summer essentials",
      image: "https://images.unsplash.com/photo-1523359346063-d879354c0ea5?w=800&q=80",
      tag: "HOT",
      items: 64,
      icon: <Zap className="w-6 h-6 text-[#CCFF00]" />
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-16 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12">SEASONAL COLLECTIONS</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {seasons.map((season, index) => (
            <CollectionCard key={index} collection={season} featured={true} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Category Collections
const CategoryCollections = () => {
  const categories = [
    {
      title: "MEN'S COLLECTION",
      description: "Sophisticated style for the modern man",
      image: "https://images.unsplash.com/photo-1507680434567-5739c80be1ac?w=800&q=80",
      tag: "BESTSELLER",
      items: 124
    },
    {
      title: "WOMEN'S COLLECTION",
      description: "Elegance meets contemporary fashion",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
      tag: "POPULAR",
      items: 156
    },
    {
      title: "KIDS COLLECTION",
      description: "Playful and comfortable for your little ones",
      image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800&q=80",
      tag: "NEW",
      items: 89
    },
    {
      title: "ACCESSORIES",
      description: "Complete your look with perfect finishing touches",
      image: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=800&q=80",
      tag: "TRENDING",
      items: 67
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-16 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12">SHOP BY CATEGORY</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {categories.map((category, index) => (
            <CollectionCard key={index} collection={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Special Collections
const SpecialCollections = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-16 bg-black text-white">
      <div className="container mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12">SPECIAL EDITIONS</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2">
            <div className="relative h-96 sm:h-[600px] overflow-hidden group cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200&q=80"
                alt="Limited Edition"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-12">
                <span className="bg-[#CCFF00] text-black px-4 py-2 text-sm font-bold inline-block mb-4 w-fit">
                  LIMITED EDITION
                </span>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                  DESIGNER COLLABORATION
                </h3>
                <p className="text-base sm:text-lg text-gray-300 mb-6 max-w-xl">
                  Exclusive pieces from our collaboration with world-renowned designers
                </p>
                <button className="bg-[#CCFF00] text-black px-6 sm:px-8 py-3 sm:py-4 font-bold hover:bg-[#b8e600] transition-colors w-fit">
                  DISCOVER MORE
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6 sm:space-y-8">
            <div className="relative h-44 sm:h-56 lg:h-72 overflow-hidden group cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80"
                alt="Sustainable"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
                <span className="bg-[#CCFF00] text-black px-3 py-1 text-xs font-bold inline-block mb-3 w-fit">
                  ECO-FRIENDLY
                </span>
                <h4 className="text-xl sm:text-2xl font-bold mb-2">SUSTAINABLE LINE</h4>
                <p className="text-sm text-gray-300">Fashion with a conscience</p>
              </div>
            </div>

            <div className="relative h-44 sm:h-56 lg:h-72 overflow-hidden group cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80"
                alt="Luxury"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
                <span className="bg-[#CCFF00] text-black px-3 py-1 text-xs font-bold inline-block mb-3 w-fit">
                  PREMIUM
                </span>
                <h4 className="text-xl sm:text-2xl font-bold mb-2">LUXURY COLLECTION</h4>
                <p className="text-sm text-gray-300">Uncompromising quality</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};



// Main App Component
const Collections = () => {
  return (
    <div className="bg-white">
      <ParticleCursor />
      <CollectionsHero />
      <TrendingCollections />
      <SeasonalCollections />
      <CategoryCollections />
      <SpecialCollections />
    </div>
  );
};

export default Collections;