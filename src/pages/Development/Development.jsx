import React, { useContext, useState } from 'react';
import {
  FaLaptopCode,
  FaMobileAlt,
  FaServer,
  FaDatabase,
  FaCloud,
  FaRocket,
  FaPhone,
  FaWhatsapp,
  FaEnvelope,
  FaCheckCircle,
  FaShoppingCart,
  FaCogs,
} from 'react-icons/fa';
import { MdDesignServices, MdSpeed, MdSecurity } from 'react-icons/md';
import { BsCheck2Circle, BsArrowRight, BsStarFill } from 'react-icons/bs';
import { HiSparkles } from 'react-icons/hi';
import { AuthContext } from '../../provider/AuthProvider/AuthProvider';
import Services from '../../components/Services/Services';

const Development = () => {
  const { services } = useContext(AuthContext);

  const [activeCategory, setActiveCategory] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const packages = [
    {
      name: 'Starter',
      price: '$999',
      description: 'Perfect for startups',
      features: [
        '5-8 Page Website',
        'Responsive Design',
        'Basic SEO',
        'Contact Form',
        '1 Month Support',
        'Analytics Setup',
      ],
      recommended: false,
    },
    {
      name: 'Professional',
      price: '$2,499',
      description: 'Ideal for growing businesses',
      features: [
        'Up to 15 Pages',
        'CMS Integration',
        'Advanced SEO',
        'E-Commerce Basic',
        'Payment Gateway',
        '3 Months Support',
        'Security Features',
        'Blog Section',
      ],
      recommended: true,
    },
    {
      name: 'Enterprise',
      price: '$5,999+',
      description: 'For large-scale apps',
      features: [
        'Unlimited Pages',
        'Custom Web App',
        'Advanced E-Commerce',
        'API Integrations',
        'Cloud Hosting',
        '6 Months Support',
        '24/7 Priority Support',
        'Custom Features',
        'Security Audit',
      ],
      recommended: false,
    },
  ];

  const whyChooseUs = [
    {
      icon: <MdSpeed className="text-3xl" />,
      title: 'Lightning Fast',
      description: 'Optimized for blazing speed',
    },
    {
      icon: <MdSecurity className="text-3xl" />,
      title: 'Secure',
      description: 'Industry-standard security',
    },
    {
      icon: <FaRocket className="text-3xl" />,
      title: 'Scalable',
      description: 'Built to grow with you',
    },
    {
      icon: <FaCheckCircle className="text-3xl" />,
      title: 'Support',
      description: 'Always here for you',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      company: 'TechStart Inc.',
      rating: 5,
      text: 'Exceptional work! Delivered ahead of schedule.',
    },
    {
      name: 'Michael Chen',
      company: 'Digital Ventures',
      rating: 5,
      text: 'Professional team. App exceeded expectations.',
    },
    {
      name: 'Emily Rodriguez',
      company: 'Global Solutions',
      rating: 5,
      text: 'Best development service. Highly recommend!',
    },
  ];

  const techStack = [
    'React',
    'Node.js',
    'MongoDB',
    'AWS',
    'Next.js',
    'TypeScript',
    'Tailwind',
    'Docker',
  ];

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitSuccess(true);
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  // First filter required categories
  const allowedCategories = ['web', 'mobile', 'backend'];

  const filteredServicesCategory = services?.filter(s =>
    allowedCategories.includes(s.category?.toLowerCase())
  );

  // Apply activeCategory filter on top of that
  const filteredServices =
    activeCategory === 'all'
      ? filteredServicesCategory
      : filteredServicesCategory.filter(s => s.category === activeCategory);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#03045E] via-[#0077B6] to-[#00B4D8] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#00B4D8] rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
              <HiSparkles className="text-[#00B4D8]" />
              <span className="text-sm font-medium">
                Transform Your Digital Presence
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              Build Your Dream
              <span className="block bg-gradient-to-r from-[#00B4D8] to-white bg-clip-text text-transparent">
                Digital Solution
              </span>
            </h1>

            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-10">
              From concept to launch, we craft exceptional applications that
              drive results and exceed expectations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="group px-8 py-4 bg-[#00B4D8] text-white rounded-lg font-bold hover:bg-[#0096C7] transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
              >
                Get Started Today{' '}
                <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#packages"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-bold hover:bg-white/20 transition-all border border-white/30"
              >
                View Packages
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
              {[
                { n: '150+', t: 'Projects' },
                { n: '98%', t: 'Satisfaction' },
                { n: '50+', t: 'Clients' },
                { n: '24/7', t: 'Support' },
              ].map((s, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
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
           DEVELOPMENT SERVICES
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What We Offer
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive solutions tailored to your needs
          </p>
        </div>
        <Services
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          filteredServices={filteredServices}
          filteredServicesCategory={filteredServicesCategory}
        />
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#03045E] to-[#0077B6] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose Us
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Excellence through innovation and dedication
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
        className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-[#00B4D8]/10 text-[#00B4D8] rounded-full font-semibold text-sm mb-4">
              PRICING
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Choose Your Package
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Flexible pricing to fit your budget
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, i) => (
              <div
                key={i}
                className={`relative rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 ${
                  pkg.recommended
                    ? 'lg:-translate-y-4 border-2 border-[#00B4D8] bg-white'
                    : 'bg-white border border-gray-200 hover:border-[#00B4D8]/30'
                }`}
              >
                {pkg.recommended && (
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
                      pkg.recommended
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
            Need custom?{' '}
            <a
              href="#contact"
              className="text-[#00B4D8] font-semibold hover:underline"
            >
              Contact us
            </a>
          </p>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Technologies We Use
          </h2>
          <p className="text-gray-600 mb-12">Latest and most reliable tech</p>
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech, i) => (
              <div
                key={i}
                className="px-6 py-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-200 hover:border-[#00B4D8]/50"
              >
                <span className="font-semibold text-gray-900">{tech}</span>
              </div>
            ))}
          </div>
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
              What Clients Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from our satisfied clients
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
                    <BsStarFill key={j} className="text-yellow-400 text-lg" />
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

      {/* Contact */}
      <section
        id="contact"
        className="py-20 px-4 bg-gradient-to-br from-[#03045E] via-[#0077B6] to-[#00B4D8] text-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Let's Build Something Amazing
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Ready to start? Get in touch today
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8">
                <h3 className="text-2xl font-bold mb-6">Contact Info</h3>
                <div className="space-y-6">
                  {[
                    {
                      icon: <FaPhone />,
                      title: 'Phone',
                      text: '01316265634',
                      href: 'tel:01316265634',
                    },
                    {
                      icon: <FaWhatsapp />,
                      title: 'WhatsApp',
                      text: '01316265634',
                      href: 'https://wa.me/01316265634',
                    },
                    {
                      icon: <FaEnvelope />,
                      title: 'Email',
                      text: 'mehedihasanshopnil.jr@gmail.com',
                      href: 'mailto:mehedihasanshopnil.jr@gmail.com',
                    },
                  ].map((c, i) => (
                    <div key={i} className="flex items-start">
                      <div className="p-3 bg-[#00B4D8] rounded-lg mr-4 text-xl">
                        {c.icon}
                      </div>
                      <div>
                        <p className="font-semibold mb-1">{c.title}</p>
                        <a
                          href={c.href}
                          className="text-blue-100 hover:text-white transition-colors break-all"
                        >
                          {c.text}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-xl font-bold mb-4">Business Hours</h3>
                <div className="space-y-2 text-blue-100">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                  <p className="text-[#00B4D8] font-semibold mt-4">
                    24/7 Email Support
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6">Send Message</h3>
              {submitSuccess && (
                <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 mb-6 text-center">
                  <FaCheckCircle className="inline mr-2" />
                  Message sent successfully!
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={e =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-blue-200 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={e =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-blue-200 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={e =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-blue-200 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
                />
                <select
                  name="service"
                  value={formData.service}
                  onChange={e =>
                    setFormData({ ...formData, service: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
                >
                  <option value="" className="text-gray-900">
                    Select Service
                  </option>
                  <option value="web" className="text-gray-900">
                    Web Development
                  </option>
                  <option value="mobile" className="text-gray-900">
                    Mobile App
                  </option>
                  <option value="ecommerce" className="text-gray-900">
                    E-Commerce
                  </option>
                  <option value="custom" className="text-gray-900">
                    Custom Solution
                  </option>
                </select>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={e =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Tell us about your project"
                  rows="4"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-blue-200 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-[#00B4D8] text-white px-6 py-4 rounded-lg font-bold hover:bg-[#0096C7] transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
                >
                  Send Message <BsArrowRight />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Development;
