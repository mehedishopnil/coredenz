import { FaStar, FaRegHeart, FaHeart, FaShoppingCart } from "react-icons/fa";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider/AuthProvider";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);


  // Access user and addToCart function from AuthContext
  const { user, addToCart } = useContext(AuthContext);
  





  // Get the first image from the images array
  const productImage = product?.images?.[0] || "";
  const discount = product?.discount || 0;
  const hasDiscount = discount > 0;
  const discountedPrice = hasDiscount
    ? (product.price * (1 - discount / 100)).toFixed(2)
    : null;

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleAddToCart = async (e) => {
  e.preventDefault();
  e.stopPropagation();

  if (user?.email) {
    // Registered user - send to backend
    if (typeof addToCart === "function") {
      try {
        await addToCart(product.id, 1); // ✅ updated to match the context function
        setIsAddedToCart(true);
        toast.success('Added to cart!');
      } catch (err) {
        toast.error('Failed to add to cart');
      }
    } else {
      toast.error('Add to cart function is not available.');
    }
  } else {
    // Guest user - store in localStorage
    const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');

    const existingIndex = guestCart.findIndex(item => item.id === product.id);

    if (existingIndex >= 0) {
      guestCart[existingIndex].quantity += 1;
    } else {
      guestCart.push({
        id: product.id,
        name: product.name,
        price: hasDiscount ? discountedPrice : product.price,
        image: productImage,
        quantity: 1
      });
    }

    localStorage.setItem('guestCart', JSON.stringify(guestCart));
    toast.success('Added to cart!');
  }
};

  

  return (
    <div
      className="relative bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 p-2 hover:shadow-md border border-gray-100 hover:border-gray-200 flex flex-col"
      style={{ minHeight: 370 }}
    >
      <Link
        to={{
          pathname: `/single-product/${product.id}`,
        }}
        className="block flex-1"
        style={{ minHeight: 0 }}
      >
        {/* Product Image Container */}
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-50">
          <img
            src={productImage}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2 z-10">
            {product.isNew && (
              <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                New
              </span>
            )}
            {hasDiscount && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                -{discount}%
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 z-10 ${
              isWishlisted
                ? "bg-pink-500 text-white shadow"
                : "bg-white/90 text-gray-700 shadow hover:bg-white"
            }`}
            onClick={handleWishlistClick}
            aria-label={
              isWishlisted ? "Remove from wishlist" : "Add to wishlist"
            }
          >
            {isWishlisted ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>

        {/* Product Details */}
        <div className="p-3 flex flex-col flex-1">
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className="font-medium text-gray-800 line-clamp-2 text-sm md:text-base flex-1">
              {product.name}
            </h3>
            <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full min-w-[50px] justify-center">
              <FaStar className="text-yellow-400 text-xs" />
              <span className="text-xs text-gray-600">
                {product.rating || "4.5"}
              </span>
            </div>
          </div>

          <p className="text-gray-500 text-xs mb-3 line-clamp-2 flex-1">
            {product.description}
          </p>

          <div className="flex items-end justify-between mt-auto">
            <div className="flex items-center gap-2">
              {hasDiscount ? (
                <>
                  <span className="font-bold text-gray-800 text-lg">
                    ${discountedPrice}
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
          </div>
        </div>
      </Link>

      {/* Add to Cart Button - Always at bottom, fits card */}
      <div className="px-3 pb-3 pt-0">
        <button
          className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors duration-300 shadow"
          onClick={handleAddToCart}
        >
          <FaShoppingCart className="text-sm" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;