import { availableServicesContants, userServicesConstants } from '_constants';
import { availaleServicesActions } from 'services';
import { userService } from 'services'

export const availableServicesActions = {
    getAllServices,
    getAllMethodsByServiceId,
};

function getAllServices() {
    return (dispatch, getState) => {
        dispatch({
            type: availableServicesContants.GET_ALL_SERVICES_REQUEST
        });
        availaleServicesActions.getAllServices().then(
            res => {
                dispatch({
                    type: availableServicesContants.GET_ALL_SERVICES_SUCCESS,
                    providedServices: res.data,
                });
            }
        ).catch(error => dispatch({
            type: availableServicesContants.GET_ALL_SERVICES_FAILURE
        }))
    }
}

function getAllMethodsByServiceId(serviceId) {
    return dispatch => {

    }
}