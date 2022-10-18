import axios from "axios";

const BASE_URL = "http://192.168.137.19:5000";
axios.defaults.withCredentials = true;

export default axios.create({
  baseURL: BASE_URL,
});
