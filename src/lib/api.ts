import axios, { AxiosInstance } from "axios";
import { CSR_ENV } from "./env-client";

const apiClient: AxiosInstance = axios.create({ baseURL: CSR_ENV.BASE_URL + "/api" });

export default apiClient;
