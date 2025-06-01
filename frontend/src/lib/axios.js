import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api", // Change from 5000 to 5001
  withCredentials: true,
});
