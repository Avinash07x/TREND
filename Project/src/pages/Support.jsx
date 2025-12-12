import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Menu, X, ShoppingBag, Search, User, MessageCircle, Phone, Mail, MapPin, Clock, Headphones, Package, CreditCard, RefreshCw, ChevronDown } from 'lucide-react';

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


// Hero Section
const SupportHero = () => {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-16 bg-black text-white">
      <div className="container mx-auto text-center">
        <div className="inline-block bg-[#CCFF00] text-black px-6 py-2 text-sm font-bold mb-6 rotate-2">
          WE'RE HERE TO HELP
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6">SUPPORT CENTER</h1>
        <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          Get instant answers to your questions or connect with our support team
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help..."
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

// Contact Methods
const ContactMethods = () => {
  const methods = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "LIVE CHAT",
      description: "Chat with our support team in real-time",
      action: "START CHAT",
      available: "Available 24/7"
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "PHONE SUPPORT",
      description: "Speak directly with our experts",
      action: "CALL NOW",
      available: "+1 (800) 123-4567"
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "EMAIL SUPPORT",
      description: "Send us a detailed message",
      action: "SEND EMAIL",
      available: "support@trend.com"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "VISIT US",
      description: "Come to our flagship store",
      action: "GET DIRECTIONS",
      available: "Mon-Sat, 9AM-8PM"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-16 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 text-center">GET IN TOUCH</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {methods.map((method, index) => (
            <div key={index} className="border-2 border-gray-200 p-6 hover:border-[#CCFF00] transition-all group">
              <div className="text-[#CCFF00] mb-4 group-hover:scale-110 transition-transform">
                {method.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{method.title}</h3>
              <p className="text-gray-600 mb-4">{method.description}</p>
              <p className="text-sm text-gray-500 mb-4">{method.available}</p>
              <button className="w-full bg-black text-white py-3 font-bold hover:bg-[#CCFF00] hover:text-black transition-colors">
                {method.action}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Support Topics
const SupportTopics = () => {
  const topics = [
    {
      icon: <Package className="w-12 h-12" />,
      title: "ORDER & SHIPPING",
      items: ["Track Your Order", "Shipping Information", "Delivery Times", "International Shipping"]
    },
    {
      icon: <RefreshCw className="w-12 h-12" />,
      title: "RETURNS & EXCHANGES",
      items: ["Return Policy", "How to Return", "Exchange Process", "Refund Status"]
    },
    {
      icon: <CreditCard className="w-12 h-12" />,
      title: "PAYMENT & BILLING",
      items: ["Payment Methods", "Order Invoice", "Promo Codes", "Gift Cards"]
    },
    {
      icon: <Headphones className="w-12 h-12" />,
      title: "PRODUCT SUPPORT",
      items: ["Size Guide", "Product Care", "Warranty Info", "Product Questions"]
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-16 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12">BROWSE HELP TOPICS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white p-6 hover:shadow-lg transition-shadow">
              <div className="text-[#CCFF00] mb-4">
                {topic.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{topic.title}</h3>
              <ul className="space-y-2">
                {topic.items.map((item, idx) => (
                  <li key={idx}>
                    <a href="#" className="text-gray-600 hover:text-[#CCFF00] transition-colors flex items-center gap-2">
                      <span className="w-1 h-1 bg-[#CCFF00] rounded-full"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// FAQ Section
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How long does shipping take?",
      answer: "Standard shipping typically takes 3-5 business days. Express shipping is available for 1-2 business day delivery. International orders may take 7-14 business days depending on your location."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all items in original condition with tags attached. Returns are free for domestic orders. Simply initiate a return from your account and print the prepaid shipping label."
    },
    {
      question: "Do you offer free shipping?",
      answer: "Yes! We offer free standard shipping on all orders over $99. For orders under $99, standard shipping is $7.99."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email. You can also track your order by logging into your account and visiting the 'Orders' section."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Shop Pay."
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-16 bg-white">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 text-center">FREQUENTLY ASKED QUESTIONS</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-2 border-gray-200 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-bold pr-4">{faq.question}</span>
                <ChevronDown className={`w-6 h-6 flex-shrink-0 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a href="#" className="text-[#CCFF00] font-bold text-lg hover:underline">
            VIEW ALL FAQs →
          </a>
        </div>
      </div>
    </section>
  );
};

// Contact Form
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = () => {
    alert('Message sent! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-16 bg-black text-white">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-center">SEND US A MESSAGE</h2>
        <p className="text-gray-300 text-center mb-12">Can't find what you're looking for? Drop us a message and we'll respond within 24 hours.</p>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2">YOUR NAME</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-[#CCFF00]"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">YOUR EMAIL</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-[#CCFF00]"
                placeholder="john@example.com"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-bold mb-2">SUBJECT</label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              className="w-full px-4 py-3 bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-[#CCFF00]"
              placeholder="How can we help?"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold mb-2">MESSAGE</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              rows="6"
              className="w-full px-4 py-3 bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-[#CCFF00] resize-none"
              placeholder="Tell us more about your inquiry..."
            />
          </div>
          
          <button
            onClick={handleSubmit}
            className="w-full bg-[#CCFF00] text-black py-4 font-bold hover:bg-[#b8e600] transition-colors text-lg"
          >
            SEND MESSAGE
          </button>
        </div>
      </div>
    </section>
  );
};

// Main App Component
const Support = () => {
  return (
    <div className="bg-white">
      <ParticleCursor />
      <SupportHero />
      <ContactMethods />
      <SupportTopics />
      <FAQSection />
      <ContactForm />
    </div>
  );
};

export default Support;