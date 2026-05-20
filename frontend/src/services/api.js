import axios from "axios";

const URL = "http://localhost:4000";

export const api = axios.create({
  baseURL: `${URL}`,
});
