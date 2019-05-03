import { availableServicesContants as services } from '_constants';

const defaultState = {
    loading: false,
    error: false,
    data: {}, // all available services that the main-user can choose
}

export function availableServices(state = defaultState, action) {

    switch (action.type) {
        case services.GET_ALL_SERVICES_REQUEST: {
            const nextState = { ...state };
            nextState.loading = true;
            return nextState;
        }

        case services.GET_ALL_SERVICES_SUCCESS: {
            const nextState = { ...state };
            const userServices = action.userServices.map((item) => {
                item["serviceType"] = "userService";
                return item;
            });

            nextState.data = [...userServices, ...action.allServices];
            nextState.loading = false;
            return nextState;
        }

        default:
            return state
    }
}
