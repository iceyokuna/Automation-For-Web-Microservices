import { availableServicesContants } from '_constants';
import { availaleServicesActions } from 'services'

export const availableServicesActions = {
    getAllServices,
    getAllMethodsByServiceId,
};

function getAllServices() {
    return dispatch => {
        dispatch(request());
        availaleServicesActions.getAllServices().then(
            res => {
                const services = res.data; // receive list of all services and its all methods
                dispatch(success(services))
            }
        ).catch(error => dispatch(failure()))
    }

    function request() {
        return {
            type: availableServicesContants.GET_ALL_SERVICES_REQUEST
        }
    }

    function success(services) {
        return {
            type: availableServicesContants.GET_ALL_SERVICES_SUCCESS,
            allServices: services
        }
    }

    function failure() {
        return {
            type: availableServicesContants.GET_ALL_SERVICES_FAILURE
        }
    }
}

function getAllMethodsByServiceId(serviceId) {
    return dispatch => {

    }
}