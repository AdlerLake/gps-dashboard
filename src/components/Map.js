"use client";

import "leaflet/dist/leaflet.css"; 
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});


function RecenterMap({ lat, lon }) {
  const map = useMap();
  useEffect(() => {
    if (lat !== 0 && lon !== 0) {
      map.setView([lat, lon], 16); 
    }
  }, [lat, lon, map]);
  return null;
}

export default function GPSMap({ busid, time, lat, lon, status }) {
  return (
    <div
      style={{
        position: "relative",
        height: "100dvh", 
        width: "100%",
      }}
    >
      <MapContainer
        center={[lat, lon]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <RecenterMap lat={lat} lon={lon} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a> contributors'
        />
        <Marker position={[lat, lon]}>
          <Popup>
            <b>Latitude:</b> {lat} <br />
            <b>Longitude:</b> {lon}
          </Popup>
        </Marker>
      </MapContainer>
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "white",
          padding: "12px 16px",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          fontSize: "0.95rem",
          color: "rgba(0, 0, 0, 1)",
          zIndex: 1000, 
        }}
      >
        <b>Bus:</b> {busid}
        <br/>
        <b>Time:</b> {time}
        <br/>
        <b>Latitude:</b> {lat}
        <br/>
        <b>Longitude:</b> {lon}
        <br/>
        <b>Status:</b> {status}
      </div>
    </div>
  );
}

