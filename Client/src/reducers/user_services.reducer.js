import { userServicesConstants } from '_constants';

const defaultState = {
  loadingUserServices: false,
  showDefineServiceDialog: false,
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
    default:
      return state
  }
}