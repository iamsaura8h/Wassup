import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // to be changed when deployed
  withCredentials: true,
});

export default API;
