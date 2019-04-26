import axios from 'axios'

import { globalConstants } from '_constants'

export const userService = {
  addNewService,
  addNewMethod,
  updateUserService,
};

function updateUserService(serviceId, username, serviceName,
  serviceInfo, serviceUrl, ) {
  return axios.post(globalConstants.USER_SERVICE_URL, {
    id: serviceId,
    username,
    data: {
      name: serviceName,
      info: serviceInfo,
      url: serviceUrl,
    }
  })
}

function addNewMethod() {
  
}

function addNewService(username, serviceName,
  serviceInfo, serviceUrl) {
  return axios.post(globalConstants.USER_SERVICE_URL, {
    username,
    name: serviceName,
    info: serviceInfo,
    url: serviceUrl,
  });
}
