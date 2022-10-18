import axios from "axios";

const BASE_URL = "http://192.168.137.19:5000";

export default axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});
