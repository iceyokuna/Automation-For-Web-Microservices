import axios from 'axios';

import { globalConstants } from '_constants';
import { getUserToken } from '_helpers'

export const userService = {
  uploadNewService,
  addNewMethod,
  updateService,
  updateMethod,
  getUserServices,
  deleteServiceById,
};


function updateService(serviceId, data) {
  return axios.post(globalConstants.UPDATE_USER_SERVICE_URL, {
    id: serviceId,
    data
  }, {
      headers: {
        Authorization: 'Token ' + getUserToken()
      }
    })
}

function updateMethod(serviceId, methodId, data) {
  return axios.put(`${globalConstants.USER_METHOD_URL}${serviceId}/${methodId}`, {
    data,
  }, {
      headers: {
        Authorization: 'Token ' + getUserToken()
      }
    })

}

function deleteServiceById(id) {
  return axios.delete(globalConstants.DELETE_USER_SERVICE_URL + id, {
    headers: {
      Authorization: "Token " + getUserToken()
    }
  })
}

function getUserServices() {
  return axios.get(globalConstants.GET_ALL_USER_SERVICES_URL, {
    headers: {
      Authorization: "Token " + getUserToken()
    }
  });
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

function uploadNewService(serviceName,
  serviceInfo, serviceUrl, methods) {
  return axios.post(globalConstants.CREATE_USER_SERVICE_URL, {
    name: serviceName,
    info: serviceInfo,
    url: serviceUrl,
    methods,
  }, {
      headers: {
        Authorization: "Token " + getUserToken(),
      }
    });
}
