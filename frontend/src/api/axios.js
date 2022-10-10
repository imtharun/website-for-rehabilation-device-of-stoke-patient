import axios from "axios";

const BASE_URL = "http://192.168.137.155:5000";

export default axios.create({
  baseURL: BASE_URL,
});
