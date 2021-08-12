import axios from 'axios'

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 1000,
  headers: {}
});


export default service;