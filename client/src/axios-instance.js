import axios from 'axios';

const apiURL = 'http://localhost:5000';
console.log('url', apiURL);
const instance = axios.create({
  baseURL: apiURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
