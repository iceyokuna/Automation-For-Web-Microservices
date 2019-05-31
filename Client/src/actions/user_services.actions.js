import { userServicesConstants } from '_constants';
import { userService } from 'services';
import { toast } from 'react-toastify';
import { history } from '_helpers';

export const userServicesActions = {
  toggleDefineServiceDialog,
  getUserServices,
  uploadNewService,
  createNewLocalService,

  addNewMethod,
  addNewLocalMethod,
  // addNewMethodToCurrentService,

  updateService,
  updateMethod,

  deleteServiceById,

  setCurrentService,
}


function updateService(serviceId, updatedService) {
  return async dispatch => {
    dispatch({ type: userServicesConstants.UPDATE_SERVICE_REQUEST });
    try {
      await userService.updateService(serviceId, updatedService);
      dispatch({ type: userServicesConstants.UPDATE_SERVICE_SUCCESS });
    } catch (e) {
      toast.error("Can't update the service");
      dispatch({ type: userServicesConstants.UPDATE_SERVICE_FAILURE });
    }
  }

}

function updateMethod(serviceId, methodId, currentMethodIndex, updatedMethod) {
  return async dispatch => {
    dispatch({ type: userServicesConstants.UPDATE_METHOD_REQUEST });
    try {
      await userService.updateMethod(serviceId, methodId, updatedMethod);
      updatedMethod.id = methodId;
      dispatch({
        type: userServicesConstants.UPDATE_METHOD_SUCCESS,
        currentMethodIndex,
        updatedMethod,
      });
    } catch (e) {
      toast.error("Can't update the method");
      dispatch({ type: userServicesConstants.UPDATE_METHOD_FAILURE })
    }
  }

}

function setCurrentService(currentIndex, currentServiceId) {
  return {
    type: userServicesConstants.SET_CURRENT_SERVICE,
    currentIndex,
    currentServiceId,
  }
}

function deleteServiceById(serviceId, indexToDelete) {
  return dispatch => {
    // dispatch({ type: userServicesConstants.DELETE_SERVICE_BY_ID, serviceId });

    userService.deleteServiceById(serviceId).then(res => {
      toast.success("Delete successfully");
      dispatch({
        type: userServicesConstants.DELETE_SERVICE_BY_ID_SUCCESS,
        indexToDelete,
      });
    }).catch(e => {
      toast.error("Fail to delete the service");
    })
  }

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
    });

    userService.uploadNewService(serviceName, serviceInfo, serviceUrl, methods).then(
      res => {
        dispatch({ type: userServicesConstants.CREATE_NEW_USER_SERVICE_SUCCESS, data: res.data });
        toast.success("A new service is added");
        history.replace('/setting/services');
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

function addNewMethod(newMethod) {
  return (dispatch, getState) => {
    dispatch(request());
    const serviceId = getState().userServices.currentServiceId;
    userService.addNewMethod(serviceId, newMethod).then(
      res => {
        newMethod.id = res.data.method_id
        dispatch(success(newMethod))
        toast.success("Add a new method successfully");
      }
    ).catch(e => dispatch(failure()))
  }

  function request() {
    return {
      type: userServicesConstants.ADD_METHOD_REQUEST,
    }
  }

  function success(newMethod) {
    return {
      type: userServicesConstants.ADD_METHOD_SUCCESS,
      newMethod,
    }
  }

  function failure() {
    return {
      type: userServicesConstants.ADD_METHOD_FAILURE,
    }
  }

}

