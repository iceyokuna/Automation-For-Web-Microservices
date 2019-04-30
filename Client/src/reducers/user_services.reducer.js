import { userServicesConstants } from '_constants';

const defaultState = {
  loadingUserServices: false,
  showDefineServiceDialog: false,
  creatingNewService: false,
  creatingNewMethod: false,
  data: [
    { serviceName: 'Currency converter', serviceUrl: 'https://cconverter.com/api', methods: [], },
    { serviceName: 'Currency converter', serviceUrl: 'https://cconverter.com/api' },
    { serviceName: 'Currency converter', serviceUrl: 'https://cconverter.com/api' },
    { serviceName: 'Currency converter', serviceUrl: 'https://cconverter.com/api' },
    { serviceName: 'Currency converter', serviceUrl: 'https://cconverter.com/api' },
    { serviceName: 'Currency converter', serviceUrl: 'https://cconverter.com/api' },
    { serviceName: 'Currency converter', serviceUrl: 'https://cconverter.com/api' },
    { serviceName: 'Currency converter', serviceUrl: 'https://cconverter.com/api' },
    { serviceName: 'Currency converter', serviceUrl: 'https://cconverter.com/api' },
  ],
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
      return { ...state, creatingNewService: "success", }
    }
    case userServicesConstants.ADD_USER_SERVICE_FAILURE: {
      return { ...state, creatingNewService: "failure", }
    }

    case userServicesConstants.GET_USER_SERVICES_REQUEST: {
      return { ...state, loadingUserServices: true };
    }

    case userServicesConstants.GET_USER_SERVICES_SUCCESS: {
      const nextState = { ...state };
      nextState.data = action.data.detail;
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