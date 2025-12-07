import React, { useEffect } from 'react';
import {
  FaCheckCircle
} from 'react-icons/fa';

const Services = ({ filteredServicesCategory, activeCategory, setActiveCategory, filteredServices }) => {
  
  // Extract categories dynamically
  const categories = [
    'all',
    ...new Set(filteredServicesCategory.map(item => item.category)),
  ];

  return (
   
      <div className="max-w-7xl mx-auto rounded">
        

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-[#00B4D8] text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((s, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[#00B4D8]/30 hover:-translate-y-2"
            >
              <div className={`h-2 rounded-t-lg bg-gradient-to-r ${s.color}`}></div>
              <div className="p-6">
                <div
                  className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${s.color} text-white mb-4 group-hover:scale-110 transition-transform`}
                >
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#00B4D8] transition-colors">
                  {s.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{s.description}</p>
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
          ))}
        </div>
      </div>
  );
};

export default Services;