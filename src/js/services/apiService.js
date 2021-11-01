import axios from "axios";
import config from "../config/apiConfig";

/**
 * /countries
 * /cities
 * /prices/cheap
 */

class Api {
    constructor(config) {
        this.url = config.url;
    }
    async countries() {
        try {
            const response = await axios.get(`${this.url}/countries`);
            return Promise.resolve(response.data);
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    }
    async cities() {
        try {
            const response = await axios.get(`${this.url}/cities`);
            return Promise.resolve(response.data);
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    }
    async prices(params) {
        try {
            const response = await axios.get(`${this.url}/prices/cheap`,{
                params,
            });
            return Promise.resolve(response.data);
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    }
    async airlines(){
        try {
            const response = await axios.get(`${this.url}/airlines`);
            return Promise.resolve(response.data);
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    }
}

const api = new Api(config);

export default api;
