import React from 'react';

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center z-50">
      <div className="flex flex-col items-center space-y-8">
        <div className="flex items-end space-x-2 h-16">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="w-4 bg-gradient-to-t from-indigo-400 to-purple-600 rounded-t-md"
              style={{
                height: `${(i % 2 === 0 ? 0.6 : 1) * 100}%`,
                animation: `bounce 1.2s ease-in-out infinite ${i * 0.1}s`
              }}
            />
          ))}
        </div>
        <p className="text-white text-lg font-medium tracking-wider">{message}</p>
      </div>
      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.5); }
        }
      `}</style>
    </div>
  );
};

export default Loading;