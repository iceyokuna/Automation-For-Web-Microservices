import { userServicesConstants } from '_constants';

const defaultState = {
  loadingUserServices: false,
  showDefineServiceDialog: false,
  creatingNewService: false,
  creatingNewMethod: false,
  data: [],
  currentServiceId: null,

  newService: {},
}

export function userServices(state = defaultState, action) {
  switch (action.type) {
    case userServicesConstants.TOGGLE_DEFINE_SERVICE_DIALOG: {
      return { ...state, showDefineServiceDialog: !state.showDefineServiceDialog }
    }
    case userServicesConstants.ADD_USER_SERVICE_REQUEST: {
      return { ...state, creatingNewService: "loading", }
    }
    case userServicesConstants.ADD_USER_SERVICE_SUCCESS: {
      const nextState = {
        ...state,
        currentServiceId: action.data.service_id,
        creatingNewService: "success",
      };
      return nextState;
    }

    case userServicesConstants.CREATE_NEW_LOCAL_SERVICE: {
      const nextState = { ...state };
      nextState.newService = {
        serviceName: action.serviceName,
        serviceInfo: action.serviceInfo,
        serviceUrl: action.serviceUrl,
        methods: [],
      }
      return nextState;
    }

    case userServicesConstants.ADD_NEW_LOCAL_METHOD: {
      const nextState = { ...state };
      nextState.newService.methods.push({
        ...action.methodObject
      })
    }

    case userServicesConstants.ADD_USER_SERVICE_FAILURE: {
      return { ...state, creatingNewService: "failure", }
    }

    case userServicesConstants.GET_USER_SERVICES_REQUEST: {
      return { ...state, loadingUserServices: true };
    }

    case userServicesConstants.GET_USER_SERVICES_SUCCESS: {
      const nextState = { ...state };
      nextState.data = action.data;
      return nextState;
    }

    case userServicesConstants.GET_USER_SERVICES_FAILURE: {
      return { ...state, loadingUserServices: false };
    }

    case userServicesConstants.ADD_METHOD_REQUEST: {
      return { ...state, creatingNewMethod: "loading" };
    }

    case userServicesConstants.ADD_METHOD_SUCCESS: {
      return { ...state, creatingNewMethod: "success" };
    }

    case userServicesConstants.ADD_METHOD_FAILURE: {
      return { ...state, creatingNewMethod: "failure" };
    }

    default:
      return state
  }
}