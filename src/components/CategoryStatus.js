import React from 'react';

const CategoryStatus = ({ status, locationName, categoryCounts, selectedCategories, onCategoryClick, onReset }) => {
  const { found, message } = status;

  const categories = {
    pendidikan: '/pendidikanWhiteIcon.svg',
    perkantoran: '/perkantoranWhiteIcon.svg',
    hiburan: '/hiburanWhiteIcon.svg',
    perdagangan: '/perdaganganWhiteIcon.svg',
    hidup: '/hidupWhiteIcon.svg',
    kesehatan: '/kesehatanWhiteIcon.svg',
    halte: '/halteWhiteIcon.svg',
    kuliner: '/kulinerWhiteIcon.svg'
  };

  // Define the category name mapping
  const categoryNames = {
    halte: 'Halte',
    pendidikan: 'Pendidikan',
    hiburan: 'Tempat Hiburan',
    kesehatan: 'Kesehatan',
    perkantoran: 'Perkantoran',
    perdagangan: 'Perdagangan',
    hidup: 'Tempat Ibadah',
    kuliner: 'Kuliner'
  };

  const categoryStyles = {
    halte: {
      backgroundColor: 'rgba(151, 71, 255)',
      color: '#9747FF'
    },
    pendidikan: {
      backgroundColor: 'rgba(255, 121, 0)',
      color: '#FF7900'
    },
    hiburan: {
      backgroundColor: 'rgba(121, 156, 240)',
      color: '#799CF0'
    },
    kesehatan: {
      backgroundColor: 'rgba(255, 139, 136)',
      color: '#FF8B88'
    },
    perkantoran: {
      backgroundColor: 'rgba(0, 86, 187)',
      color: '#0056BB'
    },
    perdagangan: {
      backgroundColor: 'rgba(238, 28, 67)',
      color: '#EE1C43'
    },
    hidup: {
      backgroundColor: 'rgba(0, 144, 76)',
      color: '#00904C'
    },
    kuliner: {
      backgroundColor: 'rgba(39, 181, 173)',
      color: '#27B5AD'
    },
    gray: {
      backgroundColor: 'rgba(128, 128, 128)',
      color: '#808080'
    }
  };

  return (
    <div className="absolute top-20 left-3 p-6 bg-white shadow-md z-50 w-80">
      <div className={`mb-4 font-bold ${found ? 'text-green-500' : 'text-gray-500'}`}>
        {message.replace('place.name', locationName)}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {Object.keys(categories).map((category) => (
          <div
            key={category}
            className="relative text-center cursor-pointer"
            onClick={() => onCategoryClick(category)}
          >
            <div
              className={`w-16 h-16 mx-auto mb-2 p-3 rounded ${
                categoryCounts[category] > 0 ? '' : 'opacity-50'
              }`}
              style={categoryCounts[category] > 0 ? categoryStyles[category] : categoryStyles.gray}
            >
              <img
                src={categories[category]}
                alt={category}
                className="w-full h-full"
              />
              {selectedCategories.has(category) && (
                <div className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 bg-green-100 rounded-full">
                  <svg
                    className="w-4 h-4 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
            <div className="text">
              {categoryCounts[category] || 0}
            </div>
            <div className="text-xs">
              {categoryNames[category]}
            </div>
          </div>
        ))}
      </div>
      {selectedCategories.size > 0 && (
        <div className="text-center mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={onReset}
          >
            Semua Kategori
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryStatus;
