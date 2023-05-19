import axios from "axios";

class OverpassApiService {
    constructor() {
        this.baseURL = "https://overpass-api.de/api/interpreter";
        this.headers = {
            "Content-Type": "application/json",
        };
    }

    async search(query, bbox) {
        // search Overpass API for various amenities, within the given bounding box
        const request = `${this.baseURL}?[out:json];node[name][amenity=${query}]${bbox};out;`;

        try {
            const { data } = await axios.get(request, {
                headers: this.headers,
            });
            console.log('response.data', data);
            return data;
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while searching.");
        }
    }
}

export default new OverpassApiService();
