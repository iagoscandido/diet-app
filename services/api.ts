import axios from "axios";

const url = {
  host: "192.168.1.14",
  port: "3333",
};

export const api = axios.create({
  baseURL: `http://${url.host}:${url.port}`,
});
