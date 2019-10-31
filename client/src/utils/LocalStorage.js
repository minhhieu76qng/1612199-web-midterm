import jwt from 'jsonwebtoken';

const getToken = () => {
  return localStorage.getItem('token');
};
const setToken = token => {
  localStorage.setItem('token', token);
};

const removeToken = () => {
  localStorage.removeItem('token');
};

const getUser = () => {
  const token = getToken();

  if (!token) return null;

  const user = jwt.decode(token);

  if (!user || (user && !user.id)) {
    return null;
  }

  return user;
};

export default { getUser, getToken, setToken, removeToken };
