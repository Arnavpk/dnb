

import axios from "axios";
import { getToken } from "./tokenservice";

export const axiosInstance = axios.create({
    baseURL: "https://daveandbustersindia.com",
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(async (config) => {
    const token = await getToken();

    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default axiosInstance;