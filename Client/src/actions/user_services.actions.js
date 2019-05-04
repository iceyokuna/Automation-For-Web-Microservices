import { userServicesConstants } from '_constants';
import { userService } from 'services'

export const userServicesActions = {
  toggleDefineServiceDialog,

  getUserServices,

  uploadNewService,
  createNewLocalService,

  addNewMethod,
  addNewLocalMethod,
}

function uploadNewService() {
  return (dispatch, getState) => {
    dispatch({ type: userServicesConstants.CREATE_NEW_USER_SERVICE_REQUEST });

    const { newService } = getState().userServices;
    let { methods, serviceName, serviceInfo, serviceUrl } = newService;
    methods = methods.map((item) => {
      return {
        name: item.methodName,
        info: item.methodInfo,
        path: item.methodUrl,
        method_type: item.methodType,
        input_interface: item.inputInterface,
        output_interface: item.outputInterface,
      }
    })
    userService.uploadNewService(serviceName, serviceInfo, serviceUrl, methods).then(
      res => {
        dispatch({ type: userServicesConstants.CREATE_NEW_USER_SERVICE_SUCCESS, data: res.data });
      }
    ).catch(e => {
      dispatch({ type: userServicesConstants.CREATE_NEW_USER_SERVICE_FAILURE });
    });
  }
}

function addNewLocalMethod(methodObject) {
  return {
    type: userServicesConstants.ADD_NEW_LOCAL_METHOD,
    methodObject,
  }
}

function toggleDefineServiceDialog() {
  return {
    type: userServicesConstants.TOGGLE_DEFINE_SERVICE_DIALOG,
  }
}

function getUserServices() {
  return (dispatch, getState) => {
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

function createNewLocalService(
  serviceName,
  serviceInfo,
  serviceUrl
) {
  return {
    type: userServicesConstants.CREATE_NEW_LOCAL_SERVICE,
    serviceName,
    serviceInfo,
    serviceUrl,
  }
}

function addNewMethod(
  methodName,
  methodInfo,
  methodType,
  inputInterface,
  outputInterface,
  methodUrl,
) {
  return (dispatch, getState) => {
    dispatch(request());
    const serviceId = getState().userServices.currentServiceId;
    userService.addNewMethod(methodName,
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

