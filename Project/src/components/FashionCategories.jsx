

const FashionCategories = ({ categories }) => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-16 bg-black text-white">
      <div className="container mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">FASHION CATEGORIES</h2>
        <p className="text-lg sm:text-xl mb-8 sm:mb-12">TOPS & T-SHIRTS</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category, index) => (
            <div key={index} className="relative h-60 sm:h-72 lg:h-80 overflow-hidden group cursor-pointer">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 flex items-end p-4 sm:p-6">
                <h3 className="text-base sm:text-lg lg:text-xl font-bold">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FashionCategories;