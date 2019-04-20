import { userServicesConstants } from '_constants';

export const userServicesActions = {
  toggleDefineServiceDialog,
}

function toggleDefineServiceDialog() {
  return {
    type: userServicesConstants.TOGGLE_DEFINE_SERVICE_DIALOG,
  }
}
