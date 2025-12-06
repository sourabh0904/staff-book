"use client";

import React, { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { FiLoader, FiMapPin } from "react-icons/fi";
import { THEME } from "../../styles/theme";

const containerStyle = {
  width: "100%",
  height: "300px",
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

const MapComponent = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    const bounds = new window.google.maps.LatLngBounds(defaultCenter);
    jobLocations.forEach((loc) => {
      bounds.extend({ lat: loc.lat, lng: loc.lng });
    });
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  if (!isLoaded) {
    return (
      <div className="w-full h-[300px] bg-gray-100 rounded-2xl flex flex-col items-center justify-center text-gray-400 gap-2">
        <FiLoader className="animate-spin text-2xl" />
        <span className="text-sm font-medium">Loading Map...</span>
      </div>
    );
  }

  // Fallback if no API key is provided (to prevent crashing in dev without key)
  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
     return (
      <div className="w-full h-[300px] bg-gray-50 rounded-2xl flex flex-col items-center justify-center text-gray-500 gap-3 border border-gray-200 p-6 text-center">
        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-2">
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
      {jobLocations.map((location) => (
        <Marker
          key={location.id}
          position={{ lat: location.lat, lng: location.lng }}
          title={location.title}
        />
      ))}
    </GoogleMap>
  );
};

export default React.memo(MapComponent);
