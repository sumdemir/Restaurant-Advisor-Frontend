import React, { SetStateAction, useEffect, useState } from 'react';
import './UserInputArea.css';
import HttpClient, { City, District } from '../api/HttpClient';
import OpenStreetMap, { RestaurantData } from '../api/OpenStreetMap';


interface UserInputAreaProps {
    sendData: (data: RestaurantData[]) => void;
}

const UserInputArea: React.FC<UserInputAreaProps> = ({ sendData }) => {
    const api = new HttpClient('http://localhost:3001');
    const osmApi = new OpenStreetMap('https://nominatim.openstreetmap.org/');
    const [restaurants, setRestaurants] = useState<RestaurantData[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [selectedCity, setSelectedCity] = useState<City | undefined>();
    const [districts, setDistricts] = useState<District[]>([]);
    const [selectedDistrict, setSelectedDistrict] = useState<string>('');

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await api.getCities();
                setCities(response);
            } catch (error) {
                console.error('Şehirler alinirken bir hata oluştu:', error);
            }
        };

        fetchCities();
    }, []);


    useEffect(() => {
        if (selectedCity) {
            setDistricts(selectedCity.DISTRICT);
        } else {
            setDistricts([]);
        }
    }, [selectedCity]);

    const handleSearch = async () => {
        if (selectedCity && selectedDistrict) {

            try {
                const response = await osmApi.getRestaurants(selectedCity.cityname, selectedDistrict);
                setRestaurants(response);
                sendData(response);
            } catch (error) {
                console.error('Şehirler alinirken bir hata oluştu:', error);
            }

        } else {
            console.warn('Lütfen bir şehir ve ilçe seçin.');
        }
    };

    

    return (
        <div className="user-input-area mx-auto bg-white p-5 rounded-md shadow-md">
            <h1 className="text-align text-2xl font-bold mb-3">Restoran Bulma</h1>
            <div className="mb-4">
                <div>
                    <div className='relative py-3 '>
                        <label className='pr-2 py-3'>İl seçiniz :</label>
                        {cities ? (
                            <select className='text-align'
                                value={selectedCity ? selectedCity.cityid : ''}
                                onChange={(e) => {
                                    const selectedCity = cities.find(city => city.cityid === e.target.value);
                                    setSelectedCity(selectedCity);
                                }}
                            >
                                <option value="">İl seçin</option>
                                {cities.map((city) => (
                                    <option key={city.cityid} value={city.cityid}>
                                        {city.cityname}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <p>İller yükleniyor...</p>
                        )}
                    </div>
                    <div className='relative'>
                        <label className='pr-2 py-3'>İlçe seçiniz : </label>
                        <select className='text-align'
                            value={selectedDistrict}
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                        >
                            <option value="">İlçe seçin</option>
                            {districts.map((district) => (
                                <option key={district.DISTID} value={district.DISTNAME}>
                                    {district.DISTNAME}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className='search-btn'>

                <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={() => {
                    handleSearch();
                    
                }}>
                    Bul
                </button>

            </div>
        </div>
    );
};

export default UserInputArea;
