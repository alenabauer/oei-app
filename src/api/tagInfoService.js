import axios from "axios";

class TagInfoService {
    constructor() {
        this.baseURL = "https://taginfo.openstreetmap.org/api";
        this.headers = {
            "Content-Type": "application/json",
        };
    }

    async getValidTagValues(tag, query) {
        // search Overpass API for various amenities, within the given bounding box
        const request = `${this.baseURL}/4/key/values?key=${tag}&filter=all&lang=en&rp=10&page=1&query=${query}&sortname=count&sortorder=desc`;

        try {
            const { data } = await axios.get(request, {
                headers: this.headers,
            });
            console.log('tag values', data);
            return data;
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while searching.");
        }
    }

    getDefaultBody() {
        return {
            page: 1,
            includes: [
                "title",
            ],
        }
    }
}

export default new TagInfoService();
