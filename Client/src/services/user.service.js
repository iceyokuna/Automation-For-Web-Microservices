// import config from 'config';
import { getUserToken } from '_helpers';
import axios from 'axios'

import { globalConstants } from '_constants'

export const userService = {
  login,
  logout,
  register,
};

function login(username, password) {
  return axios.post(globalConstants.USER_LOGIN_URL, { username, password })
}

function logout() {
  return axios.post(globalConstants.USER_LOGOUT_URL, null, {
    headers: {
      Authorization: "Token " + getUserToken(),
    }
  })
}

function register(user) {
  return axios.post(globalConstants.USER_REGISTER_URL, user)
}

