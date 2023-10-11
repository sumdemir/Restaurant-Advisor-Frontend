import React, { useEffect, useState } from 'react';
import './ResultTable.css';
import { RestaurantData } from '../api/OpenStreetMap';

interface ResultTableProps {
  receivedData: RestaurantData[] | null;
}

const ResultTable: React.FC<ResultTableProps> = ({ receivedData }) => {
  const [restaurants, setRestaurants] = useState<RestaurantData[]>([]);
  
  

  useEffect(() => {
    if (receivedData !== null) {
      if (receivedData.length === 0) {
        setRestaurants([]);
      } else {
        setRestaurants(receivedData);
      }
    } else {
      setRestaurants([]);
    }
  }, [receivedData]);

  return (
    <div className="result-table flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            {restaurants.length > 0 ? (
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Restoran Adı
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Açık Adres
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Enlem ve Boylam
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {restaurants.map((restaurant, index) => (
                    <tr
                      className="border-b bg-neutral-100 dark:border-neutral-500 light:bg-neutral-700"
                      key={index}
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {restaurant.name.length > 0
                          ? restaurant.name
                          : "(Restoran adı bulunamadı.)"}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {restaurant.display_name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {'(' + restaurant.lat + ' , ' + restaurant.lon + ')'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultTable;
