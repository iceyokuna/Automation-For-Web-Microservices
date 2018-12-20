import { availableServicesContants as services } from '_constants';

const defaultState = {
    loading: false,
    error: false,
    data: [] // all available services that the main-user can choose
}

export function availableServices(state = defaultState, action) {

    switch (action.type) {
        case services.GET_ALL_SERVICES_REQUEST: {
            const nextState = { ...state };
            nextState.loading = true;
            return nextState;
        } break;

        case services.GET_ALL_SERVICES_SUCCESS: {
            const nextState = { ...state };
            nextState.data = action.allServices;
            nextState.loading = false;
            return nextState;
        } break;


        default:
            return state
    }
}
