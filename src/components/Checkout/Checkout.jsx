import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaLock, FaArrowLeft } from 'react-icons/fa';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { BsCheckCircleFill } from 'react-icons/bs';
import { AuthContext } from '../../provider/AuthProvider/AuthProvider';
import PaymentMethod from '../PaymentMethod/PaymentMethod';
import Swal from 'sweetalert2';
import {
  ShoppingBag,
  MapPin,
  CreditCard,
  Package,
  Truck,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPinned,
  FileText,
  Lock,
} from 'lucide-react';

const Checkout = () => {
  const { cart, user, placeOrder } = useContext(AuthContext);
  const [transactionId, setTransactionId] = useState('');
  const navigate = useNavigate();

  const location = useLocation();
  const {
    cartProducts = [],
    subtotal = 0,
    shippingFee = 0,
    total = 0,
  } = location.state || {};

  const { productDetails, productId, quantity } = cartProducts[0] || {};

  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: user?.email || '',
  });

  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [orderNotes, setOrderNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async e => {
    e.preventDefault();
    setIsProcessing(true);

    const requiredFields = [
      'firstName',
      'lastName',
      'address',
      'city',
      'state',
      'zipCode',
      'phone',
      'email',
    ];
    const missingFields = requiredFields.filter(
      field => !shippingInfo[field]?.trim()
    );

    if (missingFields.length > 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Shipping Info',
        text: 'Please fill in all required shipping fields before placing the order.',
        confirmButtonColor: '#00B4D8',
        background: '#fff',
        customClass: {
          popup: 'rounded-2xl',
        },
      });
      setIsProcessing(false);
      return;
    }

    const orderData = {
      userEmail: user?.email,
      products: cartProducts.map(item => ({
        productId: item.productId,
        name: item.productDetails?.name,
        image: item.productDetails?.image,
        price: item.productDetails?.price,
        quantity: item.quantity,
      })),
      shippingInfo,
      paymentMethod,
      transactionId,
      orderNotes,
      subtotal,
      shippingFee,
      total,
      status: 'pending',
      orderDate: new Date().toISOString(),
    };

    try {
      const res = await placeOrder(orderData);

      if (res.insertedId || res.success) {
        Swal.fire({
          icon: 'success',
          title: 'Order Placed!',
          text: 'Your order has been successfully placed.',
          confirmButtonColor: '#00B4D8',
          background: '#fff',
          customClass: {
            popup: 'rounded-2xl',
          },
        });
        setOrderSuccess(true);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'Something went wrong while placing your order.',
          confirmButtonColor: '#EF4444',
          background: '#fff',
          customClass: {
            popup: 'rounded-2xl',
          },
        });
      }
    } catch (error) {
      console.error('Order submission failed:', error);
      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: 'Unable to submit your order. Please try again later.',
        confirmButtonColor: '#EF4444',
        background: '#fff',
        customClass: {
          popup: 'rounded-2xl',
        },
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Success Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-12 text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full mb-6 shadow-lg">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </div>
              <h1 className="text-4xl font-bold text-white mb-3">
                Order Confirmed!
              </h1>
              <p className="text-xl text-green-50">
                Thank you for your purchase
              </p>
            </div>

            <div className="p-8">
              {/* Success Message */}
              <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 mb-8">
                <p className="text-green-800 text-center text-lg">
                  Your order has been received and is being processed. We'll
                  send you an email confirmation shortly.
                </p>
              </div>

              {/* Order Items */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#040144] mb-6 flex items-center gap-2">
                  <Package className="w-6 h-6 text-[#00B4D8]" />
                  Order Summary
                </h2>
                <div className="space-y-4">
                  {cartProducts.map(item => (
                    <div
                      key={item._id}
                      className="flex justify-between items-center p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-white rounded-lg overflow-hidden shadow-sm">
                          <img
                            src={item.productDetails?.image}
                            alt={item.productDetails?.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#040144] mb-1">
                            {item.productDetails?.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-[#00B4D8]">
                          $
                          {(
                            (item.productDetails?.price || 0) * item.quantity
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Summary */}
              <div className="bg-gradient-to-br from-[#00B4D8]/10 to-[#040144]/10 rounded-2xl p-6 mb-8">
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal:</span>
                    <span className="font-semibold">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping:</span>
                    <span className="font-semibold">
                      {shippingFee === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `$${shippingFee.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="border-t-2 border-gray-300 pt-3 flex justify-between">
                    <span className="text-xl font-bold text-[#040144]">
                      Total:
                    </span>
                    <span className="text-2xl font-bold text-[#00B4D8]">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/orders"
                  className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#00B4D8] to-[#040144] text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Package className="w-5 h-5" />
                  View Order Details
                </Link>
                <Link
                  to="/products"
                  className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-gray-200 text-[#040144] rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#040144] to-[#00B4D8] py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white hover:text-gray-200 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Cart</span>
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
            <ShoppingBag className="w-8 h-8" />
            Secure Checkout
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4 md:gap-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-[#00B4D8] to-[#040144] rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <span className="hidden sm:inline font-semibold text-[#040144]">
                Shipping
              </span>
            </div>
            <div className="w-12 md:w-24 h-1 bg-gradient-to-r from-[#00B4D8] to-[#040144]"></div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-[#00B4D8] to-[#040144] rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <span className="hidden sm:inline font-semibold text-[#040144]">
                Payment
              </span>
            </div>
            <div className="w-12 md:w-24 h-1 bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold">
                3
              </div>
              <span className="hidden sm:inline font-medium text-gray-500">
                Confirm
              </span>
            </div>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-7 space-y-6 mb-8 lg:mb-0">
            {/* Shipping Information */}
            <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-[#00B4D8]/10 to-[#040144]/10 px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-[#040144] flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-[#00B4D8]" />
                  Shipping Information
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Please provide your delivery details
                </p>
              </div>
              <div className="p-6">
                <div className="space-y-5">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="flex items-center gap-2 text-sm font-semibold text-[#040144] mb-2"
                      >
                        <User className="w-4 h-4 text-[#00B4D8]" />
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={shippingInfo.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00B4D8] focus:outline-none transition-colors"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="flex items-center gap-2 text-sm font-semibold text-[#040144] mb-2"
                      >
                        <User className="w-4 h-4 text-[#00B4D8]" />
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={shippingInfo.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00B4D8] focus:outline-none transition-colors"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label
                      htmlFor="address"
                      className="flex items-center gap-2 text-sm font-semibold text-[#040144] mb-2"
                    >
                      <MapPinned className="w-4 h-4 text-[#00B4D8]" />
                      Street Address *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00B4D8] focus:outline-none transition-colors"
                      placeholder="123 Main Street, Apt 4B"
                      required
                    />
                  </div>

                  {/* City, State, Zip */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-semibold text-[#040144] mb-2"
                      >
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00B4D8] focus:outline-none transition-colors"
                        placeholder="New York"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="state"
                        className="block text-sm font-semibold text-[#040144] mb-2"
                      >
                        State *
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={shippingInfo.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00B4D8] focus:outline-none transition-colors"
                        placeholder="NY"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="zipCode"
                        className="block text-sm font-semibold text-[#040144] mb-2"
                      >
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00B4D8] focus:outline-none transition-colors"
                        placeholder="10001"
                        required
                      />
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="phone"
                        className="flex items-center gap-2 text-sm font-semibold text-[#040144] mb-2"
                      >
                        <Phone className="w-4 h-4 text-[#00B4D8]" />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00B4D8] focus:outline-none transition-colors"
                        placeholder="+1 (555) 000-0000"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="flex items-center gap-2 text-sm font-semibold text-[#040144] mb-2"
                      >
                        <Mail className="w-4 h-4 text-[#00B4D8]" />
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={shippingInfo.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00B4D8] focus:outline-none transition-colors"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-[#00B4D8]/10 to-[#040144]/10 px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-[#040144] flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-[#00B4D8]" />
                  Payment Method
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Select your preferred payment option
                </p>
              </div>
              <div className="p-6">
                <PaymentMethod
                  selectedMethod={paymentMethod}
                  onSelectMethod={setPaymentMethod}
                  onTransactionIdChange={setTransactionId}
                />
              </div>
            </div>

            {/* Order Notes */}
            <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-[#00B4D8]/10 to-[#040144]/10 px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-[#040144] flex items-center gap-2">
                  <FileText className="w-6 h-6 text-[#00B4D8]" />
                  Additional Information
                </h2>
              </div>
              <div className="p-6">
                <label
                  htmlFor="orderNotes"
                  className="block text-sm font-semibold text-[#040144] mb-2"
                >
                  Order Notes (Optional)
                </label>
                <textarea
                  id="orderNotes"
                  rows="4"
                  value={orderNotes}
                  onChange={e => setOrderNotes(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00B4D8] focus:outline-none transition-colors resize-none"
                  placeholder="Add any special instructions for your order (e.g., delivery preferences, gift message)"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white shadow-xl rounded-2xl sticky top-24 border border-gray-100">
              <div className="bg-gradient-to-r from-[#040144] to-[#00B4D8] px-6 py-4 rounded-t-2xl">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Package className="w-6 h-6" />
                  Order Summary
                </h2>
              </div>
              <div className="p-6">
                {/* Cart Items */}
                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                  {cartProducts.map(item => (
                    <div
                      key={item._id}
                      className="flex gap-4 p-3 bg-gray-50 rounded-xl"
                    >
                      <div className="w-16 h-16 bg-white rounded-lg overflow-hidden shadow-sm flex-shrink-0">
                        <img
                          src={item.productDetails?.image}
                          alt={item.productDetails?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[#040144] text-sm line-clamp-2 mb-1">
                          {item.productDetails?.name}
                        </h3>
                        <p className="text-xs text-gray-500 mb-2">
                          Qty: {item.quantity}
                        </p>
                        <p className="text-lg font-bold text-[#00B4D8]">
                          $
                          {(
                            (item.productDetails?.price || 0) * item.quantity
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pricing Details */}
                <div className="space-y-3 py-4 border-t-2 border-gray-200">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span className="font-semibold">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-gray-400" />
                      <span>Shipping</span>
                    </div>
                    <span className="font-semibold">
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

                <div className="flex justify-between items-center py-4 border-t-2 border-gray-200">
                  <span className="text-xl font-bold text-[#040144]">
                    Total
                  </span>
                  <span className="text-3xl font-bold text-[#00B4D8]">
                    ${total.toFixed(2)}
                  </span>
                </div>

                {/* Place Order Button */}
                <button
                  onClick={handleSubmitOrder}
                  disabled={isProcessing}
                  className="w-full mt-4 flex items-center justify-center gap-3 bg-gradient-to-r from-[#00B4D8] to-[#040144] text-white px-6 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      Place Secure Order
                    </>
                  )}
                </button>

                {/* Security Badge */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <ShieldCheck className="w-5 h-5 text-green-600" />
                    <span>256-bit SSL Secure Encryption</span>
                  </div>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    Your payment information is safe and secure
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
