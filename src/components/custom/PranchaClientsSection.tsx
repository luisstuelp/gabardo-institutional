
import React from 'react';

const PranchaClientsSection: React.FC = () => {

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">Trusted by Industry Leaders</h2>
        <div className="mt-10 flex justify-center flex-wrap items-center gap-8">
          {/* This is a placeholder. Replace with actual client logos. */}
          <div className="text-gray-500">Client Logo Placeholder 1</div>
          <div className="text-gray-500">Client Logo Placeholder 2</div>
          <div className="text-gray-500">Client Logo Placeholder 3</div>
          <div className="text-gray-500">Client Logo Placeholder 4</div>
        </div>
      </div>
    </div>
  );
};

export default PranchaClientsSection;
