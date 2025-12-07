import React, { useContext, useState } from 'react';
import {
  FaPalette,
  FaPencilRuler,
  FaImage,
  FaPrint,
  FaShoppingBag,
  FaTshirt,
  FaPhone,
  FaWhatsapp,
  FaEnvelope,
  FaCheckCircle,
  FaBullhorn,
  FaNewspaper,
  FaBook,
  FaIdCard,
  FaCertificate,
  FaRegSmile,
} from 'react-icons/fa';
import {
  MdBrush,
  MdColorLens,
  MdDesignServices,
  MdTrendingUp,
} from 'react-icons/md';
import {
  BsCheck2Circle,
  BsArrowRight,
  BsStarFill,
  BsLightning,
} from 'react-icons/bs';
import { HiSparkles, HiLightningBolt } from 'react-icons/hi';
import { AiFillStar } from 'react-icons/ai';
import { AuthContext } from '../../provider/AuthProvider/AuthProvider';
import Services from '../../components/Services/Services';
import { s } from 'framer-motion/client';



const GraphicDesign = () => {
  const { services } = useContext(AuthContext);

  const [activeCategory, setActiveCategory] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    message: '',
  });

  const packages = [
    {
      name: 'Basic',
      price: '$199',
      description: 'Perfect for startups',
      features: [
        '2 Design Concepts',
        '3 Revisions',
        'High-Res Files',
        'Basic Formats',
        '48-Hour Delivery',
        'Email Support',
      ],
      popular: false,
    },
    {
      name: 'Professional',
      price: '$499',
      description: 'Ideal for businesses',
      features: [
        '4 Design Concepts',
        'Unlimited Revisions',
        'All Formats (AI, PSD, PDF)',
        'Source Files',
        '24-Hour Delivery',
        'Brand Guide',
        '3D Mockups',
        'Priority Support',
        'Social Kit',
      ],
      popular: true,
    },
    {
      name: 'Premium',
      price: '$999+',
      description: 'Complete branding',
      features: [
        'Unlimited Concepts',
        'Unlimited Revisions',
        'Complete Brand Package',
        'All Source Files',
        '12-Hour Rush',
        'Full Guidelines (30+ pages)',
        'Stationery Suite',
        '30+ Social Templates',
        'Packaging Design',
        'Print Coordination',
        'Dedicated Designer',
        '24/7 VIP Support',
      ],
      popular: false,
    },
  ];

  const designProcess = [
    {
      step: '01',
      title: 'Discovery',
      description: 'Learn about your brand, goals, and vision.',
      icon: <FaRegSmile className="text-3xl" />,
    },
    {
      step: '02',
      title: 'Concept',
      description: 'Create multiple unique concepts.',
      icon: <MdColorLens className="text-3xl" />,
    },
    {
      step: '03',
      title: 'Refinement',
      description: 'Refine with unlimited revisions.',
      icon: <MdBrush className="text-3xl" />,
    },
    {
      step: '04',
      title: 'Delivery',
      description: 'Receive all files in multiple formats.',
      icon: <BsLightning className="text-3xl" />,
    },
  ];

  const whyChooseUs = [
    {
      icon: <HiLightningBolt className="text-3xl" />,
      title: 'Fast Turnaround',
      description: 'Quick delivery, top quality',
    },
    {
      icon: <AiFillStar className="text-3xl" />,
      title: 'Award-Winning',
      description: 'Recognized designs',
    },
    {
      icon: <MdDesignServices className="text-3xl" />,
      title: 'Unlimited Revisions',
      description: '100% satisfaction',
    },
    {
      icon: <FaCheckCircle className="text-3xl" />,
      title: 'Money-Back',
      description: 'Satisfaction guarantee',
    },
  ];

  const portfolioItems = [
    {
      title: 'Tech Startup',
      category: 'branding',
      image: '🚀',
      color: 'from-blue-400 to-blue-600',
    },
    {
      title: 'Restaurant',
      category: 'branding',
      image: '🍽️',
      color: 'from-orange-400 to-red-500',
    },
    {
      title: 'Fashion Poster',
      category: 'print',
      image: '👗',
      color: 'from-pink-400 to-purple-500',
    },
    {
      title: 'Social Campaign',
      category: 'digital',
      image: '📱',
      color: 'from-green-400 to-teal-500',
    },
    {
      title: 'Coffee Package',
      category: 'print',
      image: '☕',
      color: 'from-amber-400 to-orange-500',
    },
    {
      title: 'Fitness App',
      category: 'digital',
      image: '💪',
      color: 'from-cyan-400 to-blue-500',
    },
    {
      title: 'Music Festival',
      category: 'creative',
      image: '🎵',
      color: 'from-purple-400 to-pink-500',
    },
    {
      title: 'Eco Brand',
      category: 'branding',
      image: '🌱',
      color: 'from-green-400 to-emerald-600',
    },
  ];

  const testimonials = [
    {
      name: 'Amanda Stevens',
      company: 'Fashion Boutique',
      rating: 5,
      text: 'Stunning designs! Captured our brand perfectly.',
    },
    {
      name: 'David Lee',
      company: 'Tech Innovations',
      rating: 5,
      text: 'Professional and fast. Amazing feedback!',
    },
    {
      name: 'Sophie Martinez',
      company: 'Organic Foods',
      rating: 5,
      text: 'Increased sales by 40%. Exceptional work!',
    },
  ];



  // First filter required categories
  const allowedCategories = ['branding', 'digital', 'print', 'creative'];

  const filteredServicesCategory = services?.filter(s =>
    allowedCategories.includes(s.category?.toLowerCase())
    );
    
    console.log(filteredServicesCategory);

  // Apply activeCategory filter on top of that
  const filteredServices =
    activeCategory === 'all'
      ? filteredServicesCategory
      : filteredServicesCategory.filter(s => s.category === activeCategory);

  const filteredPortfolio =
    activeCategory === 'all'
      ? portfolioItems
      : portfolioItems.filter(p => p.category === activeCategory);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#03045E] via-[#0077B6] to-[#00B4D8] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-96 h-96 bg-pink-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-purple-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-[#00B4D8] rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
              <HiSparkles className="text-[#00B4D8]" />
              <span className="text-sm font-medium">
                Creative Design Studio
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              Transform Ideas Into
              <span className="block bg-gradient-to-r from-[#00B4D8] via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Visual Masterpieces
              </span>
            </h1>

            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-10">
              Award-winning graphic design that elevates your brand and
              captivates your audience.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="group px-8 py-4 bg-[#00B4D8] text-white rounded-lg font-bold hover:bg-[#0096C7] transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
              >
                Start Your Project{' '}
                <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#portfolio"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-bold hover:bg-white/20 transition-all border border-white/30"
              >
                View Portfolio
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
              {[
                { n: '500+', t: 'Designs' },
                { n: '99%', t: 'Satisfaction' },
                { n: '200+', t: 'Clients' },
                { n: '48hr', t: 'Turnaround' },
              ].map((s, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all"
                >
                  <div className="text-3xl md:text-4xl font-bold text-[#00B4D8]">
                    {s.n}
                  </div>
                  <div className="text-sm text-blue-100 mt-1">{s.t}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-auto" viewBox="0 0 1440 120" fill="none">
            <path
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L0,120Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-[#00B4D8]/10 text-[#00B4D8] rounded-full font-semibold text-sm mb-4">
            SERVICES
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Design Services We Offer
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From logos to complete identities
          </p>
        </div>
        <Services
          filteredServicesCategory={filteredServicesCategory}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          filteredServices={filteredServices}
        />
      </section>

      {/* Process */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-[#00B4D8]/10 text-[#00B4D8] rounded-full font-semibold text-sm mb-4">
              PROCESS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How We Work
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              4-step process for exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {designProcess.map((proc, i) => (
              <div key={i} className="relative">
                <div className="text-center group">
                  <div className="relative inline-block mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00B4D8] to-[#0077B6] rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                    <div className="relative bg-gradient-to-r from-[#00B4D8] to-[#0077B6] text-white p-6 rounded-2xl group-hover:scale-110 transition-transform">
                      {proc.icon}
                    </div>
                    <div className="absolute -top-3 -right-3 w-12 h-12 bg-white rounded-full border-4 border-[#00B4D8] flex items-center justify-center font-bold text-[#00B4D8] shadow-lg">
                      {proc.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {proc.title}
                  </h3>
                  <p className="text-gray-600">{proc.description}</p>
                </div>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-[#00B4D8] to-transparent -translate-x-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section
        id="portfolio"
        className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-[#00B4D8]/10 text-[#00B4D8] rounded-full font-semibold text-sm mb-4">
              PORTFOLIO
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Recent Work
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Designs that make brands unforgettable
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPortfolio.map((item, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 aspect-square"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} flex items-center justify-center text-8xl group-hover:scale-110 transition-transform duration-500`}
                >
                  {item.image}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-300 capitalize">
                      {item.category}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#03045E] to-[#0077B6] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose Us
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Creating experiences, not just designs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, i) => (
              <div key={i} className="text-center group">
                <div className="inline-flex p-6 rounded-2xl bg-white/10 backdrop-blur-sm text-[#00B4D8] mb-4 group-hover:bg-white/20 group-hover:scale-110 transition-all border border-white/20">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-blue-100">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section
        id="packages"
        className="py-20 px-4 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-[#00B4D8]/10 text-[#00B4D8] rounded-full font-semibold text-sm mb-4">
              PRICING
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Design Packages
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Flexible pricing for every budget
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, i) => (
              <div
                key={i}
                className={`relative rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 ${
                  pkg.popular
                    ? 'lg:-translate-y-4 border-2 border-[#00B4D8] bg-white'
                    : 'bg-white border border-gray-200 hover:border-[#00B4D8]/30'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-[#00B4D8] to-[#0077B6] text-white px-4 py-1.5 rounded-bl-xl font-bold text-sm flex items-center gap-1">
                    <HiSparkles />
                    POPULAR
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-6">
                    {pkg.description}
                  </p>
                  <div className="mb-6">
                    <span className="text-5xl font-extrabold text-gray-900">
                      {pkg.price}
                    </span>
                    <span className="text-gray-600 ml-1">/project</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((f, j) => (
                      <li key={j} className="flex items-start">
                        <BsCheck2Circle className="text-[#00B4D8] mt-1 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className={`block w-full py-4 rounded-xl font-bold text-center transition-all ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-[#00B4D8] to-[#0077B6] text-white hover:shadow-lg hover:scale-105'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Get Started
                  </a>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-600 mt-8">
            Custom project?{' '}
            <a
              href="#contact"
              className="text-[#00B4D8] font-semibold hover:underline"
            >
              Contact us
            </a>
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-[#00B4D8]/10 text-[#00B4D8] rounded-full font-semibold text-sm mb-4">
              TESTIMONIALS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Client Love
            </h2>
            <p className="text-lg text-gray-600">
              What our clients say about us
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-200 hover:border-[#00B4D8]/30"
              >
                <div className="flex mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <BsStarFill key={j} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{t.text}"</p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="font-bold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-600">{t.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GraphicDesign;
