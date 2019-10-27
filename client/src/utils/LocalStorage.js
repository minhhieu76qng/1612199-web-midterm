const getToken = () => {
  return localStorage.getItem('token');
};
const setToken = jwt => {
  localStorage.setItem('token', jwt);
};

const removeToken = () => {
  localStorage.removeItem('token');
};

export default { getToken, setToken, removeToken };
