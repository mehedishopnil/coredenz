import { FaStar, FaRegHeart, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Get the first image from the images array
  const productImage = product?.images?.[0] || '';

  return (
    <div 
      className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md border border-gray-100 hover:border-gray-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={productImage} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {product.isNew && (
            <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              New
            </span>
          )}
          {product.discount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              -{product.discount}%
            </span>
          )}
        </div>
        
        {/* Wishlist Button */}
        <button 
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 ${
            isWishlisted 
              ? 'bg-pink-500 text-white' 
              : 'bg-white/90 text-gray-700 shadow-sm hover:bg-white'
          }`}
          onClick={() => setIsWishlisted(!isWishlisted)}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isWishlisted ? <FaHeart /> : <FaRegHeart />}
        </button>

        {/* Quick Add to Cart (Desktop hover effect) */}
        {isHovered && (
          <button className="absolute bottom-0 left-0 right-0 bg-blue-600 text-white py-2 font-medium flex items-center justify-center gap-2 transition-all duration-300 hover:bg-blue-700">
            <FaShoppingCart /> Quick Add
          </button>
        )}
      </div>
      
      {/* Product Details */}
      <div className="p-4">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="font-medium text-gray-800 line-clamp-2 text-sm md:text-base">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full min-w-[50px] justify-center">
            <FaStar className="text-yellow-400 text-xs" />
            <span className="text-xs text-gray-600">{product.rating || '4.5'}</span>
          </div>
        </div>
        
        <p className="text-gray-500 text-xs mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            {product.discount > 0 ? (
              <>
                <span className="font-bold text-gray-800 text-lg">
                  ${(product.price * (1 - product.discount/100)).toFixed(2)}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  ${product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="font-bold text-gray-800 text-lg">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          
          {/* Add to Cart Button - Responsive */}
          <button className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors duration-300 md:mt-2">
            <FaShoppingCart className="text-sm" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;