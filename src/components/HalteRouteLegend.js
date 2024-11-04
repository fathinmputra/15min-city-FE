import React from 'react';

const HalteRouteLegend = ({ routes, selectedRoute, onSelectRoute }) => {
  const routeColors = {
    'K3L': 'blue',
    'K2L': 'green',
    'R1R2': 'red',
  };

  return (
    <div className="absolute top-4 right-4 bg-white p-4 rounded shadow z-50">
      <h3 className="font-bold mb-2">Rute</h3>
      <ul>
        <li
          className={`flex items-center mb-2 cursor-pointer ${selectedRoute === null ? 'bg-gray-200' : ''}`}
          onClick={() => onSelectRoute(null)}
        >
          <div className="w-4 h-4 rounded-full mr-2 bg-gray-500"></div>
          <span>All Routes</span>
        </li>
        {Object.keys(routes).map((route) => (
          <li
            key={route}
            className={`flex items-center mb-2 cursor-pointer ${selectedRoute === route ? 'bg-gray-200' : ''}`}
            onClick={() => onSelectRoute(route)}
          >
            <div
              className="w-4 h-4 rounded-full mr-2"
              style={{ backgroundColor: routeColors[route] }}
            ></div>
            <span>{route}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HalteRouteLegend;
