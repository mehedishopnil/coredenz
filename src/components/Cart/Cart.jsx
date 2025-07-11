import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider/AuthProvider";
import {
  FaPlus,
  FaMinus,
  FaTrash,
  FaArrowRight,
  FaShoppingBag,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";

const Cart = () => {
  const { cart, setCart, removeFromCart, updateCartItemQuantity, products } =
    useContext(AuthContext);
  const [cartProducts, setCartProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  // Match cart items with products data
  useEffect(() => {
  const fetchCartProducts = () => {
    setIsLoading(true);
    try {
      const matchedItems = cart.map((item) => {
        const matchedProduct = products.find((p) => p.id === item.productId);
        
        // Preserve existing productDetails if available
        const existingItem = cartProducts.find(ci => ci.productId === item.productId);
        const existingDetails = existingItem?.productDetails || {};

        if (matchedProduct) {
          return {
            ...item,
            productDetails: {
              ...existingDetails,
              ...matchedProduct,
              image: matchedProduct.images?.[0] || existingDetails.image || "https://via.placeholder.com/150"
            }
          };
        }
        return {
          ...item,
          productDetails: existingDetails || {
            name: "Product unavailable",
            price: 0,
            image: "https://via.placeholder.com/150",
            specification: {}
          }
        };
      });

      setCartProducts(matchedItems);
    } catch (error) {
      console.error("Error fetching cart products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (products.length) {
    fetchCartProducts();
  }
}, [cart, products]); // Removed cartProducts from dependencies to prevent loops

const handleQuantityChange = async (productId, delta) => {
  if (isProcessing) return;
  setIsProcessing(true);

  try {
    // Find current item for rollback
    const currentItem = cart.find(item => item.productId === productId);
    if (!currentItem) {
      throw new Error("Item not found in cart");
    }

    // Calculate new quantity
    const newQuantity = currentItem.quantity + delta;
    if (newQuantity < 1) {
      setIsProcessing(false);
      return;
    }

    // Optimistic update for both cart and cartProducts
    const updatedCart = cart.map(item => 
      item.productId === productId ? { ...item, quantity: newQuantity } : item
    );
    
    setCart(updatedCart);
    
    // Update cartProducts based on the new cart state
    setCartProducts(prev => 
      prev.map(item => {
        if (item.productId === productId) {
          const matchedProduct = products.find(p => p.id === productId);
          return {
            ...item,
            quantity: newQuantity,
            productDetails: {
              ...item.productDetails,
              ...(matchedProduct || {})
            }
          };
        }
        return item;
      })
    );

    // Update backend
    await updateCartItemQuantity(productId, newQuantity);

  } catch (error) {
    console.error("Quantity update failed:", error);
    // Revert to previous cart state
    setCart(prev => [...prev]);
    setCartProducts(prev => [...prev]);
  } finally {
    setIsProcessing(false);
  }
};

const handleRemoveItem = async (productId) => {
  if (isProcessing) return;
  setIsProcessing(true);

  try {
    // Optimistic UI update - remove from local state first
    setCartProducts(prev => prev.filter(item => item.productId !== productId));
    setCart(prev => prev.filter(item => item.productId !== productId));

    // Update backend
    const itemToRemove = cart.find(item => item.productId === productId);
    if (itemToRemove) {
      await removeFromCart(itemToRemove._id);
    }
  } catch (error) {
    console.error("Error removing item:", error);
    // Revert changes if backend removal fails
    const itemToRestore = cart.find(item => item.productId === productId);
    if (itemToRestore) {
      setCartProducts(prev => [...prev, itemToRestore]);
      setCart(prev => [...prev, itemToRestore]);
    }
  } finally {
    setIsProcessing(false);
  }
};





  // Calculate totals
  const subtotal = cartProducts.reduce(
    (total, item) => total + item.productDetails.price * item.quantity,
    0
  );
  const shippingFee = subtotal > 100 ? 0 : 10;
  const total = subtotal + shippingFee;

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Loading message="Loading your cart..." />
      </div>
    );
  }

  if (!isLoading && cartProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="flex flex-col items-center">
          <FaShoppingBag className="text-gray-400 text-6xl mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-4">
            Looks like you haven’t added anything to your cart yet.
          </p>
          <Link
            to="/products"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }
    if (isProcessing) {
        return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Loading message="Processing your request..." />
        </div>
        );
    }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Your Shopping Cart
      </h1>

      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        {/* Cart Items - Mobile */}
        <div className="lg:hidden space-y-4 mb-8">
          {cartProducts.map((item) => (
            <div
              key={item._id}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
            >
              <div className="flex space-x-4">
                <div className="flex-shrink-0 w-20 h-20">
                  <img
                    src={item.productDetails.image}
                    alt={item.productDetails.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">
                    {item.productDetails.name}
                  </h3>
                  {item.productDetails.specification?.color && (
                    <p className="text-sm text-gray-500 mt-1">
                      Color: {item.productDetails.specification.color}
                    </p>
                  )}
                  <p className="text-lg font-semibold mt-2">
                    ${item.productDetails.price.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => handleQuantityChange(item.productId, -1)}
                    disabled={
                      isProcessing ||
                      item.productDetails.name === "Product unavailable"
                    }
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                  >
                    <FaMinus className="w-3 h-3" />
                  </button>
                  <span className="px-3 py-1 text-gray-900">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(item.productId, 1)}
                    disabled={
                      isProcessing ||
                      item.productDetails.name === "Product unavailable"
                    }
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                  >
                    <FaPlus className="w-3 h-3" />
                  </button>
                </div>

                <button
                  onClick={() => handleRemoveItem(item.productId)}
                  disabled={isProcessing}
                  className="text-red-500 hover:text-red-700 ml-4"
                >
                  <FaTrash className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-3 text-right font-medium">
                Total: ${(item.productDetails.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Cart Items - Desktop */}
        <div className="hidden lg:block lg:col-span-8">
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="grid grid-cols-12 bg-gray-50 px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">
              <div className="col-span-5">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            <div className="divide-y divide-gray-200">
              {cartProducts.map((item) => (
                <div
                  key={item._id}
                  className="grid grid-cols-12 px-6 py-4 items-center"
                >
                  <div className="col-span-5 flex items-center space-x-4">
                    <div className="flex-shrink-0 w-16 h-16">
                      <img
                        src={item.productDetails.image}
                        alt={item.productDetails.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-gray-900">
                        {item.productDetails.name}
                      </h3>
                      {item.productDetails.specification?.color && (
                        <p className="text-sm text-gray-500 mt-1">
                          Color: {item.productDetails.specification.color}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="col-span-2 text-center text-gray-900">
                    ${item.productDetails.price.toFixed(2)}
                  </div>

                  <div className="col-span-3 flex justify-center">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        onClick={() => handleQuantityChange(item.productId, -1)}
                        disabled={
                          isProcessing ||
                          item.productDetails.name === "Product unavailable"
                        }
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                      >
                        <FaMinus className="w-3 h-3" />
                      </button>
                      <span className="px-3 py-1 text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.productId, 1)}
                        disabled={
                          isProcessing ||
                          item.productDetails.name === "Product unavailable"
                        }
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                      >
                        <FaPlus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div className="col-span-2 flex items-center justify-end space-x-4">
                    <span className="font-medium">
                      ${(item.productDetails.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleRemoveItem(item.productId)}
                      disabled={isProcessing}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <FaTrash className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4 mt-6 lg:mt-0">
          <div className="bg-white shadow-sm rounded-lg p-6 sticky top-4">
            <h2 className="text-lg font-medium text-gray-900 mb-6">
              Order Summary
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Subtotal (
                  {cartProducts.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                  items)
                </span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">${shippingFee.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between">
                <span className="text-lg font-medium">Total</span>
                <span className="text-lg font-bold">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/checkout"
                className="w-full flex justify-between items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                disabled={
                  isProcessing ||
                  cartProducts.some(
                    (item) => item.productDetails.name === "Product unavailable"
                  )
                }
              >
                <span>Proceed to Checkout</span>
                <FaArrowRight className="ml-2" />
              </Link>
            </div>

            <div className="mt-4 text-center text-sm text-gray-500">
              <p>
                or{" "}
                <Link
                  to="/products"
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  continue shopping
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
