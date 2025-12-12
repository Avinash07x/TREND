
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';


const HotSellers = ({ products }) => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-16">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">HOT SELLERS</h2>
          <div className="flex gap-2">
            <button className="w-10 h-10 sm:w-12 sm:h-12 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors">
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button className="w-10 h-10 sm:w-12 sm:h-12 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors">
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {products.slice(0, 3).map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HotSellers;