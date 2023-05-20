import axios from "axios"
import qs from "qs"
class SentinelApiService {
    constructor() {
        this.clientId = import.meta.env.VITE_SENTINEL_CLIENT_ID;
        this.clientSecret = import.meta.env.VITE_SENTINEL_CLIENT_SECRET;
        this.wmsInstanceId = import.meta.env.VITE_SENTINEL_WMS_INSTANCE_ID;
        this.baseURL = "https://services.sentinel-hub.com";
        this.instance = axios.create({
            baseURL: this.baseURL,
        })
        this.getAuthToken()
    }

    getAuthToken() {
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }
        const body = qs.stringify({
            client_id: this.clientId,
            client_secret: this.clientSecret,
            grant_type: "client_credentials"
        })
        // All requests using this instance will have an access token automatically added
        this.instance.post("/oauth/token", body, config).then(resp => {
            Object.assign(this.instance.defaults, {headers: {authorization: `Bearer ${resp.data.access_token}`}})
        })
    }

    async getImage(bbox, params) {
        const { layer, cloudCoverage } = params;
        const requestUrl = `${this.baseURL}/ogc/wms/${this.wmsInstanceId}?REQUEST=GetMap&CRS=EPSG:4326&BBOX=${bbox.minLon},${bbox.minLat},${bbox.maxLon},${bbox.maxLat}&LAYERS=${layer}&MAXCC=${cloudCoverage}&WIDTH=320&HEIGHT=320&FORMAT=image/jpeg&TIME=2018-03-29/2022-05-29`;
        try {
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