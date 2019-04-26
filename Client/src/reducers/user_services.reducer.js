import { userServicesConstants } from '_constants';

const defaultState = {
  loadingUserServices: false,
  showDefineServiceDialog: false,
  createNewService: false,
  data: [
    { serviceName: 'Currency converter', serviceUrl: 'https://cconverter.com/api' },
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
      return { ...state, createNewService: "loading", }
    }
    case userServicesConstants.ADD_USER_SERVICE_SUCCESS: {
      return { ...state, createNewService: "success", }
    }
    case userServicesConstants.ADD_USER_SERVICE_FAILURE: {
      return { ...state, createNewService: "failure", }
    }

    default:
      return state
  }
}