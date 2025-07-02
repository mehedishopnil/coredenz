import { FaStar, FaRegHeart, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Get the first image from the images array, fallback to empty string if not available
  const productImage = Array.isArray(product.images) && product.images.length > 0
    ? product.images[0]
    : '';

  return (
    <div 
      className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image with Hover Effect */}
      <div className="relative overflow-hidden">
        <img 
          src={productImage} 
          alt={product.name}
          className="w-full h-48 sm:h-56 object-cover transition-transform duration-500 hover:scale-105"
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
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 ${isWishlisted ? 'bg-pink-500 text-white' : 'bg-white text-gray-700 shadow-md'}`}
          onClick={() => setIsWishlisted(!isWishlisted)}
        >
          {isWishlisted ? <FaHeart /> : <FaRegHeart />}
        </button>

        
      </div>
      <div className="flex flex-col items-center p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-800 line-clamp-1">{product.name}</h3>
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-400" />
            <span className="text-sm text-gray-600">{product.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {product.discount > 0 ? (
              <>
                <span className="font-bold text-gray-800">${(product.price * (1 - product.discount/100)).toFixed(2)}</span>
                <span className="text-sm text-gray-400 line-through">${product.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="font-bold text-gray-800">${product.price.toFixed(2)}</span>
            )}
          </div>
          
          {/* Mobile Add to Cart (Always visible on mobile) */}
          <button className="md:hidden p-2 text-blue-600 rounded-full  hover:bg-blue-50">
            <FaShoppingCart />
          </button>
        </div>

        {/* Desktop Add to Cart (Always  visible on desktop) */}
        <div className="hidden md:block ">
          <button className="flex justify-center items-center gap-2 py-2 px-4 text-blue-600 rounded-full bg-blue-100 hover:border-blue-300 hover:bg-blue-200 transition-colors duration-300">
            <FaShoppingCart /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;