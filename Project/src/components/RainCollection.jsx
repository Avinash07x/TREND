

const RainCollection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-16">
      <div className="container mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12">NEW RAIN COLLECTION</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="relative h-64 sm:h-80 lg:h-[600px] overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80"
              alt="Women's Raincoat"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 bg-white p-4 sm:p-6">
              <h3 className="text-xl sm:text-2xl font-bold mb-2">WOMEN'S RAINCOAT</h3>
              <p className="text-2xl sm:text-3xl font-bold mb-4">
                $800 <span className="text-base sm:text-lg line-through text-gray-400">$600</span>
              </p>
            </div>
          </div>
          <div className="relative h-64 sm:h-80 lg:h-[600px] overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80"
              alt="Rain Jackets"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-4 sm:top-8 right-4 sm:right-8 bg-[#CCFF00] text-black p-3 sm:p-4 rotate-3">
              <p className="text-xs sm:text-sm font-bold">RAIN JACKETS</p>
              <p className="text-xl sm:text-2xl font-bold">
                $400 <span className="text-xs sm:text-sm">$600</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RainCollection;