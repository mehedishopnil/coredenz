import React from 'react';
import {
  Award,
  Users,
  Target,
  Zap,
  Code,
  Palette,
  ShoppingBag,
  Heart,
  TrendingUp,
  Shield,
} from 'lucide-react';

const About = () => {
  const stats = [
    { number: '500+', label: 'Happy Clients', icon: Users },
    { number: '1000+', label: 'Projects Completed', icon: Award },
    { number: '50+', label: 'Team Members', icon: Heart },
    { number: '99%', label: 'Client Satisfaction', icon: TrendingUp },
  ];

  const services = [
    {
      icon: ShoppingBag,
      title: 'E-Commerce Solutions',
      description:
        'Custom online stores with secure payment gateways, inventory management, and seamless shopping experiences.',
    },
    {
      icon: Code,
      title: 'Web Development',
      description:
        'Cutting-edge web applications built with modern technologies, responsive design, and optimal performance.',
    },
    {
      icon: Palette,
      title: 'Graphic Design',
      description:
        'Stunning visual identities, brand materials, and creative designs that capture your unique essence.',
    },
  ];

  const values = [
    {
      icon: Target,
      title: 'Mission Driven',
      description:
        'Empowering businesses with innovative digital solutions that drive growth and success.',
    },
    {
      icon: Zap,
      title: 'Innovation First',
      description:
        'Staying ahead with the latest technologies and creative approaches to solve complex challenges.',
    },
    {
      icon: Shield,
      title: 'Trust & Quality',
      description:
        'Delivering excellence with integrity, transparency, and unwavering commitment to quality.',
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#040144] via-[#040144] to-[#00B4D8] text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-[#00B4D8] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#00B4D8] rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            About <span className="text-[#00B4D8]">Our Story</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Transforming ideas into digital excellence through innovation,
            creativity, and dedication
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-[#00B4D8]" />
                <h3 className="text-4xl font-bold text-[#040144] mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#040144] mb-6">
                Our Journey to{' '}
                <span className="text-[#00B4D8]">Excellence</span>
              </h2>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                Founded with a vision to bridge the gap between businesses and
                digital innovation, we've grown into a trusted partner for
                companies seeking to thrive in the digital age.
              </p>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                Our team of passionate developers, designers, and strategists
                work collaboratively to deliver solutions that don't just meet
                expectations—they exceed them. From startups to established
                enterprises, we've helped countless businesses transform their
                digital presence.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                We believe in the power of technology to create meaningful
                change, and we're committed to making that power accessible to
                every business we work with.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-[#00B4D8] to-[#040144] rounded-3xl shadow-2xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <Code className="w-24 h-24 text-white mx-auto mb-4 opacity-20" />
                    <Palette className="w-20 h-20 text-white mx-auto mb-4 opacity-20" />
                    <ShoppingBag className="w-24 h-24 text-white mx-auto opacity-20" />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#00B4D8] rounded-full opacity-20 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#040144] mb-4">
              What We <span className="text-[#00B4D8]">Offer</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive digital solutions tailored to your unique business
              needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 border-t-4 border-[#00B4D8]"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#00B4D8] to-[#040144] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#040144] mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-[#040144] text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our Core <span className="text-[#00B4D8]">Values</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-[#00B4D8]/30 hover:bg-white/10 transition-all duration-300"
              >
                <value.icon className="w-12 h-12 text-[#00B4D8] mb-6" />
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-300 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#00B4D8] to-[#040144]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 text-gray-100">
            Let's create something amazing together. Get in touch with us today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#040144] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
              Get Started
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-[#040144] transition-all duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
