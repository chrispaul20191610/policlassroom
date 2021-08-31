// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export default api;
