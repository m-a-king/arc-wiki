import axios from 'axios';

const HTTTP = axios.create({
  baseURL: 'http://localhost:3001',
});

export default HTTTP;