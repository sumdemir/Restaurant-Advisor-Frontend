import L, { LatLngExpression } from 'leaflet';
import './MapComponent.css';
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { RestaurantData } from '../api/OpenStreetMap';

L.Icon.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


interface MapComponentProps {
  receivedData: RestaurantData[] | null;
}

const MapComponent: React.FC<MapComponentProps> = ({ receivedData }) => {
  const [restaurants, setRestaurants] = useState<RestaurantData[]>([]);
  const [center, setCenter] = useState<[number, number]>([41.0717, 29.0242]);
  const zoom = 13;

  const customIcon = L.icon({
    iconUrl: require('../marker-icon.png'), 
    iconRetinaUrl: require('../marker-icon-2x.png'), 
    shadowUrl: require('../marker-shadow.png'), 
    iconSize: [25, 41], 
    iconAnchor: [12, 41], 
    popupAnchor: [1, -34], 
    shadowSize: [41, 41], 
  });

  useEffect(() => {
    if (receivedData !== null) {
      setRestaurants(receivedData);

      if([Number(receivedData[0]?.lat), Number(receivedData[0]?.lon)]) {
        setCenter([Number(receivedData[0]?.lat), Number(receivedData[0]?.lon)]) /* null check = ?*/
      }
    } else {
      setRestaurants([]);
    }
  }, [receivedData]);


  return (
    <MapContainer
      center={center as LatLngExpression}
      zoom={zoom}
      scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {restaurants.map((item) => (
        <Marker
          icon={customIcon}
          key={item.place_id}
          position={[Number(item.lat), Number(item.lon)]}>
          <Popup>{item.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
