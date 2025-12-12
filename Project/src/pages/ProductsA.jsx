import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  ShoppingBag,
  Search,
  User,
  SlidersHorizontal,
  Grid,
  List,
  Heart,
  Star
} from 'lucide-react';

// =========================
// ParticleCursor Component
// =========================
const ParticleCursor = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

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
      draw(ctx) {
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
      if (!ctx) return;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      particlesRef.current = particlesRef.current.filter((p) => {
        p.update();
        p.draw(ctx);
        return p.life > 0 && p.size > 0.05;
      });
      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', resize);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      particlesRef.current = [];
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


const FilterSidebar = ({ filters, onFilterChange, isOpen, onClose, onClear }) => {
  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}

      <aside className={`fixed lg:sticky top-0 left-0 h-screen lg:h-auto bg-white z-50 lg:z-0 w-80 lg:w-full transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} overflow-y-auto`}>
        <div className="p-6 border-b lg:border-0">
          <div className="flex items-center justify-between mb-6 lg:mb-8">
            <h2 className="text-2xl font-bold">FILTERS</h2>
            <button onClick={onClose} className="lg:hidden">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="mb-8">
            <h3 className="font-bold mb-4 text-lg">CATEGORY</h3>
            <div className="space-y-3">
              {['All', 'Men', 'Women', 'Kids', 'Accessories'].map((category) => (
                <label key={category} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category)}
                    onChange={() => onFilterChange('categories', category)}
                    className="w-5 h-5 border-2 border-gray-300"
                  />
                  <span className="group-hover:text-[#CCFF00] transition-colors">{category}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-bold mb-4 text-lg">PRICE RANGE</h3>
            <div className="space-y-3">
              {['Under $100', '$100 - $300', '$300 - $500', 'Over $500'].map((range) => (
                <label key={range} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.priceRanges.includes(range)}
                    onChange={() => onFilterChange('priceRanges', range)}
                    className="w-5 h-5 border-2 border-gray-300"
                  />
                  <span className="group-hover:text-[#CCFF00] transition-colors">{range}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-bold mb-4 text-lg">SIZE</h3>
            <div className="flex flex-wrap gap-2">
              {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <button
                  key={size}
                  onClick={() => onFilterChange('sizes', size)}
                  className={`px-4 py-2 border-2 font-bold transition-all ${filters.sizes.includes(size) ? 'bg-[#CCFF00] border-[#CCFF00] text-black' : 'border-gray-300 hover:border-[#CCFF00]'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={onClear} className="w-full py-3 border-2 border-black font-bold hover:bg-black hover:text-white transition-colors">CLEAR ALL FILTERS</button>
          </div>
        </div>
      </aside>
    </>
  );
};

// =========================
// ProductCard Component
// =========================
const ProductCard = ({ product, viewMode, onAddToCart, onToggleWishlist }) => {
  if (viewMode === 'list') {
    return (
      <div className="bg-white border border-gray-200 p-4 sm:p-6 group hover:border-[#CCFF00] transition-all">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <div className="relative w-full sm:w-48 h-64 sm:h-48 overflow-hidden bg-gray-100">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            {product.tag && (
              <div className="absolute top-4 left-4 bg-[#CCFF00] text-black px-3 py-1 text-xs font-bold">{product.tag}</div>
            )}
            <button onClick={() => onToggleWishlist(product.id)} className="absolute top-4 right-4 bg-white p-2 rounded-full hover:bg-[#CCFF00] transition-colors">
              <Heart className={`w-5 h-5 ${product.wishlisted ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-3">{product.description}</p>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < product.rating ? 'fill-[#CCFF00] text-[#CCFF00]' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({product.reviews})</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold">${product.price}</span>
                {product.originalPrice && <span className="text-gray-400 line-through ml-2">${product.originalPrice}</span>}
              </div>
              <button onClick={() => onAddToCart(product)} className="bg-black text-white px-6 py-3 font-bold hover:bg-[#CCFF00] hover:text-black transition-colors">ADD TO CART</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden bg-gray-100 mb-4">
        <img src={product.image} alt={product.name} className="w-full h-64 sm:h-80 lg:h-96 object-cover group-hover:scale-110 transition-transform duration-500" />
        {product.tag && <div className="absolute top-4 left-4 bg-[#CCFF00] text-black px-3 py-1 text-xs sm:text-sm font-bold">{product.tag}</div>}
        <button onClick={() => onToggleWishlist(product.id)} className="absolute top-4 right-4 bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#CCFF00]">
          <Heart className={`w-5 h-5 ${product.wishlisted ? 'fill-red-500 text-red-500' : ''}`} />
        </button>
        <button onClick={() => onAddToCart(product)} className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-2 font-bold opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#CCFF00]">ADD TO CART</button>
      </div>
      <h3 className="text-base sm:text-lg font-semibold mb-2">{product.name}</h3>
      <div className="flex items-center gap-2 mb-2">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-3 h-3 ${i < product.rating ? 'fill-[#CCFF00] text-[#CCFF00]' : 'text-gray-300'}`} />
          ))}
        </div>
        <span className="text-xs text-gray-600">({product.reviews})</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-lg sm:text-xl font-bold">${product.price}</span>
        {product.originalPrice && <span className="text-sm sm:text-base text-gray-400 line-through">${product.originalPrice}</span>}
      </div>
    </div>
  );
};

// =========================
// Helper: applyFiltersAndSort
// =========================
const applyFiltersAndSort = (products, filters, sortBy) => {
  let result = [...products];

  // Simple category filter: if 'All' selected -> no filtering
  if (filters.categories.length && !filters.categories.includes('All')) {
    result = result.filter((p) => {
      // naive category matching based on name; in real app use product.category
      return filters.categories.some((c) => p.name.toLowerCase().includes(c.toLowerCase()));
    });
  }

  // price ranges
  if (filters.priceRanges.length) {
    const priceChecks = {
      'Under $100': (v) => v < 100,
      '$100 - $300': (v) => v >= 100 && v <= 300,
      '$300 - $500': (v) => v > 300 && v <= 500,
      'Over $500': (v) => v > 500
    };

    result = result.filter((p) => filters.priceRanges.some((r) => priceChecks[r](p.price)));
  }

  // sizes (no size data in sample products) -> skip for now

  // sorting
  if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
  else if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
  else if (sortBy === 'newest') result.sort((a, b) => (b.id || 0) - (a.id || 0));
  else if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);

  return result;
};

// =========================
// Main App Component
// =========================
export default function ProductsA() {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const [filters, setFilters] = useState({ categories: [], priceRanges: [], sizes: [] });

  const [products, setProducts] = useState([
    { id: 1, name: "MEN LEATHER JACKET", price: 370, originalPrice: 500, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80", tag: "NEW", rating: 5, reviews: 128, description: "Premium leather jacket with modern fit", wishlisted: false },
    { id: 2, name: "CARGO MEN'S WIDE JEANS", price: 220, originalPrice: 250, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80", rating: 4, reviews: 89, description: "Comfortable cargo jeans with multiple pockets", wishlisted: false },
    { id: 3, name: "MEN'S CASUAL BLAZE", price: 180, originalPrice: 200, image: "https://images.unsplash.com/photo-1507680434567-5739c80be1ac?w=800&q=80", rating: 4, reviews: 56, description: "Stylish casual blazer for any occasion", wishlisted: true },
    { id: 4, name: "WOMEN'S RAINCOAT", price: 400, originalPrice: 500, image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80", tag: "SALE", rating: 5, reviews: 203, description: "Waterproof raincoat with hood", wishlisted: false },
    { id: 5, name: "COTTON MESH SHIRT", price: 400, originalPrice: 600, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80", rating: 4, reviews: 75, description: "Breathable cotton mesh design", wishlisted: false },
    { id: 6, name: "RELAXED GREEN SHIRT", price: 500, image: "https://images.unsplash.com/photo-1598032895397-b9fbcd98589f?w=800&q=80", tag: "TRENDING", rating: 5, reviews: 142, description: "Comfortable relaxed fit shirt", wishlisted: false },
    { id: 7, name: "SPORT JACKET", price: 350, originalPrice: 450, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80", rating: 4, reviews: 98, description: "Athletic jacket for active lifestyle", wishlisted: false },
    { id: 8, name: "DENIM JACKET", price: 280, originalPrice: 350, image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80", rating: 5, reviews: 167, description: "Classic denim jacket design", wishlisted: false },
    { id: 9, name: "WINTER COAT", price: 600, originalPrice: 800, image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800&q=80", tag: "NEW", rating: 5, reviews: 234, description: "Warm winter coat for cold weather", wishlisted: false },
    { id: 10, name: "CASUAL HOODIE", price: 150, originalPrice: 200, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80", rating: 4, reviews: 112, description: "Comfortable everyday hoodie", wishlisted: false },
    { id: 11, name: "FORMAL SHIRT", price: 120, image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80", rating: 4, reviews: 67, description: "Professional formal shirt", wishlisted: false },
    { id: 12, name: "TRACK PANTS", price: 90, originalPrice: 120, image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80", rating: 4, reviews: 89, description: "Comfortable track pants", wishlisted: false }
  ]);

  // Derived data: apply filters and sorting
  const filteredSorted = applyFiltersAndSort(products, filters, sortBy);
  const totalPages = Math.max(1, Math.ceil(filteredSorted.length / itemsPerPage));

  // ensure currentPage stays in bounds when filters change
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [totalPages]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedProducts = filteredSorted.slice(startIndex, startIndex + itemsPerPage);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].includes(value) ? prev[filterType].filter((i) => i !== value) : [...prev[filterType], value]
    }));
  };

  const handleClearFilters = () => {
    setFilters({ categories: [], priceRanges: [], sizes: [] });
  };

  const handleAddToCart = (product) => {
    // replace with your cart logic; kept simple for demo
    alert(`${product.name} added to cart!`);
  };

  const handleToggleWishlist = (productId) => {
    setProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, wishlisted: !p.wishlisted } : p)));
  };

  return (
    <div className="bg-white min-h-screen">
      <ParticleCursor />

      <header className="pt-24 pb-12 px-4 sm:px-6 lg:px-16 bg-[#CCFF00] text-white">
        <div className="container mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">ALL PRODUCTS</h1>
          <p className="text-lg text-gray-800">Discover our complete collection</p>
        </div>
      </header>

      <main className="py-8 px-4 sm:px-6 lg:px-16">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-80 flex-shrink-0">
              <FilterSidebar filters={filters} onFilterChange={handleFilterChange} isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} onClear={handleClearFilters} />
            </div>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b">
                <div className="flex items-center gap-4">
                  <button onClick={() => setIsFilterOpen(true)} className="lg:hidden flex items-center gap-2 px-4 py-2 border-2 border-black font-bold hover:bg-black hover:text-white transition-colors">
                    <SlidersHorizontal className="w-5 h-5" />
                    FILTERS
                  </button>
                  <p className="text-gray-600">Showing {Math.min(filteredSorted.length, startIndex + 1)}-{Math.min(startIndex + itemsPerPage, filteredSorted.length)} of {filteredSorted.length} products</p>
                </div>

                <div className="flex items-center gap-4">
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-2 border-2 border-gray-300 font-semibold focus:outline-none focus:border-[#CCFF00]">
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                    <option value="rating">Highest Rated</option>
                  </select>

                  <div className="flex gap-2">
                    <button onClick={() => setViewMode('grid')} className={`p-2 border-2 ${viewMode === 'grid' ? 'bg-[#CCFF00] border-[#CCFF00]' : 'border-gray-300'}`} aria-label="Grid view"><Grid className="w-5 h-5" /></button>
                    <button onClick={() => setViewMode('list')} className={`p-2 border-2 ${viewMode === 'list' ? 'bg-[#CCFF00] border-[#CCFF00]' : 'border-gray-300'}`} aria-label="List view"><List className="w-5 h-5" /></button>
                  </div>
                </div>
              </div>

              <section className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8' : 'space-y-6'}>
                {displayedProducts.length ? displayedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} viewMode={viewMode} onAddToCart={handleAddToCart} onToggleWishlist={handleToggleWishlist} />
                )) : (
                  <div className="p-8 text-center text-gray-600">No products match your filters.</div>
                )}
              </section>

              {/* Pagination */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t">
                <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="flex items-center gap-2 px-6 py-3 border-2 border-black font-bold hover:bg-black hover:text-white transition-colors disabled:opacity-50">
                  <ChevronLeft className="w-5 h-5" /> PREVIOUS
                </button>

                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, index) => (
                    <button key={index} onClick={() => setCurrentPage(index + 1)} className={`px-4 py-2 border-2 font-bold transition-colors ${currentPage === index + 1 ? 'bg-[#CCFF00] border-[#CCFF00] text-black' : 'border-gray-300 hover:border-black'}`}>
                      {index + 1}
                    </button>
                  ))}
                </div>

                <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="flex items-center gap-2 px-6 py-3 border-2 border-black font-bold hover:bg-black hover:text-white transition-colors disabled:opacity-50">
                  NEXT <ChevronRight className="w-5 h-5" />
                </button>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
