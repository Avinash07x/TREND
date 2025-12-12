

const ProductCard = ({ product }) => {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden bg-gray-100 mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 sm:h-80 lg:h-96 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.tag && (
          <div className="absolute top-4 left-4 bg-[#CCFF00] text-black px-3 py-1 text-xs sm:text-sm font-bold">
            {product.tag}
          </div>
        )}
        <button className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-black px-4 sm:px-6 py-2 text-sm sm:text-base font-bold opacity-0 group-hover:opacity-100 transition-opacity">
          ADD TO CART
        </button>
      </div>
      <h3 className="text-base sm:text-lg font-semibold mb-2">{product.name}</h3>
      <div className="flex items-center gap-2">
        <span className="text-lg sm:text-xl font-bold">${product.price}</span>
        {product.originalPrice && (
          <span className="text-sm sm:text-base text-gray-400 line-through">${product.originalPrice}</span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;