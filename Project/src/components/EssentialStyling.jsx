import ProductCard from "./ProductCard";


const EssentialStyling = ({ products }) => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-16">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 gap-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">ESSENTIAL STYLING</h2>
          <button className="text-[#CCFF00] font-semibold hover:underline text-sm sm:text-base">
            VIEW ALL →
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EssentialStyling;