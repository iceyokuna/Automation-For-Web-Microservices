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
                const publicServices = res.data; // receive list of all services and its all methods
                userService.getUserServices().then(
                    res => {
                        const userServices = res.data;
                        dispatch({
                            type: availableServicesContants.GET_ALL_SERVICES_SUCCESS,
                            allServices: publicServices,
                            userServices
                        })
                    }
                ).catch(e => {
                    dispatch({ type: userServicesConstants.GET_USER_SERVICES_FAILURE });
                })
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