import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag, Trash2, Plus, Minus, Heart, ArrowRight } from 'lucide-react';

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


// Cart Item Component
const CartItem = ({ item, onUpdateQuantity, onRemove, onToggleWishlist }) => {
  return (
    <div className="bg-white border border-gray-200 p-4 sm:p-6 group hover:border-[#CCFF00] transition-all">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        <div className="relative w-full sm:w-32 h-48 sm:h-32 overflow-hidden bg-gray-100">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-1">{item.name}</h3>
                <p className="text-sm text-gray-600">Size: {item.size} | Color: {item.color}</p>
              </div>
              <button
                onClick={() => onToggleWishlist(item.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Heart className={`w-5 h-5 ${item.wishlisted ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300">
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  className="p-2 hover:bg-gray-100 transition-colors"
                  disabled={item.quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 font-bold">{item.quantity}</span>
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className="p-2 hover:bg-gray-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => onRemove(item.id)}
                className="text-gray-400 hover:text-red-500 transition-colors p-2"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="text-right">
              <p className="text-2xl font-bold">${(item.price * item.quantity).toFixed(2)}</p>
              {item.originalPrice && (
                <p className="text-sm text-gray-400 line-through">${(item.originalPrice * item.quantity).toFixed(2)}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Order Summary Component
const OrderSummary = ({ subtotal, discount, shipping, total, onCheckout }) => {
  const [promoCode, setPromoCode] = useState('');

  return (
    <div className="bg-black text-white p-6 sm:p-8 sticky top-24">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">ORDER SUMMARY</h2>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-gray-300">
          <span>Subtotal</span>
          <span className="font-semibold">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-300">
          <span>Discount</span>
          <span className="font-semibold text-[#CCFF00]">-${discount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-300">
          <span>Shipping</span>
          <span className="font-semibold">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="border-t border-gray-700 pt-4">
          <div className="flex justify-between text-xl sm:text-2xl font-bold">
            <span>Total</span>
            <span className="text-[#CCFF00]">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Promo Code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="flex-1 px-4 py-3 bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-[#CCFF00]"
          />
          <button className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-gray-600 font-bold transition-colors">
            APPLY
          </button>
        </div>
      </div>

      <button
        onClick={onCheckout}
        className="w-full bg-[#CCFF00] text-black py-4 font-bold hover:bg-[#b8e600] transition-colors flex items-center justify-center gap-2 group"
      >
        PROCEED TO CHECKOUT
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>

      <div className="mt-6 p-4 bg-white/5 border border-gray-700">
        <p className="text-sm text-gray-300">
          ✓ FREE SHIPPING on orders over $99
        </p>
        <p className="text-sm text-gray-300 mt-2">
          ✓ 30-day return policy
        </p>
      </div>
    </div>
  );
};



const Cards = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "MEN LEATHER JACKET",
      price: 370,
      originalPrice: 500,
      quantity: 1,
      size: "L",
      color: "Black",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80",
      wishlisted: false
    },
    {
      id: 2,
      name: "CARGO MEN'S WIDE JEANS",
      price: 220,
      originalPrice: 250,
      quantity: 2,
      size: "32",
      color: "Blue",
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80",
      wishlisted: true
    },
    {
      id: 3,
      name: "MEN'S CASUAL BLAZE",
      price: 180,
      originalPrice: 200,
      quantity: 1,
      size: "M",
      color: "Navy",
      image: "https://images.unsplash.com/photo-1507680434567-5739c80be1ac?w=500&q=80",
      wishlisted: false
    }
  ]);


  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const toggleWishlist = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, wishlisted: !item.wishlisted } : item
    ));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = cartItems.reduce((sum, item) => {
    const itemDiscount = item.originalPrice ? (item.originalPrice - item.price) * item.quantity : 0;
    return sum + itemDiscount;
  }, 0);
  const shipping = subtotal > 99 ? 0 : 15;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    alert('Proceeding to checkout...');
  };

  return (
    <div className="bg-white min-h-screen">
      <ParticleCursor />

      {/* Page Header */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-16 bg-[#CCFF00] text-white">
        <div className="container mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">MY CART</h1>
          <p className="text-lg text-gray-800">{cartItems.length} items in your cart</p>
        </div>
      </div>

      {/* Cart Content */}
      {cartItems.length === 0 ? (
        <div className="py-20 px-4 text-center">
          <div className="max-w-md mx-auto">
            <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-gray-300" />
            <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some items to get started!</p>
            <button className="bg-[#CCFF00] text-black px-8 py-4 font-bold hover:bg-[#b8e600] transition-colors">
              START SHOPPING
            </button>
          </div>
        </div>
      ) : (
        <div className="py-12 px-4 sm:px-6 lg:px-16">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map(item => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                    onToggleWishlist={toggleWishlist}
                  />
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <OrderSummary
                  subtotal={subtotal}
                  discount={discount}
                  shipping={shipping}
                  total={total}
                  onCheckout={handleCheckout}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cards;