import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ShoppingBag, Search, User, ChevronDown, Package, RefreshCw, CreditCard, Truck, HelpCircle, Shield } from 'lucide-react';

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
const FAQHero = () => {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-16 bg-black text-white">
      <div className="container mx-auto text-center">
        <div className="inline-block bg-[#CCFF00] text-black px-6 py-2 text-sm font-bold mb-6 rotate-2">
          HAVE QUESTIONS?
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6">FREQUENTLY ASKED</h1>
        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-[#CCFF00] mb-8">QUESTIONS</h2>
        <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          Find answers to the most common questions about our products, shipping, returns, and more
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search FAQs..."
              className="w-full pl-12 pr-4 py-4 bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-[#CCFF00]"
            />
          </div>
          <button className="bg-[#CCFF00] text-black px-8 py-4 font-bold hover:bg-[#b8e600] transition-colors">
            SEARCH
          </button>
        </div>
      </div>
    </div>
  );
};

// FAQ Categories
const FAQCategories = ({ activeCategory, setActiveCategory }) => {
  const categories = [
    { id: 'all', name: 'All Questions', icon: <HelpCircle className="w-5 h-5" /> },
    { id: 'orders', name: 'Orders & Shipping', icon: <Package className="w-5 h-5" /> },
    { id: 'returns', name: 'Returns & Refunds', icon: <RefreshCw className="w-5 h-5" /> },
    { id: 'payment', name: 'Payment', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'delivery', name: 'Delivery', icon: <Truck className="w-5 h-5" /> },
    { id: 'account', name: 'Account & Privacy', icon: <Shield className="w-5 h-5" /> }
  ];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-16 bg-gray-50 border-b-4 border-[#CCFF00]">
      <div className="container mx-auto">
        <div className="flex overflow-x-auto gap-4 pb-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-3 font-bold whitespace-nowrap transition-all ${
                activeCategory === category.id
                  ? 'bg-[#CCFF00] text-black'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.icon}
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// FAQ Item Component
const FAQItem = ({ faq, isOpen, onToggle }) => {
  return (
    <div className="border-2 border-gray-200 overflow-hidden mb-4 hover:border-[#CCFF00] transition-all">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="text-lg font-bold pr-4">{faq.question}</span>
        <ChevronDown 
          className={`w-6 h-6 flex-shrink-0 transition-transform ${
            isOpen ? 'rotate-180 text-[#CCFF00]' : ''
          }`} 
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-6 bg-gray-50">
          <p className="text-gray-600 leading-relaxed mb-4">{faq.answer}</p>
          {faq.additionalInfo && (
            <div className="bg-[#CCFF00]/10 border-l-4 border-[#CCFF00] p-4">
              <p className="text-sm text-gray-700">{faq.additionalInfo}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// FAQ Sections
const FAQSections = ({ activeCategory }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const allFaqs = {
    orders: [
      {
        question: "How can I track my order?",
        answer: "Once your order ships, you'll receive a confirmation email with a tracking number. You can track your order by clicking the tracking link in the email or by logging into your account and visiting the 'Orders' section.",
        additionalInfo: "Tracking information is typically available within 24 hours of shipment."
      },
      {
        question: "Can I modify my order after placing it?",
        answer: "Orders can be modified within 30 minutes of placement. After that, the order enters our fulfillment process and cannot be changed. Please contact our customer service team immediately if you need to make changes.",
        additionalInfo: "For urgent modifications, use our live chat feature for fastest response."
      },
      {
        question: "How long does shipping take?",
        answer: "Standard shipping takes 3-5 business days. Express shipping (1-2 business days) and overnight shipping options are available at checkout. International orders typically arrive within 7-14 business days depending on the destination.",
        additionalInfo: "Processing time is typically 1-2 business days before shipment."
      },
      {
        question: "Do you ship internationally?",
        answer: "Yes, we ship to over 100 countries worldwide. International shipping costs and delivery times vary by destination. All duties and taxes are calculated at checkout, so there are no surprise fees upon delivery.",
        additionalInfo: "Some items may have shipping restrictions to certain countries."
      }
    ],
    returns: [
      {
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy for all items in original condition with tags attached. Items must be unworn, unwashed, and in their original packaging. Returns are free for domestic orders.",
        additionalInfo: "Sale items and final sale products cannot be returned unless defective."
      },
      {
        question: "How do I initiate a return?",
        answer: "Log into your account, go to 'Orders', select the order you wish to return, and click 'Start Return'. You'll receive a prepaid return label via email. Pack the items securely and drop them off at any authorized carrier location.",
        additionalInfo: "Refunds are processed within 5-7 business days of receiving your return."
      },
      {
        question: "Can I exchange an item?",
        answer: "Yes, exchanges are available for size and color variations of the same item. The quickest way is to return the original item for a refund and place a new order. However, you can also request an exchange through customer service.",
        additionalInfo: "Exchange processing typically takes 7-10 business days."
      },
      {
        question: "What if I received a defective item?",
        answer: "We apologize for any inconvenience. Please contact customer service immediately with photos of the defect. We'll arrange for a replacement or full refund at no cost to you, including return shipping.",
        additionalInfo: "Defective items can be returned even after the 30-day return window."
      }
    ],
    payment: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Shop Pay. We also offer buy now, pay later options through Afterpay and Klarna.",
        additionalInfo: "All transactions are encrypted and secure."
      },
      {
        question: "Is it safe to use my credit card on your website?",
        answer: "Absolutely. We use industry-standard SSL encryption to protect your payment information. We never store your complete credit card details on our servers. All transactions are processed through secure payment gateways.",
        additionalInfo: "Look for the padlock icon in your browser's address bar for confirmation of secure connection."
      },
      {
        question: "Can I use multiple payment methods?",
        answer: "Currently, each order can be paid using one payment method. However, you can use gift cards in combination with another payment method to complete your purchase.",
        additionalInfo: "Multiple gift cards can be combined on a single order."
      },
      {
        question: "When will I be charged?",
        answer: "Your payment method is charged immediately when you place your order. For pre-order items, payment is taken at the time of order placement, not when the item ships.",
        additionalInfo: "If an order is cancelled, refunds are processed within 5-7 business days."
      }
    ],
    delivery: [
      {
        question: "What are your delivery options?",
        answer: "We offer Standard (3-5 days), Express (1-2 days), and Overnight shipping options. Same-day delivery is available in select metro areas. Free standard shipping is available on orders over $99.",
        additionalInfo: "Delivery times are business days and don't include weekends or holidays."
      },
      {
        question: "Do you deliver on weekends?",
        answer: "Saturday delivery is available for Express and Overnight shipping options for an additional fee. Standard shipping orders are not delivered on weekends.",
        additionalInfo: "Sunday delivery is not currently available."
      },
      {
        question: "Can I change my delivery address?",
        answer: "Delivery addresses can be changed before the order ships. Once shipped, contact the carrier directly with your tracking number to request an address change or delivery hold.",
        additionalInfo: "Address changes may incur additional fees from the carrier."
      },
      {
        question: "What if I miss my delivery?",
        answer: "If you miss a delivery, the carrier will leave a notice with instructions. Typically, they'll attempt delivery again the next business day. You can also arrange to pick up the package from a carrier location or schedule a specific delivery time.",
        additionalInfo: "Use the tracking number to manage your delivery preferences with the carrier."
      }
    ],
    account: [
      {
        question: "How do I create an account?",
        answer: "Click 'Sign Up' at the top of any page. You'll need to provide your email address and create a password. Account creation is quick and allows you to save addresses, track orders, and access exclusive member benefits.",
        additionalInfo: "You can also create an account during checkout."
      },
      {
        question: "I forgot my password. What do I do?",
        answer: "Click 'Forgot Password' on the login page. Enter your email address and we'll send you a link to reset your password. The reset link is valid for 24 hours.",
        additionalInfo: "Check your spam folder if you don't see the email within a few minutes."
      },
      {
        question: "How is my personal information protected?",
        answer: "We take privacy seriously. Your personal information is encrypted and stored securely. We never sell your data to third parties. Our privacy policy details how we collect, use, and protect your information.",
        additionalInfo: "You can request to view or delete your personal data at any time."
      },
      {
        question: "Can I delete my account?",
        answer: "Yes, you can delete your account at any time through account settings or by contacting customer service. Please note that deleting your account will remove your order history and saved information permanently.",
        additionalInfo: "We recommend downloading your order history before deleting your account."
      }
    ]
  };

  const displayFaqs = activeCategory === 'all' 
    ? Object.values(allFaqs).flat() 
    : allFaqs[activeCategory] || [];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-16 bg-white">
      <div className="container mx-auto max-w-4xl">
        {displayFaqs.length > 0 ? (
          displayFaqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No FAQs found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

// Still Have Questions Section
const StillHaveQuestions = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-16 bg-[#CCFF00]">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6">
          STILL HAVE QUESTIONS?
        </h2>
        <p className="text-lg text-black mb-8 max-w-2xl mx-auto">
          Can't find the answer you're looking for? Our support team is here to help!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-black text-white px-8 py-4 font-bold hover:bg-gray-900 transition-colors">
            CONTACT SUPPORT
          </button>
          <button className="border-2 border-black text-black px-8 py-4 font-bold hover:bg-black hover:text-white transition-colors">
            LIVE CHAT
          </button>
        </div>
      </div>
    </section>
  );
};


// Main App Component
const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <div className="bg-white">
      <ParticleCursor />
      <FAQHero />
      <FAQCategories 
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <FAQSections activeCategory={activeCategory} />
      <StillHaveQuestions />
    </div>
  );
};

export default FAQ;