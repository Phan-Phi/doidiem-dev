import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DOMAIN_URL,
  headers: {
    post: {
      ...axios.defaults.headers.post,
      Authorization: process.env.NEXT_PUBLIC_API_KEY,
    },
  },
});

instance.interceptors.request.use((config) => {
  return config;
});

export default instance;
