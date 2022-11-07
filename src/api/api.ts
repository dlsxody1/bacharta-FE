import axios from "axios";

export const instance = axios.create({
  baseURL: "http://43.200.253.131:3001",
});
