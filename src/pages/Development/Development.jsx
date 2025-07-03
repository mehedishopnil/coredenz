import React from 'react';
import { FaLaptopCode, FaMobileAlt, FaServer, FaDatabase, FaShieldAlt, FaHeadset, FaPhone, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { MdDesignServices } from 'react-icons/md';
import { BsCheck2Circle } from 'react-icons/bs';

const Development = () => {
    const services = [
        {
            title: "Website Development",
            icon: <FaLaptopCode className="text-4xl text-blue-600" />,
            description: "Custom websites tailored to your business needs with modern technologies."
        },
        {
            title: "Backend Development",
            icon: <FaServer className="text-4xl text-orange-600" />,
            description: "Robust server-side solutions to power your applications."
        },
        {
            title: "Database Solutions",
            icon: <FaDatabase className="text-4xl text-red-600" />,
            description: "Optimized database architectures for your data storage needs."
        },
        {
            title: "Mobile App Development",
            icon: <FaMobileAlt className="text-4xl text-green-600" />,
            description: "iOS and Android applications built for performance and user experience."
        },
        {
            title: "UI/UX Design",
            icon: <MdDesignServices className="text-4xl text-purple-600" />,
            description: "Beautiful and intuitive interfaces designed to engage your users."
        },
        
    ];

    const packages = [
        {
            name: "Basic",
            price: "$999",
            features: [
                "5 Page Website",
                "Responsive Design",
                "Basic SEO",
                "1 Month Support",
                "Contact Form"
            ],
            recommended: false
        },
        {
            name: "Standard",
            price: "$2,499",
            features: [
                "Up to 15 Pages",
                "CMS Integration",
                "Advanced SEO",
                "3 Months Support",
                "Basic E-commerce"
            ],
            recommended: true
        },
        {
            name: "Premium",
            price: "$4,999+",
            features: [
                "Unlimited Pages",
                "Custom Web Application",
                "Enterprise SEO",
                "6 Months Support",
                "Advanced E-commerce",
                "API Integrations"
            ],
            recommended: false
        }
    ];

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Banner */}
            <section className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-20 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Web Development Services</h1>
                    <p className="text-xl md:text-2xl mb-8">Transform your ideas into powerful digital solutions</p>
                    <button className="bg-white text-blue-800 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition duration-300 shadow-lg">
                        Get a Free Consultation
                    </button>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-16 px-4 max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Development Services</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        We offer comprehensive web solutions to help your business thrive in the digital world.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                            <div className="flex justify-center mb-4">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold text-center mb-3">{service.title}</h3>
                            <p className="text-gray-600 text-center">{service.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Packages Section */}
            <section className="py-16 px-4 bg-gray-100">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Development Packages</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Choose the package that fits your business needs and budget.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {packages.map((pkg, index) => (
                            <div 
                                key={index} 
                                className={`bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300 relative ${pkg.recommended ? 'border-2 border-blue-500 transform md:-translate-y-4' : ''}`}
                            >
                                {pkg.recommended && (
                                    <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-bold">
                                        Recommended
                                    </div>
                                )}
                                <h3 className="text-2xl font-bold text-center mb-4">{pkg.name}</h3>
                                <p className="text-4xl font-bold text-center mb-6 text-blue-600">{pkg.price}</p>
                                <ul className="space-y-3 mb-8">
                                    {pkg.features.map((feature, i) => (
                                        <li key={i} className="flex items-center">
                                            <BsCheck2Circle className="text-green-500 mr-2" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button className={`w-full py-3 rounded-lg font-bold transition duration-300 ${pkg.recommended ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}>
                                    Get Started
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16 px-4 max-w-6xl mx-auto">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 md:p-12 text-white shadow-lg">
                    <div className="md:flex justify-between items-center">
                        <div className="mb-8 md:mb-0 md:w-1/2">
                            <h2 className="text-3xl font-bold mb-4">Ready to start your project?</h2>
                            <p className="text-blue-100 mb-6">
                                Contact us today to discuss your web development needs and get a free quote.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <FaPhone className="mr-3" />
                                    <span>01316265634</span>
                                </div>
                                <div className="flex items-center">
                                    <FaWhatsapp className="mr-3" />
                                    <span>WhatsApp: 01316265634</span>
                                </div>
                                <div className="flex items-center">
                                    <FaEnvelope className="mr-3" />
                                    <span>mehedihasanshopnil.jr@gmail.com</span>
                                </div>
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <form className="space-y-4">
                                <input 
                                    type="text" 
                                    placeholder="Your Name" 
                                    className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-blue-200 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
                                />
                                <input 
                                    type="email" 
                                    placeholder="Your Email" 
                                    className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-blue-200 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
                                />
                                <textarea 
                                    placeholder="Tell us about your project" 
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-blue-200 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
                                ></textarea>
                                <button 
                                    type="submit" 
                                    className="w-full bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition duration-300"
                                >
                                    Send Message
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