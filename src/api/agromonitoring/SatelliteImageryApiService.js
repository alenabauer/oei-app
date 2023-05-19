import axios from "axios";

class SatelliteImageryApiService {
    constructor() {
        this.baseURL = "http://api.agromonitoring.com/agro/1.0";
        this.apiKey = import.meta.env.VITE_API_KEY

        this.headers = {
            "Content-Type": "application/json",
        };
    }

    async searchImages(polygonId, startDate, endDate) {
        const requestUrl = `${this.baseURL}/image/search?polyid=${polygonId}&start=${startDate}&end=${endDate}&appid=${this.apiKey}`;

        try {
            const { data } = await axios.get(requestUrl)
            console.log('image data', data)
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default new SatelliteImageryApiService();
