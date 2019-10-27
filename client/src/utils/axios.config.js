import axios from 'axios';

const host = process.env.REACT_APP_HOST_BE || '';
axios.defaults.baseURL = host;
