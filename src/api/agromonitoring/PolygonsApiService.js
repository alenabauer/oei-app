import axios from "axios";

class PolygonsApiService {
    constructor() {
        this.baseURL = "http://api.agromonitoring.com/agro/1.0/polygons";
        this.apiKey = import.meta.env.VITE_API_KEY

        this.headers = {
            "Content-Type": "application/json",
        };
    }

    async createPolygon(geojson) {
        // create a polygon using the provided geojson
        const requestUrl = `${this.baseURL}?appid=${this.apiKey}&duplicated=true`;

        try {
            const { data } = await axios.post(requestUrl, {
                name: "My polygon",
                geo_json: geojson,
            }, {
                headers: this.headers,
            })
            return data.id;
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default new PolygonsApiService();
