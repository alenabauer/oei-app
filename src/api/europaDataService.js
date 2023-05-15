import axios from "axios";

class EuropaDataService {
    constructor() {
        this.baseURL = "https://data.europa.eu";
        this.headers = {
            "Content-Type": "application/json",
        };
    }

    // documentation for other search parameters can be found at https://data.europa.eu/api/hub/search/
    // other APIS provided by data.europa.eu are listed here: https://dataeuropa.gitlab.io/data-provider-manual/data.europa.eu-APIs/
    async search(query, searchParams) {
        const url = `${this.baseURL}/api/hub/search/search`;
        const body = {
            q: query,
            searchParams,
        };

        try {
            const { data } = await axios.post(url, body, {
                headers: this.headers,
            });
            console.log('response.data', data.result)
            return data.result;
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while searching.");
        }
    }
}

export default new EuropaDataService();
