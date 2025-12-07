import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider/AuthProvider';
import {
  FaPlus,
  FaMinus,
  FaTrash,
  FaArrowRight,
  FaShoppingBag,
} from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Package,
  Truck,
  ShieldCheck,
  Tag,
} from 'lucide-react';

const Cart = () => {
  const {
    user,
    cart,
    setCart,
    removeFromCart,
    updateCartItemQuantity,
    products,
    addToCart,
  } = useContext(AuthContext);
  const [cartProducts, setCartProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  // Match cart items with products data
  useEffect(() => {
    const fetchCartProducts = () => {
      setIsLoading(true);
      try {
        let activeCart = [];

        if (user?.email) {
          activeCart = cart;
        } else {
          const guestCart = JSON.parse(
            localStorage.getItem('guestCart') || '[]'
          );
          activeCart = guestCart.map(item => ({
            ...item,
            productId: item.id || item.productId,
            _id: item.id || item.productId,
          }));
        }

        const matchedItems = activeCart.map(item => {
          const matchedProduct = products.find(p => p.id === item.productId);
          const existingDetails = item?.productDetails || {};

          if (matchedProduct) {
            return {
              ...item,
              productDetails: {
                ...existingDetails,
                ...matchedProduct,
                image:
                  matchedProduct.images?.[0] ||
                  existingDetails.image ||
                  'https://via.placeholder.com/150',
              },
            };
          }
          return {
            ...item,
            productDetails: existingDetails || {
              name: 'Product unavailable',
              price: 0,
              image: 'https://via.placeholder.com/150',
              specification: {},
            },
          };
        });

        setCartProducts(matchedItems);
      } catch (error) {
        console.error('Error loading cart:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (products.length) {
      fetchCartProducts();
    }
  }, [cart, products, user]);

  const handleQuantityChange = async (productId, delta) => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      const currentItem = cartProducts.find(
        item => item.productId === productId
      );
      if (!currentItem) throw new Error('Item not found');

      const newQuantity = currentItem.quantity + delta;
      if (newQuantity < 1) return;

      if (user?.email) {
        await updateCartItemQuantity(productId, newQuantity);
      } else {
        const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
        const updatedCart = guestCart.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        );
        localStorage.setItem('guestCart', JSON.stringify(updatedCart));
      }

      setCartProducts(prev =>
        prev.map(item =>
          item.productId === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } catch (err) {
      console.error('Quantity update failed:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemoveItem = async productId => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      const itemToRemove = cartProducts.find(
        item => item.productId === productId
      );
      const cartItemId = itemToRemove?._id;

      if (cartItemId) {
        await removeFromCart(cartItemId);
      }

      setCartProducts(prev =>
        prev.filter(item => item.productId !== productId)
      );
    } catch (err) {
      console.error('Remove failed:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    const transferGuestCartToBackend = async () => {
      const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');

      if (
        guestCart.length > 0 &&
        user?.email &&
        typeof addToCart === 'function'
      ) {
        try {
          for (const item of guestCart) {
            const payload = {
              productId: item.productId || item.id,
              quantity: item.quantity,
              specification: item?.specification || {},
            };
            await addToCart(payload);
          }
          localStorage.removeItem('guestCart');
        } catch (err) {
          console.error('Failed to transfer guest cart:', err);
        }
      }
    };

    transferGuestCartToBackend();
  }, [user, addToCart]);

  // Calculate totals
  const subtotal = cartProducts.reduce(
    (total, item) => total + item.productDetails.price * item.quantity,
    0
  );
  const shippingFee = subtotal > 100 ? 0 : 10;
  const total = subtotal + shippingFee;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#00B4D8] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (!isLoading && cartProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[#00B4D8] to-[#040144] rounded-full mb-6">
              <ShoppingCart className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-[#040144] mb-4">
              Your Cart is Empty
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              Looks like you haven't added anything to your cart yet. Start
              shopping to fill it up!
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00B4D8] to-[#040144] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Package className="w-5 h-5" />
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#040144] to-[#00B4D8] py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <ShoppingCart className="w-8 h-8 text-white" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Shopping Cart
            </h1>
          </div>
          <p className="text-gray-200 text-lg">
            {cartProducts.length} {cartProducts.length === 1 ? 'item' : 'items'}{' '}
            in your cart
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-8 space-y-4 mb-8 lg:mb-0">
            {cartProducts.map(item => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="p-4 md:p-6">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden bg-gray-100">
                        <img
                          src={item.productDetails.image}
                          alt={item.productDetails.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-[#040144] line-clamp-2">
                          {item.productDetails.name}
                        </h3>
                        <button
                          onClick={() => handleRemoveItem(item.productId)}
                          disabled={isProcessing}
                          className="ml-2 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 disabled:opacity-50"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      {item.productDetails.specification?.color && (
                        <div className="flex items-center gap-2 mb-3">
                          <Tag className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            Color: {item.productDetails.specification.color}
                          </span>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
                        {/* Price */}
                        <div>
                          <p className="text-2xl font-bold text-[#00B4D8]">
                            ${Number(item.productDetails.price || 0).toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-500">per item</p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center bg-gray-50 rounded-xl border-2 border-gray-200">
                            <button
                              onClick={() =>
                                handleQuantityChange(item.productId, -1)
                              }
                              disabled={
                                isProcessing ||
                                item.quantity <= 1 ||
                                item.productDetails.name ===
                                  'Product unavailable'
                              }
                              className="p-3 text-gray-600 hover:bg-gray-100 rounded-l-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-6 py-3 text-lg font-semibold text-[#040144] min-w-[60px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleQuantityChange(item.productId, 1)
                              }
                              disabled={
                                isProcessing ||
                                item.productDetails.name ===
                                  'Product unavailable'
                              }
                              className="p-3 text-gray-600 hover:bg-gray-100 rounded-r-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Item Total */}
                          <div className="text-right">
                            <p className="text-sm text-gray-500 mb-1">
                              Subtotal
                            </p>
                            <p className="text-xl font-bold text-[#040144]">
                              $
                              {(
                                Number(item.productDetails.price || 0) *
                                item.quantity
                              ).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Benefits Bar */}
            <div className="mt-8 bg-gradient-to-r from-[#00B4D8]/10 to-[#040144]/10 rounded-2xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                    <Truck className="w-6 h-6 text-[#00B4D8]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#040144]">
                      Free Shipping
                    </p>
                    <p className="text-sm text-gray-600">Orders over $100</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-[#00B4D8]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#040144]">
                      Secure Payment
                    </p>
                    <p className="text-sm text-gray-600">100% Protected</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                    <Package className="w-6 h-6 text-[#00B4D8]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#040144]">Easy Returns</p>
                    <p className="text-sm text-gray-600">30-Day Policy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl shadow-lg p-6 lg:sticky lg:top-24 border border-gray-100">
              <h2 className="text-2xl font-bold text-[#040144] mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">
                    Subtotal (
                    {cartProducts.reduce((acc, item) => acc + item.quantity, 0)}{' '}
                    items)
                  </span>
                  <span className="text-lg font-semibold text-[#040144]">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Shipping</span>
                  </div>
                  <span className="text-lg font-semibold text-[#040144]">
                    {shippingFee === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `$${shippingFee.toFixed(2)}`
                    )}
                  </span>
                </div>

                {subtotal < 100 && subtotal > 0 && (
                  <div className="bg-[#00B4D8]/10 border border-[#00B4D8]/20 rounded-xl p-3">
                    <p className="text-sm text-[#040144]">
                      Add{' '}
                      <span className="font-bold">
                        ${(100 - subtotal).toFixed(2)}
                      </span>{' '}
                      more for FREE shipping!
                    </p>
                  </div>
                )}
              </div>

              <div className="border-t-2 border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-[#040144]">
                    Total
                  </span>
                  <span className="text-3xl font-bold text-[#00B4D8]">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  if (user) {
                    window.location.href = '/checkout';
                  } else {
                    window.location.href = `/sign-in?redirect=${encodeURIComponent(
                      window.location.pathname
                    )}`;
                  }
                }}
                disabled={
                  isProcessing ||
                  cartProducts.some(
                    item => item.productDetails.name === 'Product unavailable'
                  )
                }
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#00B4D8] to-[#040144] text-white px-6 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="mt-6 text-center">
                <Link
                  to="/products"
                  className="text-[#00B4D8] hover:text-[#040144] font-medium text-sm transition-colors inline-flex items-center gap-2"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  Continue Shopping
                </Link>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 text-center">
                  Secure checkout powered by industry-leading encryption
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
