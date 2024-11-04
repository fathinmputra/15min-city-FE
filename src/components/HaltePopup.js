import React from 'react';

const routeStyles = {
  K3L: 'bg-blue-500',
  K2L: 'bg-green-500',
  R1R2: 'bg-red-500',
  default: 'bg-purple-500', // Default color if the route does not match any specified ones
};

const HaltePopup = ({ halte }) => {
  return (
    <div className="w-128">
      <div className="font-bold break-words">Halte {halte.name}</div>
      <div className="mt-4 space-y-2">
        {halte.routes.map((route, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className={`${routeStyles[route.route] || routeStyles.default} text-white rounded-md px-2 py-1`}>
              {route.route}
            </div>
            <div className="text-gray-700">Halte berikutnya: {route.direction}</div>
          </div>
        ))}
      </div>
      <div
        className="inline-block p-2 mt-2 rounded text-right font-semibold"
        style={{ backgroundColor: 'rgba(151, 71, 255, 0.2)', color: '#9747FF' }}
      >
        Halte
      </div>
    </div>
  );
};

export default HaltePopup;
