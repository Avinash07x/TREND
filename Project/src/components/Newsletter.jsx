import React, { useState } from 'react';


const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`);
    setEmail('');
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-16 bg-[#CCFF00]">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4">
          STAY IN THE LOOP
        </h2>
        <p className="text-lg sm:text-xl text-black mb-8 max-w-2xl mx-auto">
          Subscribe to get exclusive access to new collections and special offers
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-6 py-4 text-lg focus:outline-none focus:ring-4 focus:ring-black"
          />
          <button
            onClick={handleSubmit}
            className="bg-black text-white px-8 py-4 font-bold hover:bg-gray-900 transition-colors text-lg"
          >
            SUBSCRIBE
          </button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;