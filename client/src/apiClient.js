import axios from 'axios';
import qs from "qs";

axios.defaults.paramsSerializer = params => {
  return qs.stringify(params);
}

const HTTTP = axios.create({
  baseURL: 'http://localhost:3001',
});

export default HTTTP;