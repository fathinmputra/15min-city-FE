"use client"

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Replace the path with your own icon paths if needed
const PendidikanMap = () => {

  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);
  const [educationData, setEducationData] = useState([]);
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

  const educationIcon = new Leaflet.Icon({
    iconUrl: '/educationIcon.svg',
    iconSize: [48,48],
    iconAnchor: [48/2, 48],
    className: 'educationIcon',
    popupAnchor: [0, -50]
  });

  useEffect(() => {
    const fetchEducationData = async () => {
      setLoading(true);
      try {
        // Fetch the data from the API
        const response = await fetch('http://localhost:8080/api/v1/datasets');
        const result = await response.json();

        // Check if result contains 'datasets' and it's an array
        if (result && result.datasets && Array.isArray(result.datasets)) {
          // Filter data where category is 'pendidikan'
          const filteredData = result.datasets.filter(row => row.category === 'pendidikan');
          console.log('Filtered API data:', filteredData);
          setEducationData(filteredData);
        } else {
          console.error('Data received is not in the expected format:', result);
          setError('Data format error');
        }
      } catch (error) {
        console.error('Error fetching education data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEducationData();
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

  const getPosition = (education) => {
    const lat = parseFloat(education.latitude);
    const lon = parseFloat(education.longitude);
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
      {educationData.map((education, index) => (
        <Marker key={index} position={getPosition(education)} icon={educationIcon}>
          <Popup>
            <div className="w-32">
              <div className="font-bold break-words">{education.name || 'Unknown Location'}</div>
              <div className="inline-block p-2 mt-2 rounded text-right font-semibold" style={{ backgroundColor: 'rgba(255, 121, 0, 0.2)', color: '#FF7900' }}>
                {categoryNames[education.category]}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default PendidikanMap;
