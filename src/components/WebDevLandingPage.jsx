import React from "react";
import { FaWhatsapp, FaEnvelope, FaPhone, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import fiverrProfile from "../assets/images/fiverr-Profile-img.png";
import meFiverrProfile from "../assets/images/Me-fiverr-profile.png"
import fiverrGigImage from "../assets/images/fiverr-gig-image.png";

const WebDevLandingPage = () => {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/8801316265634", "_blank");
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:mehedihasanshopnil.jr@gmail.com";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-24 text-center">
        <img
          src={meFiverrProfile}
          alt="Mehedi's Fiverr Profile"
          className=" rounded-lg mx-auto mb-4"
        />
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Let's Work Together Directly
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Skip the platform fees and let's collaborate more efficiently
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <button
            onClick={handleWhatsAppClick}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <FaWhatsapp className="text-xl" />
            Chat on WhatsApp
          </button>
          <button
            onClick={handleEmailClick}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <FaEnvelope className="text-xl" />
            Send Email
          </button>
        </div>
      </section>

      {/* Personal Message Section */}
      <section className="max-w-7xl mx-auto px-4 py-12 bg-white rounded-xl shadow-md mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Hi, this is <span className="bg-yellow-100 px-2 rounded">Mehedi</span>{" "}
          from <span className="bg-yellow-100 px-2 rounded">Fiverr</span>
        </h2>

        <div className="flex flex-col md:grid md:grid-cols-3 gap-2">
          <div className="col-span-2 prose prose-lg mx-auto border rounded-lg p-2">
            <div className="space-y-4 text-lg font-semibold text-gray-700">
              <p>Hi Dear,</p>

              <p>
                This is Mehedi — you already know me from Fiverr. I really enjoy
                working with you and would love to continue our collaboration.
              </p>

              <p>
                I just wanted to share something with you honestly. <span className="bg-yellow-100 rounded">Fiverr takes
                20% from every payment.</span> They also charge extra fees from your
                side. So both of us are losing a good amount just for using the
                platform — even for basic communication and file delivery.
              </p>

              <p>
                For example, if I work on a $2000 project, Fiverr takes $400. As
                I fully depend on my development work for income, this becomes a
                big loss for me. I hope you understand my situation.
              </p>

              <p>
                If you're comfortable, we can continue working together through
                WhatsApp, Email, or any other platform you prefer. You don't
                need to worry about payment — we'll use a secure method with
                proper invoices or receipts for every transaction.
              </p>

              <p>
                Let's continue our work smoothly, without paying extra fees to
                any third party. Thank you so much for your understanding and
                support.
              </p>

              <p className="font-medium">
                Looking forward to working with you again!
              </p>

              <p>
                Best regards,
                <br />
                Mehedi
              </p>

              <p className="bg-yellow-100"><span className="text-red-600">Note:</span> Please don't make any conversation on Fiverr inbox about this. It's against their policy and could disable my Fiverr account.</p>
            </div>
          </div>
          <div className="col-span-1 border rounded-lg p-2">
            <img src={fiverrProfile} alt="Fiverr Profile" />
          </div>
        </div>
        <div className="border rounded-lg p-4 mt-8">
            <h1 className="text-2xl font-bold text-center mt-4 text-gray-800 mb-4">Web Development Gig on Fiverr</h1>
            <img src={fiverrGigImage} alt="Web Development Gig on Fiverr" />
        </div>
      </section>

      {/* Contact Options Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          How Would You Like To Connect?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* WhatsApp Option */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
            <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <FaWhatsapp className="text-green-600 text-3xl" />
            </div>
            <h3 className="text-xl font-bold mb-3">WhatsApp</h3>
            <p className="text-gray-600 mb-6">
              Instant messaging for quick communication
            </p>
            <button
              onClick={handleWhatsAppClick}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 mx-auto transition-colors"
            >
              Message Now <FaArrowRight />
            </button>
          </div>

          {/* Email Option */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
            <div className="bg-indigo-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <FaEnvelope className="text-indigo-600 text-3xl" />
            </div>
            <h3 className="text-xl font-bold mb-3">Email</h3>
            <p className="text-gray-600 mb-6">
              For detailed project discussions
            </p>
            <button
              onClick={handleEmailClick}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 mx-auto transition-colors"
            >
              Email Me <FaArrowRight />
            </button>
          </div>

          {/* Phone Option */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
            <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <FaPhone className="text-blue-600 text-3xl" />
            </div>
            <h3 className="text-xl font-bold mb-3">Phone Call</h3>
            <p className="text-gray-600 mb-6">
              For immediate voice communication
            </p>
            <a
              href="tel:01316265634"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 mx-auto transition-colors"
            >
              Call Now <FaArrowRight />
            </a>
          </div>
        </div>
      </section>

      {/* Graphic Design Link */}
      <section className="max-w-4xl mx-auto px-4 py-8 text-center mb-16">
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Need to see the service packages?
          </h2>
          <p className="text-gray-600 mb-6">
            Check out my professional Web Development offerings
          </p>
          <Link
            to="/services/development"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-bold transition-colors"
          >
            View Development Services
          </Link>
        </div>
      </section>
    </div>
  );
};

export default WebDevLandingPage;
