import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import { MapContainer, TileLayer, Marker, Polygon, Popup, useMap } from 'react-leaflet';
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import Papa from 'papaparse';
import CategoryStatus from './CategoryStatus';
import HaltePopup from './HaltePopup';
import * as turf from '@turf/turf';
import 'leaflet-routing-machine';

const icons = {
  halte: '/busstopIcon.svg',
  pendidikan: '/educationIcon.svg',
  hiburan: '/entertainmentIcon.svg',
  kesehatan: '/hospitalIcon.svg',
  perkantoran: '/officeIcon.svg',
  perdagangan: '/shoppingIcon.svg',
  hidup: '/worshipIcon.svg',
  kuliner: '/restaurantIcon.svg'
};

const categoryStyles = {
  halte: {
    backgroundColor: 'rgba(151, 71, 255, 0.2)',
    color: '#9747FF'
  },
  pendidikan: {
    backgroundColor: 'rgba(255, 121, 0, 0.2)',
    color: '#FF7900'
  },
  hiburan: {
    backgroundColor: 'rgba(121, 156, 240, 0.2)',
    color: '#799CF0'
  },
  kesehatan: {
    backgroundColor: 'rgba(255, 139, 136, 0.2)',
    color: '#FF8B88'
  },
  perkantoran: {
    backgroundColor: 'rgba(0, 86, 187, 0.2)',
    color: '#0056BB'
  },
  perdagangan: {
    backgroundColor: 'rgba(238, 28, 67, 0.2)',
    color: '#EE1C43'
  },
  hidup: {
    backgroundColor: 'rgba(0, 144, 76, 0.2)',
    color: '#00904C'
  },
  kuliner: {
    backgroundColor: 'rgba(39, 181, 173, 0.2)',
    color: '#27B5AD'
  }
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

const SearchMap = () => {
  const router = useRouter();
  const { query } = router;
  const lat = parseFloat(query.lat);
  const lon = parseFloat(query.lon);
  const locationName = query.name ? query.name.split(',')[0] : 'undefined'; // Extract the name parameter from the query
  const mode = query.mode || 'walking';
  const [isochrone, setIsochrone] = useState(null);
  const [outerNodes, setOuterNodes] = useState([]);
  const [places, setPlaces] = useState([]);
  const [haltes, setHaltes] = useState([]);
  const [categoryStatus, setCategoryStatus] = useState({ found: false, message: '' });
  const [categoryCounts, setCategoryCounts] = useState({
    pendidikan: 0,
    perkantoran: 0,
    hiburan: 0,
    perdagangan: 0,
    hidup: 0,
    kesehatan: 0
  });
  const [selectedCategories, setSelectedCategories] = useState(new Set()); // State to store the selected categories

  const mapRef = useRef(); // Add a ref to store the map instance

  const pinIcon = Leaflet.divIcon({
    html: `
      <div class="relative flex h-6 w-6 z-50">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span class="relative inline-flex h-6 w-6 items-center justify-center">
          <span class="absolute inline-flex h-5 w-5 rounded-full bg-white"></span>
          <span class="relative inline-flex h-4 w-4 rounded-full bg-red-500"></span>
        </span>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    className: 'pin',
    popupAnchor: [0, -20]
  });

  useEffect(() => {
    const fetchIsochrone = async () => {
      const orsApiKey = '5b3ce3597851110001cf6248e6f8b3509b344524a2657bfc62c645ef'; // Replace with your ORS API key
      const modeEndpoint = mode === 'walking' ? 'foot-walking' : 'cycling-regular';
      const url = `https://api.openrouteservice.org/v2/isochrones/${modeEndpoint}`;

      try {
        const response = await axios.post(url, {
          locations: [[lon, lat]],
          range: [900], // 15 minutes in seconds (15 * 60)
          units: 'm'
        }, {
          headers: {
            'Authorization': orsApiKey,
            'Content-Type': 'application/json'
          }
        });
        setIsochrone(response.data.features[0].geometry.coordinates[0].map(coord => [coord[1], coord[0]]));
      } catch (error) {
        console.error('Error fetching isochrone:', error);
      }
    };

    fetchIsochrone();
  }, [lat, lon, mode]);

  useEffect(() => {
    const fetchCSVData = async () => {
      try {
        const response = await fetch('/15mincity.csv'); // Adjust the path as necessary
        const csvText = await response.text();
        const parsedData = Papa.parse(csvText, { header: true });
        setPlaces(parsedData.data);
      } catch (error) {
        console.error('Error fetching CSV data:', error);
      }
    };

    fetchCSVData();
  }, []);

  useEffect(() => {
    if (places.length > 0) {
      checkCategoryStatus();
      countCategories();
    }
  }, [places, isochrone]);

  useEffect(() => {
    fetchHalteData();
  }, []);

  const fetchHalteData = async () => {
    try {
      const response = await fetch('/df_rute_koridor.csv'); // Adjust the path as necessary
      const csvText = await response.text();
      const parsedData = Papa.parse(csvText, { header: true });

      const halteMap = {};

      // First pass: group haltes by route and direction
      const routeGroups = parsedData.data.reduce((acc, halte) => {
        const key = `${halte.route}|${halte.direction}`;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(halte);
        return acc;
      }, {});

      // Second pass: build halte data with next halte
      parsedData.data.forEach((halte, index) => {
        const key = `${halte.latitude},${halte.longitude}`;
        if (!halteMap[key]) {
          halteMap[key] = {
            name: halte.name,
            latitude: parseFloat(halte.latitude),
            longitude: parseFloat(halte.longitude),
            routes: []
          };
        }

        const routeKey = `${halte.route}|${halte.direction}`;
        const routeGroup = routeGroups[routeKey];

        // Determine the next halte
        const isLastInGroup = routeGroup[routeGroup.length - 1] === halte;
        let nextHalte;
        if (isLastInGroup) {
          // Last halte in the current direction, find the first in the opposite direction
          const oppositeDirection = halte.direction === 'Berangkat' ? 'Pulang' : 'Berangkat';
          const oppositeKey = `${halte.route}|${oppositeDirection}`;
          const oppositeGroup = routeGroups[oppositeKey];
          nextHalte = oppositeGroup ? oppositeGroup[0] : null;
        } else {
          // Not the last halte, get the next one in the current direction
          const currentIndex = routeGroup.indexOf(halte);
          nextHalte = routeGroup[currentIndex + 1];
        }

        // Check if the route already exists before adding
        const existingRoute = halteMap[key].routes.find(route => route.route === halte.route && route.direction === (nextHalte ? nextHalte.name : 'Pemberhentian terakhir'));
        if (!existingRoute) {
          halteMap[key].routes.push({
            route: halte.route,
            direction: nextHalte ? nextHalte.name : 'Pemberhentian terakhir'
          });
        }
      });

      const halteData = Object.values(halteMap);
      setHaltes(halteData);
    } catch (error) {
      console.error('Error fetching Halte CSV data:', error);
    }
  };

  const findOuterNodes = (nodes) => {
    if (nodes.length === 0) return [];

    nodes.sort((a, b) => a.lat - b.lat || a.lon - b.lon);
    const hull = [];

    const cross = (o, a, b) => (a.lat - o.lat) * (b.lon - o.lon) - (a.lon - o.lon) * (b.lat - o.lat);

    let l = 0;
    let p = l;
    do {
      hull.push(nodes[p]);
      let q = (p + 1) % nodes.length;
      for (let i = 0; i < nodes.length; i++) {
        if (cross(nodes[p], nodes[i], nodes[q]) > 0) {
          q = i;
        }
      }
      p = q;
    } while (p !== l);

    return hull.map(node => [node.lat, node.lon]); // Return [lat, lon] pairs
  };

  const isInsidePolygon = (point, polygon) => {
    const x = point[0];
    const y = point[1];
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i][0], yi = polygon[i][1];
      const xj = polygon[j][0], yj = polygon[j][1];
      const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  };

  const filteredPlaces = places.filter(place => {
    const point = [parseFloat(place.latitude), parseFloat(place.longitude)];
    const insidePolygon = isochrone && isInsidePolygon(point, isochrone);
    const categoryMatch = selectedCategories.size === 0 || selectedCategories.has(place.kategori);
    return insidePolygon && categoryMatch;
  });

  const countCategories = () => {
    const counts = {};
    filteredPlaces.forEach(place => {
      if (counts[place.kategori]) {
        counts[place.kategori] += 1;
      } else {
        counts[place.kategori] = 1;
      }
    });
    setCategoryCounts(counts);
  };

  const getIcon = (category) => {
    return Leaflet.icon({
      iconUrl: icons[category],
      iconSize: [48, 48], // Adjust the size as needed
      iconAnchor: [24, 48], // Adjust the anchor as needed
      className: 'category-icon',
      popupAnchor: [0, -50]
    });
  };

  const checkCategoryStatus = () => {
    const categories = Object.keys(icons);
    const foundCategories = new Set(places.filter(place => {
      const point = [parseFloat(place.latitude), parseFloat(place.longitude)];
      return isochrone && isInsidePolygon(point, isochrone);
    }).map(place => place.kategori));
    const missingCategories = categories.filter(category => !foundCategories.has(category));

    if (missingCategories.length > 0) {
      setCategoryStatus({
        found: false,
        message: `Maaf, ${locationName} tidak termasuk dalam kota “15 menit”`
      });
    } else {
      setCategoryStatus({
        found: true,
        message: `Selamat, ${locationName} termasuk dalam kota “15 menit”`
      });
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategories(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(category)) {
        newSelected.delete(category);
      } else {
        newSelected.add(category);
      }
      return newSelected;
    });
  };

  const resetCategoryFilter = () => {
    setSelectedCategories(new Set());
  };

  const updateMapView = (lat, lon) => {
    if (mapRef.current) {
      const map = mapRef.current;
      map.setView([lat, lon], 15); // Zoom level 15
    }
  };

  useEffect(() => {
    updateMapView(lat, lon);
  }, [lat, lon]);

  return (
    <div className="relative h-screen w-full">
      <CategoryStatus
        status={categoryStatus}
        locationName={locationName}
        categoryCounts={categoryCounts}
        selectedCategories={selectedCategories}
        onCategoryClick={handleCategoryClick}
        onReset={resetCategoryFilter}
      />
      <MapContainer center={[lat, lon]} zoom={15} className="h-full w-full relative z-10" ref={mapRef}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[lat, lon]} icon={pinIcon} />
        {isochrone && (
          <>
            <Polygon
              positions={isochrone}
              color="blue"
              fillColor="blue"
              fillOpacity={0.1}
            />
            <RoutingMachine start={[lat, lon]} endpoints={isochrone} />
          </>
        )}
        {filteredPlaces.map((place, index) => (
          <Marker
            key={index}
            position={[parseFloat(place.latitude), parseFloat(place.longitude)]}
            icon={getIcon(place.kategori)}
            className="z-10"
          >
            <Popup>
              {place.kategori === 'halte' ? (
                <HaltePopup halte={haltes.find(halte => halte.latitude === parseFloat(place.latitude) && halte.longitude === parseFloat(place.longitude))} />
              ) : (
                <div className="w-32">
                  <div className="font-bold break-words">{place.name || 'Unknown Office'}</div>
                  <div className="inline-block p-2 mt-2 rounded text-right font-semibold" style={categoryStyles[place.kategori]}>
                    {categoryNames[place.kategori]}
                  </div>
                </div>
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

// Create a custom RoutingMachine component to handle routing
const RoutingMachine = ({ start, endpoints }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !start || !endpoints) return;

    const routingControl = Leaflet.Routing.control({
      waypoints: endpoints.map(point => [Leaflet.latLng(start[0], start[1]), Leaflet.latLng(point[0], point[1])]),
      lineOptions: {
        styles: [{ color: 'blue', opacity: 0.6, weight: 4 }]
      },
      addWaypoints: false,
      draggableWaypoints: false,
      createMarker: () => null
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, start, endpoints]);

  return null;
};

export default SearchMap;