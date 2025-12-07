import { useContext } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import { AuthContext } from '../../provider/AuthProvider/AuthProvider';
import { BsFillLaptopFill } from 'react-icons/bs';
import { MdDevicesOther } from 'react-icons/md';
import {
  TrendingUp,
  Zap,
  Shield,
  Truck,
  Award,
  ArrowRight,
  Sparkles,
  Star,
} from 'lucide-react';
import coverImg from '../../assets/images/CoreDenz-facebook-banner.jpg';

const Home = () => {
  const { products, loading, error } = useContext(AuthContext);

  // Category data with name and corresponding icon
  const Categories = [
    {
      name: 'Laptop',
      icon: <BsFillLaptopFill className="text-3xl" />,
      gradient: 'from-[#00B4D8] to-blue-500',
      count: '50+ Products',
    },
    {
      name: 'Gadgets',
      icon: <MdDevicesOther className="text-3xl" />,
      gradient: 'from-[#040144] to-purple-600',
      count: '100+ Products',
    },
  ];

  const features = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'On orders over $50',
      color: 'text-[#00B4D8]',
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: '100% secure checkout',
      color: 'text-[#040144]',
    },
    {
      icon: Award,
      title: 'Best Quality',
      description: 'Premium products',
      color: 'text-[#00B4D8]',
    },
    {
      icon: Zap,
      title: 'Fast Delivery',
      description: '2-3 business days',
      color: 'text-[#040144]',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      review: 'Amazing products and fast delivery! Highly recommend.',
      rating: 5,
      avatar: 'SJ',
    },
    {
      name: 'Mike Chen',
      review: 'Great customer service and quality products.',
      rating: 5,
      avatar: 'MC',
    },
    {
      name: 'Emma Wilson',
      review: 'Best online shopping experience ever!',
      rating: 5,
      avatar: 'EW',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Banner Section */}
      <section className="relative w-full h-[400px] md:h-[450px] lg:h-[550px] overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${coverImg})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#040144]/90 via-[#040144]/70 to-transparent" />

        {/* Hero Content */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 flex items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#00B4D9]/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-[#00B4D8]/30">
              <Sparkles className="w-4 h-4 text-[#00B4D8]" />
              <span className="text-white text-sm font-medium">
                New Arrivals Available
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Discover Your
              <span className="block text-[#00B4D8]">Perfect Tech</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-xl">
              Explore premium laptops, cutting-edge gadgets, and innovative
              solutions at unbeatable prices
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="group inline-flex items-center justify-center gap-2 bg-[#00B4D8] hover:bg-[#00B4D8]/90 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Shop Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-[#00B4D8]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-40 w-96 h-96 bg-[#040144]/30 rounded-full blur-3xl"></div>
      </section>

      {/* Features Bar */}
      <section className="relative -mt-16 z-20 max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div
                  className={`w-14 h-14 ${feature.color} bg-gray-50 rounded-full flex items-center justify-center mb-3`}
                >
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories Section */}
      <section className="max-w-7xl mx-auto py-20 px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#00B4D8]/10 px-4 py-2 rounded-full mb-4">
            <TrendingUp className="w-4 h-4 text-[#00B4D8]" />
            <span className="text-[#040144] text-sm font-semibold">
              Popular Categories
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#040144] mb-4">
            Shop by <span className="text-[#00B4D8]">Category</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover amazing products organized just for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {Categories.map((category, index) => (
            <Link
              key={index}
              to={`/single-category/${category.name.toLowerCase()}`}
              className="group relative overflow-hidden bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              ></div>

              <div className="relative p-10">
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}
                >
                  <div className="text-white text-4xl">{category.icon}</div>
                </div>

                <h3 className="text-3xl font-bold text-[#040144] mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-500 mb-6">{category.count}</p>

                <div className="flex items-center gap-2 text-[#00B4D8] font-semibold group-hover:gap-4 transition-all">
                  Explore Collection
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>

              {/* Decorative circle */}
              <div
                className={`absolute -bottom-12 -right-12 w-40 h-40 bg-gradient-to-br ${category.gradient} rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
              ></div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#040144]/10 px-4 py-2 rounded-full mb-4">
            <Star className="w-4 h-4 text-[#040144]" />
            <span className="text-[#040144] text-sm font-semibold">
              Best Sellers
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#040144] mb-4">
            Top Selling <span className="text-[#00B4D8]">Products</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Handpicked favorites loved by thousands of customers
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-[#00B4D8] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 text-lg">Loading amazing products...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16 bg-red-50 rounded-3xl border-2 border-red-100">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-500 text-3xl">⚠</span>
            </div>
            <p className="text-red-600 font-semibold text-lg">
              Oops! Something went wrong
            </p>
            <p className="text-red-500 mt-2">{error}</p>
          </div>
        ) : !products || products.length === 0 ? (
          <div className="text-center py-20 bg-gradient-to-br from-gray-50 to-white rounded-3xl border-2 border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-gray-400 text-4xl">📦</span>
            </div>
            <p className="text-gray-600 text-xl font-semibold mb-2">
              No products available
            </p>
            <p className="text-gray-500">Check back soon for new arrivals!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-br from-[#040144] to-[#00B4D8] py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What Our{' '}
              <span className="text-[#00B4D8] bg-white/20 px-3 rounded-lg">
                Customers
              </span>{' '}
              Say
            </h2>
            <p className="text-gray-200 text-lg">
              Join thousands of satisfied customers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-white text-lg mb-6 leading-relaxed">
                  "{testimonial.review}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00B4D8] to-white/30 rounded-full flex items-center justify-center font-bold text-white">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold">
                      {testimonial.name}
                    </p>
                    <p className="text-gray-300 text-sm">Verified Customer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto py-20 px-4">
        <div className="bg-gradient-to-r from-[#00B4D8] to-[#040144] rounded-3xl p-12 md:p-16 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
              Join our community and enjoy exclusive deals, early access to new
              products, and more!
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-white text-[#040144] px-10 py-5 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Start Shopping
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
