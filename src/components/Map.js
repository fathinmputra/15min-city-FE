
"use client"

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';


const Map = () => {

  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);
  
  const currLocIcon = Leaflet.divIcon({
    html: `<div class="relative flex h-6 w-6 z-50">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span class="relative inline-flex h-6 w-6 items-center justify-center">
          <span class="absolute inline-flex h-5 w-5 rounded-full bg-white"></span>
          <span class="relative inline-flex h-4 w-4 rounded-full bg-red-500"></span>
        </span>
      </div>`,
    iconSize: [8, 8], // Fixed icon size
    iconAnchor: [4, 8], // Fixed anchor point (middle of the bottom)
    className: 'currLoc'
  });

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

  return (
    <MapContainer
      center={[-7.250445, 112.768845]}
      zoom={13}
      scrollWheelZoom={false}
      style={{height: '100%'}}
      className='Map'
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
    </MapContainer>
  )
}

export default Map
