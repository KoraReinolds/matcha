import axios from 'axios';

const HTTP = axios.create({
  baseURL: 'https://matcha-server.herokuapp.com/',
  headers: {
    Authorization: 'Bearer {token}',
  },
});

export default {

  register(data) {
    return HTTP.post('register/', data).then((response) => response.data);
  },

  profileUpdate(data) {
    return HTTP.post('profile-update/', data).then((response) => response.data);
  },

  login(data) {
    return HTTP.post('login/', data).then((response) => response.data);
  },

};
