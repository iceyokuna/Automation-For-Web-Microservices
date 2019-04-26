import { userServicesConstants } from '_constants';
import {  } from 'services'

export const userServicesActions = {
  toggleDefineServiceDialog,

  getAllUserServics,
  addNewService,
}

function getAllUserServics() {
  return dispatch => {
    dispatch(request());

  }

  function request() {

  }

  function success() {

  }

  function failure() {

  }
}

function addNewService(service) {
  return dispatch => {

  }
}

function toggleDefineServiceDialog() {
  return {
    type: userServicesConstants.TOGGLE_DEFINE_SERVICE_DIALOG,
  }
}
