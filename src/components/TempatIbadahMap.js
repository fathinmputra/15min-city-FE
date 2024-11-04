"use client"

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Komponen untuk peta tempat ibadah
const TempatIbadahMap = () => {

  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);
  const [worshipData, setWorshipData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mapping kategori ke nama
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

  // Ikon lokasi pengguna
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

  // Ikon tempat ibadah
  const worshipIcon = new Leaflet.Icon({
    iconUrl: '/worshipIcon.svg',
    iconSize: [48,48],
    iconAnchor: [48/2, 48],
    className: 'worshipIcon',
    popupAnchor: [0, -50]
  });

  // Mengambil data tempat ibadah dari API
  useEffect(() => {
    const fetchWorshipData = async () => {
      setLoading(true);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 detik timeout
  
      try {
        const response = await fetch('http://10.199.13.156:8080/api/v1/datasets', { signal: controller.signal });
        const result = await response.json();
  
        if (result && result.datasets && Array.isArray(result.datasets)) {
          const filteredData = result.datasets.filter(row => row.category === 'hidup');
          console.log('Filtered API data:', filteredData);
          setWorshipData(filteredData);
        } else {
          console.error('Data yang diterima tidak dalam format yang diharapkan:', result);
          setError('Data format error');
        }
      } catch (error) {
        if (error.name === 'AbortError') {
          console.error('Request timed out');
          setError('Request timed out');
        } else {
          console.error('Error fetching worship data:', error);
          setError(error.message);
        }
      } finally {
        clearTimeout(timeoutId);
        setLoading(false);
      }
    };
  
    fetchWorshipData();
  }, []);  

  // Mengambil posisi pengguna
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

  // Mendapatkan posisi untuk marker
  const getPosition = (worship) => {
    const lat = parseFloat(worship.latitude);
    const lon = parseFloat(worship.longitude);
    return [lat, lon];
  };

  // Menampilkan konten peta
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
      {worshipData.map((worship, index) => (
        <Marker key={index} position={getPosition(worship)} icon={worshipIcon}>
          <Popup>
            <div className="w-32">
              <div className="font-bold break-words">{worship.name || 'Unknown Worship Place'}</div>
              <div className="inline-block p-2 mt-2 rounded text-right font-semibold" style={{ backgroundColor: 'rgba(0, 144, 76, 0.2)', color: '#00904C' }}>
                {categoryNames[worship.category]}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default TempatIbadahMap;
