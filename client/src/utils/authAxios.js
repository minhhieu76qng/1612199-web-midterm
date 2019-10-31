import axios from 'axios';
import LocalStorage from './LocalStorage';

const user = LocalStorage.getUser();

if (!user) {
  LocalStorage.removeToken();
}

const token = LocalStorage.getToken();

const instance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
});

export default instance;
