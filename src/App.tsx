import React, { SetStateAction, useEffect, useState } from 'react';
import './App.css';
import UserInputArea from './components/UserInputArea';
import ResultTable from './components/ResultTable';
import { RestaurantData } from './api/OpenStreetMap';
import MapComponent from './components/MapComponent';
import 'leaflet/dist/leaflet.css';


const App: React.FC = () => {

  const [restaurants, setRestaurants] = useState<RestaurantData[]>([]);
  

  const handleDataReceived = (data: RestaurantData[]) => {
    setRestaurants(data);
    
    
  };


  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-200">
      <UserInputArea sendData={handleDataReceived} ></UserInputArea>
      <MapComponent receivedData={restaurants}></MapComponent>
      <ResultTable receivedData={restaurants}></ResultTable>
      
    </div>
  );
};

export default App;
