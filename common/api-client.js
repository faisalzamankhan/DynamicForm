import { NEXT_APP_BACKEND_URL } from "../config";
import axios from "axios";

const api = axios.create({
  baseURL: (process.env.NEXT_APP_BACKEND_URL || NEXT_APP_BACKEND_URL) + "/api",
});

export default api;
