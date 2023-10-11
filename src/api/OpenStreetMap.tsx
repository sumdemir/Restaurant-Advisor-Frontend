import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';


export interface RestaurantData {
    place_id: number;
    licence: string;
    osm_type: string;
    osm_id: number;
    lat: string;
    lon: string;
    class: string;
    type: string;
    place_rank: number;
    importance: number;
    addresstype: string;
    name: string;
    display_name: string;
    boundingbox: [string, string, string, string];
  }
  

class OpenStreetMap {
    private axiosInstance: AxiosInstance;

    constructor(baseURL: string) {
        this.axiosInstance = axios.create({
            baseURL,
        });
    }

    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axiosInstance.get<T>(url, config);
            return response.data;
        } catch (error) {
            throw new Error('API isteği sirasinda bir hata oluştu: ' + error);
        }
    }

   async getRestaurants(selectedCity: string , selectedDistrict: string): Promise<RestaurantData[]> {
        try {
            const response = await this.get<any>(`/search?format=json&amenity=restaurant&country=tr&state=(${selectedCity},${selectedDistrict})`);
            return response;
        } catch (error) {
            throw new Error('Restoranlar alinirken bir hata oluştu: ' + error);
        }
    }
}

export default OpenStreetMap;


