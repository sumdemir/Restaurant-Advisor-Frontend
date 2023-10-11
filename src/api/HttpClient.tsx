import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface District {
    DISTID: string;
    DISTNAME: string;
}

export interface City {
    _id: string;
    cityname: string;
    cityid: string;
    DISTRICT: District[];
}

class HttpClient {
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

    async getCities(): Promise<City[]> {
        try {
            const response = await this.get<any>('/api/cities');
            return response.cities;
        } catch (error) {
            throw new Error('Şehirler alinirken bir hata oluştu: ' + error);
        }
    }
}

export default HttpClient;
