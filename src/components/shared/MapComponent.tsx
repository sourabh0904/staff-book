"use client";

import React, { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { FiLoader, FiMapPin, FiUserPlus } from "react-icons/fi";
import { THEME } from "../../styles/theme";

const containerStyle = {
  width: "100%",
  aspectRatio: "1/1",
  borderRadius: "1rem",
};

// Default center (New Delhi)
const defaultCenter = {
  lat: 28.6139,
  lng: 77.209,
};

// Mock job locations
const jobLocations = [
  { id: 1, lat: 28.6139, lng: 77.209, title: "Software Engineer" },
  { id: 2, lat: 28.5355, lng: 77.391, title: "Product Designer" },
  { id: 3, lat: 28.4595, lng: 77.0266, title: "Marketing Manager" },
];

interface MapUser {
  id: number | string;
  name: string;
  role: string;
  avatar: string;
  lat?: number;
  lng?: number;
  distance?: string;
}

interface MapComponentProps {
  users?: MapUser[];
}

const MapComponent: React.FC<MapComponentProps> = ({ users = [] }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    const bounds = new window.google.maps.LatLngBounds(defaultCenter);
    // Use user locations if available, otherwise default
    if (users.length > 0 && users[0].lat) {
       users.forEach(u => {
         if (u.lat && u.lng) bounds.extend({ lat: u.lat, lng: u.lng });
       });
    } else {
      jobLocations.forEach((loc) => {
        bounds.extend({ lat: loc.lat, lng: loc.lng });
      });
    }
    map.fitBounds(bounds);
    setMap(map);
  }, [users]);

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  const renderMapContent = () => {
    if (!isLoaded) {
      return (
        <div className="w-full aspect-square bg-gray-100 rounded-2xl flex flex-col items-center justify-center text-gray-400 gap-2">
          <FiLoader className="animate-spin text-2xl" />
          <span className="text-sm font-medium">Loading Map...</span>
        </div>
      );
    }

    if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
       return (
        <div className="w-full aspect-square bg-gray-50 rounded-2xl flex flex-col items-center justify-center text-gray-500 gap-3 border border-gray-200 p-6 text-center">
          <div className={`w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center ${THEME.components.icon.primary} mb-2`}>
              <FiMapPin size={24} />
          </div>
          <h3 className="font-semibold text-gray-900">Map Integration</h3>
          <p className="text-xs text-gray-500 max-w-[200px]">
            Please add <code className="bg-gray-100 px-1 py-0.5 rounded">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to your .env.local file to view the map.
          </p>
        </div>
      );
    }

    return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: [
              {
                  featureType: "poi",
                  elementType: "labels",
                  stylers: [{ visibility: "off" }],
              },
          ]
        }}
      >
        {users.length > 0 ? (
          users.map(u => (
            u.lat && u.lng && <Marker key={u.id} position={{ lat: u.lat, lng: u.lng }} title={u.name} />
          ))
        ) : (
          jobLocations.map((location) => (
            <Marker
              key={location.id}
              position={{ lat: location.lat, lng: location.lng }}
              title={location.title}
            />
          ))
        )}
      </GoogleMap>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      {renderMapContent()}
      
      {/* Nearest Users List */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-700 px-1">Nearest Candidates</h4>
        {users.length > 0 ? (
          users.map((user, index) => (
            <div key={user.id} className={`${THEME.components.card.base} p-3 flex items-center justify-between gap-2 hover:shadow-md transition-all group`}>
              <div className="flex items-center gap-3 min-w-0 cursor-pointer">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-10 h-10 rounded-full object-cover border border-gray-100 group-hover:border-primary transition-colors flex-shrink-0" 
                />
                <div className="min-w-0">
                  <h5 className={`${THEME.colors.text.main} text-sm font-semibold truncate group-hover:text-primary transition-colors`}>{user.name}</h5>
                  <p className={`${THEME.components.typography.meta} truncate`}>{user.role}</p>
                </div>
              </div>
              <button className={`flex-shrink-0 px-4 py-1.5 rounded-full ${THEME.components.button.primary} text-xs font-medium flex items-center gap-1 shadow-sm`}>
                <FiUserPlus size={14} />
                Connect
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 text-sm py-2">No users found nearby</p>
        )}
      </div>
    </div>
  );
};

export default React.memo(MapComponent);
