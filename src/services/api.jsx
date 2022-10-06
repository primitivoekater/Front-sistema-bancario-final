import axios from "axios";

export default axios.create({
  baseURL: "https://api-inspetores.herokuapp.com/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
