"use client"

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Replace the path with your own icon paths if needed
const TempatHiburanMap = () => {

  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);
  const [entertainmentData, setEntertainmentData] = useState([]);
  const [loading, setLoading] = useState(true);

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
  
  const currLocIcon = Leaflet.divIcon({
    html: `<div class="relative flex h-6 w-6 z-50">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span class="relative inline-flex h-6 w-6 items-center justify-center">
          <span class="absolute inline-flex h-5 w-5 rounded-full bg-white"></span>
          <span class="relative inline-flex h-4 w-4 rounded-full bg-red-500"></span>
        </span>
      </div>`,
    iconSize: [64,64],
    iconAnchor: [64/2, 64],
    className: 'currLoc'
  });

  const entertainmentIcon = new Leaflet.Icon({
    iconUrl: '/entertainmentIcon.svg',
    iconSize: [48,48],
    iconAnchor: [48/2, 48],
    className: 'entertainmentIcon',
    popupAnchor: [0, -50]
  });

  useEffect(() => {
    const fetchEntertainmentData = async () => {
      setLoading(true);
      try {
        // Fetch the data from the API
        const response = await fetch('http://localhost:8080/api/v1/datasets');
        const result = await response.json();

        // Check if result contains 'datasets' and it's an array
        if (result && result.datasets && Array.isArray(result.datasets)) {
          // Filter data where category is 'hiburan'
          const filteredData = result.datasets.filter(row => row.category === 'hiburan');
          console.log('Filtered API data:', filteredData);
          setEntertainmentData(filteredData);
        } else {
          console.error('Data received is not in the expected format:', result);
          setError('Data format error');
        }
      } catch (error) {
        console.error('Error fetching entertainment data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEntertainmentData();
  }, []);

  useEffect(() => {
    let geoOptions = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 60 * 60 * 24
    };

    const geoSuccess = (position) => {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    }

    const geoFailure = (err) => {
      setError(err.message);
    }

    navigator.geolocation.getCurrentPosition(geoSuccess, geoFailure, geoOptions);
  }, []);

  const getPosition = (entertainment) => {
    const lat = parseFloat(entertainment.latitude);
    const lon = parseFloat(entertainment.longitude);
    return [lat, lon];
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <MapContainer
      center={[-7.250445, 112.768845]}
      zoom={13}
      scrollWheelZoom={false}
      style={{height: '100%'}}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {userLocation && (
        <Marker
          position={userLocation}
          icon={currLocIcon}
        ></Marker>
      )}
      {entertainmentData.map((entertainment, index) => (
        <Marker key={index} position={getPosition(entertainment)} icon={entertainmentIcon}>
          <Popup>
            <div className="w-32">
              <div className="font-bold break-words">{entertainment.name || 'Unknown Entertainment'}</div>
              <div className="inline-block p-2 mt-2 rounded text-right font-semibold" style={{ backgroundColor: 'rgba(121, 156, 240, 0.2)', color: '#799CF0' }}>
                {categoryNames[entertainment.category]}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default TempatHiburanMap
