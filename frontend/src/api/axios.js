import axios from "axios";

const BASE_URL = "http://localhost:5000";
axios.defaults.withCredentials = true;

export default axios.create({
  baseURL: BASE_URL,
});
