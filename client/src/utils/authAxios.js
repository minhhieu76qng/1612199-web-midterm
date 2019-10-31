import axios from 'axios';
import LocalStorage from './LocalStorage';

function createInstance() {
  const user = LocalStorage.getUser();

  if (!user || !user.id) {
    LocalStorage.removeToken();
  }

  const token = LocalStorage.getToken();

  const instance = axios.create({
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });

  return instance;
}

export default { createInstance };
