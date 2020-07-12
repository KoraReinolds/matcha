import axios from 'axios';

const HTTP = axios.create({
  baseURL: 'https://matcha-server.herokuapp.com/',
  headers: {
    Authorization: 'Bearer {token}',
  },
});

export default {

  register(data) {
    const requestData = {
      login: data.userReg,
      password: data.passReg,
      lname: data.lnameReg,
      fname: data.fnameReg,
      location: { x: 1, y: 2 },
      email: data.mailReg,
    };
    console.log(JSON.stringify(requestData));
    return HTTP.post('register/', requestData).then(
      (response) => {
        console.log(response.data);
        return response.data;
      },
    );
  },

  profileUpdate(data) {
    console.log(data);
    return HTTP.post('profile-update/', data).then(
      (response) => {
        console.log(response.data);
        return response.data;
      },
    );
  },

  profileGet(data) {
    console.log(data);
    return HTTP.post('profile-get/', data).then(
      (response) => {
        console.log(response.data);
        return response.data;
      },
    );
  },

  login(data) {
    const requestData = {
      login: data.userLogin,
      password: data.passLogin,
      location: { x: 1, y: 2 },
    };
    console.log(JSON.stringify(requestData));
    return HTTP.post('login/', requestData).then(
      (response) => {
        console.log(response.data);
        return response.data;
      },
    );
  },

};
