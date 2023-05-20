import axios from "axios"
import qs from "qs"
class SentinelApiService {
    constructor() {
        // Initialize the service with necessary configurations
        this.clientId = import.meta.env.VITE_SENTINEL_CLIENT_ID;
        this.clientSecret = import.meta.env.VITE_SENTINEL_CLIENT_SECRET;
        this.wmsInstanceId = import.meta.env.VITE_SENTINEL_WMS_INSTANCE_ID;
        this.baseURL = "https://services.sentinel-hub.com";
        this.instance = axios.create({
            baseURL: this.baseURL,
        })

        // Retrieve the access token during initialization
        this.getAuthToken()
    }

    async getAuthToken() {
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        };
        const body = qs.stringify({
            client_id: this.clientId,
            client_secret: this.clientSecret,
            grant_type: "client_credentials"
        });

        try {
            // Request the access token from the server
            const resp = await this.instance.post("/oauth/token", body, config);
            const accessToken = resp.data.access_token;

            // Set the access token for all future requests
            this.instance.defaults.headers.authorization = `Bearer ${accessToken}`;
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while getting the access token.");
        }
    }

    async getImage(bbox, params) {
        const { layer, cloudCoverage, startDate, endDate, width, height } = params;
        const requestUrl = `${this.baseURL}/ogc/wms/${this.wmsInstanceId}?REQUEST=GetMap&CRS=EPSG:4326&BBOX=${bbox.minLon},${bbox.minLat},${bbox.maxLon},${bbox.maxLat}&LAYERS=${layer}&MAXCC=${cloudCoverage}&WIDTH=${width}&HEIGHT=${height}&FORMAT=image/jpeg&TIME=${startDate}/${endDate}`;
        try {
            // Request the image data from the server
            const response = await this.instance.get(requestUrl, {
                responseType: 'arraybuffer'
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while searching.");
        }
    }
}

export default new SentinelApiService();