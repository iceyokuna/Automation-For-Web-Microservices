import { availableServicesContants as services } from '_constants';

const defaultState = {
    loading: false,
    error: false,
    data: [],
}

export function providedServices(state = defaultState, action) {

    switch (action.type) {
        case services.GET_ALL_SERVICES_REQUEST: {
            const nextState = { ...state };
            nextState.loading = true;
            return nextState;
        }

        case services.GET_ALL_SERVICES_SUCCESS: {
            const nextState = { ...state };
            nextState.data = action.providedServices;
            nextState.loading = false;
            return nextState;
        }

        default:
            return state
    }
}
