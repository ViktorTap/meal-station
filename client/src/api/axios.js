import axios from "axios";
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://meal-station-server.herokuapp.com/"
    : "http://localhost:3500";
// const BASE_URL = "http://localhost:3500";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
