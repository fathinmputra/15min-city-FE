import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import debounce from 'lodash.debounce';
import { FaWalking, FaBicycle } from 'react-icons/fa';
import dynamic from 'next/dynamic';

const Walkthrough = dynamic(() => import('./Walkthrough'), { ssr: false });

const SearchPopup = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [mode, setMode] = useState('walking');
  const router = useRouter();

  const handleToggle = (e) => {
    setMode(e.target.value);
  };

  const handleResultClick = (lat, lon, place) => {
    const placeName = place ? place : 'Lokasimu';
    router.push(`/searchresult?lat=${lat}&lon=${lon}&name=${placeName}&mode=${mode}`);
    onClose(); // Close the popup after routing
  };

  const searchLocation = async (query) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    try {
      const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
        params: {
          q: query,
          key: '2e321a6f8ee34e11b5925e1087916352',
          countrycode: 'ID',
          limit: 5,
        },
      });
      setResults(response.data.results);
      console.log('Search results:', response.data.results);
    } catch (error) {
      setError('Error searching location. Please try again.');
      setResults([]);
    }
  };

  const debouncedSearch = useCallback(
    debounce((query) => {
      searchLocation(query);
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  const clearSearch = () => {
    setSearchQuery('');
    setResults([]);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      searchLocation(searchQuery);
    }
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting current location:', error);
        }
      );
    }
  }, []);

  return (
    <div className='search-popup fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <Walkthrough />
      <div className='bg-white rounded-lg p-4 w-full max-w-md shadow-lg'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-semibold'>Search</h2>
          <button className='text-gray-500 hover:text-gray-700' onClick={onClose}>
            ✕
          </button>
        </div>
        <form className='space-y-4' onKeyPress={handleKeyPress}>
          <div className='searchmode grid w-full grid-cols-2 gap-2 rounded-xl bg-gray-200 p-2'>
            <div className='flex items-center w-full'>
              <input
                type='radio'
                name='option'
                id='walk'
                value='walking'
                className='peer hidden'
                checked={mode === 'walking'}
                onChange={handleToggle}
              />
              <label
                htmlFor='walk'
                className='text-blue-600 font-medium cursor-pointer flex items-center justify-center px-2 py-1 rounded-md w-full bg-gray-200 peer-checked:bg-blue-600 peer-checked:text-white'
              >
                <FaWalking size={24} className={`mr-2 ${mode === 'walking' ? 'text-white' : 'text-blue-600'}`} />
                15 Menit
              </label>
            </div>
            <div className='flex items-center w-full'>
              <input
                type='radio'
                name='option'
                id='cycle'
                value='cycling'
                className='peer hidden'
                checked={mode === 'cycling'}
                onChange={handleToggle}
              />
              <label
                htmlFor='cycle'
                className='cursor-pointer flex items-center justify-center px-2 py-1 rounded-md w-full bg-gray-200 text-blue-600 font-medium peer-checked:bg-blue-600 peer-checked:text-white'
              >
                <FaBicycle size={24} className={`mr-2 ${mode === 'cycling' ? 'text-white' : 'text-blue-600'}`} />
                15 Menit
              </label>
            </div>
          </div>
          <div className='relative searchbar'>
            <span className='absolute top-1/2 left-3 transform -translate-y-1/2'>
              <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 text-gray-400' viewBox='0 0 20 20' fill='currentColor'>
                <path fillRule='evenodd' d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1111.196 3.49l4.858 4.859a1 1 0 01-1.414 1.414l-4.858-4.858A6 6 0 012 8z' clipRule='evenodd' />
              </svg>
            </span>
            <input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search location...'
              className='w-full pl-10 pr-10 p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300'
            />
            <span className='absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer' onClick={clearSearch}>
              <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 text-gray-400' viewBox='0 0 20 20' fill='currentColor'>
                <path fillRule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clipRule='evenodd' />
              </svg>
            </span>
          </div>
        </form>
        {error && <div className='text-red-500 mt-2'>{error}</div>}
        <div className='mt-4 results'>
          {!hasSearched && currentLocation && (
            <ul className='max-h-48 overflow-y-auto'>
              <li
                key='current-location'
                onClick={() => handleResultClick(currentLocation.lat, currentLocation.lon, 'Lokasimu')}
                className='flex cursor-pointer p-2 border-b hover:bg-gray-100'
              >
                <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='mr-1'>
                  <path d='M12 3.75C9.1084 3.75 6.75 6.1084 6.75 9C6.75 11.6367 8.71289 13.8135 11.25 14.1797V21H12.75V14.1797C15.2871 13.8135 17.25 11.6367 17.25 9C17.25 6.1084 14.8916 3.75 12 3.75ZM12 5.25C14.0801 5.25 15.75 6.91992 15.75 9C15.75 11.0801 14.0801 12.75 12 12.75C9.91992 12.75 8.25 11.0801 8.25 9C8.25 6.91992 9.91992 5.25 12 5.25ZM12 6C10.3506 6 9 7.35059 9 9H10.5C10.5 8.16211 11.1621 7.5 12 7.5V6Z' fill='#636362' />
                </svg>
                Lokasi saat ini
              </li>
            </ul>
          )}
          {results.length > 0 && (
            <ul className='max-h-48 overflow-y-auto'>
              {results.map((result) => (
                <li key={result.place_id} onClick={() => handleResultClick(result.geometry.lat, result.geometry.lng, result.formatted)} className='cursor-pointer p-2 border-b hover:bg-gray-100'>
                  {result.formatted}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPopup;
