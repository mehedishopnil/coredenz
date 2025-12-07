import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  MessageSquare,
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
      color: 'from-[#00B4D8] to-blue-500',
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'hello@yourcompany.com',
      link: 'mailto:hello@yourcompany.com',
      color: 'from-[#040144] to-purple-600',
    },
    {
      icon: MapPin,
      title: 'Address',
      details: '123 Business St, Suite 100, City, State 12345',
      link: 'https://maps.google.com',
      color: 'from-[#00B4D8] to-cyan-500',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Mon - Fri: 9:00 AM - 6:00 PM',
      link: null,
      color: 'from-[#040144] to-indigo-600',
    },
  ];

  const socialLinks = [
    { icon: Facebook, link: 'https://facebook.com', label: 'Facebook' },
    { icon: Twitter, link: 'https://twitter.com', label: 'Twitter' },
    { icon: Linkedin, link: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Instagram, link: 'https://instagram.com', label: 'Instagram' },
  ];

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Replace with your actual API endpoint
      const response = await fetch('YOUR_BACKEND_API_URL/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });

        // Hide success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#040144] via-[#040144] to-[#00B4D8] text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-[#00B4D8] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#00B4D8] rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <MessageSquare className="w-16 h-16 mx-auto mb-6 text-[#00B4D8]" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Get In <span className="text-[#00B4D8]">Touch</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Have a question or want to work together? We'd love to hear from
            you!
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.link || '#'}
                target={info.link?.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className={`block bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${
                  !info.link ? 'pointer-events-none' : ''
                }`}
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center mb-4`}
                >
                  <info.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#040144] mb-2">
                  {info.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {info.details}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
              <h2 className="text-3xl font-bold text-[#040144] mb-3">
                Send Us a Message
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll get back to you as soon as
                possible.
              </p>

              {/* Success Message */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 animate-fade-in">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="text-green-800 font-semibold">
                      Message Sent Successfully!
                    </p>
                    <p className="text-green-600 text-sm">
                      We'll get back to you soon.
                    </p>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-800 font-semibold">
                    Oops! Something went wrong.
                  </p>
                  <p className="text-red-600 text-sm">
                    Please try again later.
                  </p>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#040144] mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00B4D8] focus:outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#040144] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00B4D8] focus:outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#040144] mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00B4D8] focus:outline-none transition-colors"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#040144] mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00B4D8] focus:outline-none transition-colors resize-none"
                    placeholder="Tell us more about your project..."
                  ></textarea>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#00B4D8] to-[#040144] text-white py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Additional Info & Map */}
            <div className="space-y-8">
              {/* Why Contact Us */}
              <div className="bg-gradient-to-br from-[#040144] to-[#00B4D8] text-white p-8 rounded-3xl shadow-2xl">
                <h3 className="text-2xl font-bold mb-6">Why Work With Us?</h3>
                <ul className="space-y-4">
                  {[
                    'Fast response time within 24 hours',
                    'Expert team with 10+ years experience',
                    'Free consultation for new projects',
                    'Flexible engagement models',
                    'Quality guaranteed work',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-[#00B4D8] flex-shrink-0 mt-0.5 bg-white rounded-full p-0.5" />
                      <span className="text-gray-100">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Map */}
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2176419145577!2d-73.98784668459395!3d40.74844097932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                ></iframe>
              </div>

              {/* Social Media */}
              <div className="bg-gray-50 p-8 rounded-3xl">
                <h3 className="text-2xl font-bold text-[#040144] mb-6">
                  Connect With Us
                </h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-gradient-to-br from-[#00B4D8] to-[#040144] rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#040144] mb-4">
              Frequently Asked <span className="text-[#00B4D8]">Questions</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: 'What is your typical response time?',
                answer:
                  'We typically respond to all inquiries within 24 hours during business days.',
              },
              {
                question: 'Do you offer free consultations?',
                answer:
                  'Yes! We offer a free initial consultation to discuss your project needs and how we can help.',
              },
              {
                question: 'What services do you provide?',
                answer:
                  'We specialize in e-commerce solutions, web development, and graphic design services.',
              },
              {
                question: 'How can I get a quote?',
                answer:
                  "Simply fill out the contact form above with your project details, and we'll send you a customized quote.",
              },
            ].map((faq, index) => (
              <details
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 group"
              >
                <summary className="font-semibold text-[#040144] cursor-pointer list-none flex items-center justify-between">
                  <span>{faq.question}</span>
                  <span className="text-[#00B4D8] text-2xl group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
