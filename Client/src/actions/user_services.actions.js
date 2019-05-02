import { userServicesConstants } from '_constants';
import { userService } from 'services'

export const userServicesActions = {
  toggleDefineServiceDialog,

  getUserServices,
  addNewService,
  addNewMethod,
}

function toggleDefineServiceDialog() {
  return {
    type: userServicesConstants.TOGGLE_DEFINE_SERVICE_DIALOG,
  }
}

function getUserServices() {
  return dispatch => {
    dispatch(request());
    userService.getUserServices().then(res => {
      dispatch(success(res.data));
    }).catch(e => {
      dispatch(failure());
    })
  }

  function request() {
    return {
      type: userServicesConstants.GET_USER_SERVICES_REQUEST,
    }
  }

  function success(data) {
    return {
      type: userServicesConstants.GET_USER_SERVICES_SUCCESS,
      data,
    }
  }

  function failure() {
    return {
      type: userServicesConstants.GET_USER_SERVICES_FAILURE,
    }
  }
}

function addNewService(
  serviceName,
  serviceInfo,
  serviceUrl
) {
  return (dispatch, getState) => {
    dispatch(request());

    const username = getState().authentication.user.username;
    userService.addNewService(
      username, serviceName,
      serviceInfo, serviceUrl
    ).then(res => {
      dispatch(success(res.data));
    }).catch(e => {
      dispatch(failure())
    })
  }

  function request() {
    return {
      type: userServicesConstants.ADD_USER_SERVICE_REQUEST,
    }
  }

  function success(data) {
    return {
      type: userServicesConstants.ADD_USER_SERVICE_SUCCESS,
      data,
    }
  }

  function failure() {
    return {
      type: userServicesConstants.ADD_USER_SERVICE_FAILURE,
    }
  }
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
  return (dispatch, getState) => {
    dispatch(request());
    const username = getState().authentication.user.username;
    userService.addNewMethod(username, methodName,
      methodInfo, methodType, serviceId,
      inputInterface, outputInterface, methodUrl).then(
        res => dispatch(success(res.data))
      ).catch(e => dispatch(failure()))
  }

  function request() {
    return {
      type: userServicesConstants.ADD_METHOD_REQUEST,
    }
  }

  function success(data) {
    return {
      type: userServicesConstants.ADD_METHOD_SUCCESS,
      data,
    }
  }

  function failure() {
    return {
      type: userServicesConstants.ADD_METHOD_FAILURE,
    }
  }

}

