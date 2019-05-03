import axios from 'axios';

import { globalConstants } from '_constants';
import { getUserToken } from '_helpers'

export const userService = {
  addNewService,
  addNewMethod,
  updateUserService,
  getUserServices,
};

function getUserServices() {
  return axios.get(globalConstants.GET_ALL_USER_SERVICES_URL, {
    headers: {
      Authorization: "Token " + getUserToken()
    }
  });
}

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

function addNewMethod(
  methodName,
  methodInfo,
  methodType,
  serviceId,
  inputInterface,
  outputInterface,
  methodUrl,
) {
  return axios.post(globalConstants.USER_METHOD_URL + serviceId, {
    name: methodName,
    info: methodInfo,
    method_type: methodType,
    input_interface: inputInterface,
    output_interface: outputInterface,
    path: methodUrl,
  }, {
    headers: {
      Authorization: "Token " + getUserToken()
    }
  })
}

function addNewService(serviceName,
  serviceInfo, serviceUrl) {
  return axios.post(globalConstants.USER_SERVICE_URL, {
    name: serviceName,
    info: serviceInfo,
    url: serviceUrl,
  }, {
      headers: {
        Authorization: "Token " + getUserToken(),
      }
    });
}
