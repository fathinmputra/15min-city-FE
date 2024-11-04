"use client"

import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import HaltePopup from './HaltePopup'; // Import the HaltePopup component
import HalteRouteLegend from './HalteRouteLegend';

const HalteMap = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);
  const [haltes, setHaltes] = useState([]);
  const [routes, setRoutes] = useState({});
  const [selectedRoute, setSelectedRoute] = useState(null);

  const currLocIcon = Leaflet.divIcon({
    html: `<div class="relative flex h-6 w-6 z-50">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span class="relative inline-flex h-6 w-6 items-center justify-center">
          <span class="absolute inline-flex h-5 w-5 rounded-full bg-white"></span>
          <span class="relative inline-flex h-4 w-4 rounded-full bg-red-500"></span>
        </span>
      </div>`,
    iconSize: [64, 64],
    iconAnchor: [64 / 2, 64],
    className: 'currLoc'
  });

  const busstopIcon = new Leaflet.Icon({
    iconUrl: '/busstopIcon.svg',
    iconSize: [48, 48],
    iconAnchor: [48 / 2, 48],
    className: 'busstopIcon',
    popupAnchor: [0, -50]
  });

  useEffect(() => {
    fetchHalteData();
  }, []);

  const fetchHalteData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/corridor-routes');
      const data = await response.json();

      const halteMap = {};
      const routeMap = {};

      data.forEach((halte) => {
        const lat = parseFloat(halte.latitude);
        const lon = parseFloat(halte.longitude);

        if (isNaN(lat) || isNaN(lon)) {
          console.warn(`Skipping invalid halte with lat: ${halte.latitude}, lon: ${halte.longitude}`);
          return;
        }

        const key = `${lat},${lon}`;
        if (!halteMap[key]) {
          halteMap[key] = {
            name: halte.name,
            latitude: lat,
            longitude: lon,
            routes: []
          };
        }

        const routeKey = `${halte.route}|${halte.direction}`;
        if (!routeMap[halte.route]) {
          routeMap[halte.route] = [];
        }
        routeMap[halte.route].push({ lat, lon, name: halte.name, direction: halte.direction });

        // Add route details
        const nextHalte = halte.nextHalte ? { name: halte.nextHalte.name, latitude: halte.nextHalte.latitude, longitude: halte.nextHalte.longitude } : null;
        halteMap[key].routes.push({
          route: halte.route,
          direction: nextHalte ? nextHalte.name : 'Pemberhentian terakhir',
          nextHalte: nextHalte
        });
      });

      setHaltes(Object.values(halteMap));
      setRoutes(routeMap);
    } catch (error) {
      console.error('Error fetching Halte data:', error);
    }
  };

  const getPosition = (halte) => {
    return [halte.latitude, halte.longitude];
  };

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
    };

    const geoFailure = (err) => {
      setError(err.message);
    };

    navigator.geolocation.getCurrentPosition(geoSuccess, geoFailure, geoOptions);
  }, []);

  const createRoutingControl = (map, route, color) => {
    if (!Array.isArray(route)) {
      console.error('Invalid route data:', route);
      return null;
    }
  
    const control = Leaflet.Routing.control({
      waypoints: route.map(({ lat, lon }) => Leaflet.latLng(lat, lon)),
      lineOptions: {
        styles: [{ color, weight: 4 }],
      },
      createMarker: () => null,
      addWaypoints: false,
      routeWhileDragging: false,
      show: false,
    }).addTo(map);
  
    return control;
  };  

  const RoutesControl = ({ routes, selectedRoute }) => {
    const map = useMap();
    const controlsRef = useRef([]);
  
    useEffect(() => {
      if (!map) return;
  
      // Function to remove existing route controls from the map
      const removeControls = () => {
        controlsRef.current.forEach((control) => {
          map.removeControl(control);
        });
        controlsRef.current = [];
      };
  
      // Remove existing routes when selectedRoute changes
      removeControls();
  
      if (selectedRoute) {
        // Show only the selected route
        const color =
          selectedRoute === 'K3L'
            ? 'blue'
            : selectedRoute === 'K2L'
            ? 'green'
            : selectedRoute === 'R1R2'
            ? 'red'
            : 'gray';
        const route = routes[selectedRoute] || [];
        const control = createRoutingControl(map, route, color);
        if (control) controlsRef.current.push(control);
      } else {
        // Show all routes if no route is selected
        Object.keys(routes).forEach((route) => {
          const color =
            route === 'K3L'
              ? 'blue'
              : route === 'K2L'
              ? 'green'
              : route === 'R1R2'
              ? 'red'
              : 'gray';
          const control = createRoutingControl(map, routes[route], color);
          if (control) controlsRef.current.push(control);
        });
      }
  
      // Cleanup function to remove controls when the component unmounts
      return () => {
        removeControls();
      };
    }, [map, routes, selectedRoute]);
  
    return null;
  };
  

  return (
    <div className="relative h-screen w-full">
      <style>
        {`
          .leaflet-routing-container {
            display: none;
          }
        `}
      </style>
      <MapContainer
        center={[-7.250445, 112.768845]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '100%', position: 'relative', zIndex: 1 }}
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
        {haltes.map((halte, index) => (
          <Marker key={index} position={getPosition(halte)} icon={busstopIcon}>
            <Popup>
              <HaltePopup halte={halte} />
            </Popup>
          </Marker>
        ))}
        <RoutesControl routes={routes} selectedRoute={selectedRoute} />
      </MapContainer>
      <HalteRouteLegend routes={routes} selectedRoute={selectedRoute} onSelectRoute={setSelectedRoute} />
    </div>
  );
};

export default HalteMap;
