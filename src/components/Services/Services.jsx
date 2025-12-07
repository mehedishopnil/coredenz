import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import { FaCheckCircle } from 'react-icons/fa';

const iconMap = {
  ...FaIcons,
  ...MdIcons,
};

// Map Tailwind gradient classes to actual CSS gradients
const getGradientStyle = colorClasses => {
  if (!colorClasses) return 'linear-gradient(to right, #3b82f6, #8b5cf6)';

  const colorMap = {
    'from-blue-500 to-purple-600':
      'linear-gradient(to right, #3b82f6, #9333ea)',
    'from-green-500 to-teal-500': 'linear-gradient(to right, #22c55e, #14b8a6)',
    'from-yellow-500 to-orange-500':
      'linear-gradient(to right, #eab308, #f97316)',
    'from-pink-500 to-rose-500': 'linear-gradient(to right, #ec4899, #f43f5e)',
    'from-purple-500 to-indigo-500':
      'linear-gradient(to right, #a855f7, #6366f1)',
    'from-red-500 to-pink-500': 'linear-gradient(to right, #ef4444, #ec4899)',
    'from-cyan-500 to-blue-500': 'linear-gradient(to right, #06b6d4, #3b82f6)',
    'from-orange-500 to-red-500': 'linear-gradient(to right, #f97316, #ef4444)',
    'from-teal-500 to-green-500': 'linear-gradient(to right, #14b8a6, #22c55e)',
    'from-indigo-500 to-purple-500':
      'linear-gradient(to right, #6366f1, #a855f7)',
  };

  return (
    colorMap[colorClasses] || 'linear-gradient(to right, #3b82f6, #8b5cf6)'
  );
};

const Services = ({
  categories = [],
  activeCategory,
  setActiveCategory,
  filteredServices = [],
}) => {
  return (
    <div className="max-w-7xl mx-auto rounded">
      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 rounded-full font-semibold transition-all ${
              activeCategory === cat
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Services Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredServices.map((s, i) => {
          const Icon = iconMap[s.icon];
          const gradientStyle = getGradientStyle(s.color);

          return (
            <div
              key={i}
              className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-300 hover:-translate-y-2"
            >
              {/* Gradient bar */}
              <div
                className="h-2 rounded-t-lg"
                style={{ background: gradientStyle }}
              ></div>

              <div className="p-6">
                {/* Icon */}
                <div
                  className="inline-flex p-4 rounded-xl text-white mb-4 group-hover:scale-110 transition-transform"
                  style={{ background: gradientStyle }}
                >
                  {Icon ? <Icon className="text-3xl" /> : null}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-500 transition-colors">
                  {s.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4">{s.description}</p>

                {/* Features */}
                <div className="space-y-2">
                  {s.features.map((f, j) => (
                    <div
                      key={j}
                      className="flex items-center text-sm text-gray-700"
                    >
                      <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
