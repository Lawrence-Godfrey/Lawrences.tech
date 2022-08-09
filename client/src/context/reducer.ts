import {
    DISPLAY_ALERT,
    CLEAR_ALERT,
    REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR
} from "./actions";

const reducer = (state: any, action: any) => {
    if (action.type === DISPLAY_ALERT) {
        return {...state, showAlert: true, alertType: 'danger', alertText: 'Please fill in all fields'};
    }

    if (action.type === CLEAR_ALERT) {
        return {...state, showAlert: false, alertType: '', alertText: ''};
    }

    if (action.type === REGISTER_USER_BEGIN) {
        return {...state, isLoading: true};
    }

    if (action.type === REGISTER_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            user: action.payload.user,
            token: action.payload.token,
            userLocation: action.payload.user.location,
            jobLocation: action.payload.user.location,
            showAlert: true,
            alertType: 'success',
            alertText: 'Successfully registered'
        };
    }

    if (action.type === REGISTER_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.message
        };
    }

    if (action.type === LOGIN_USER_BEGIN) {
        return {...state, isLoading: true};
    }

    if (action.type === LOGIN_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            user: action.payload.user,
            token: action.payload.token,
            userLocation: action.payload.user.location,
            jobLocation: action.payload.user.location,
            showAlert: true,
            alertType: 'success',
            alertText: 'Successfully logged in'
        };
    }

    if (action.type === LOGIN_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.message
        };
    }

    throw new Error(`no such action: ${action.type}`);
};

export default reducer;