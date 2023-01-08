import Actions from "./actions";
import { initialState } from "./appContext";


const reducer = (state: any, action: any) => {
    if (action.type === Actions.DISPLAY_ALERT) {
        const alertType = action.payload.alertType || "danger";
        const text = action.payload.text || "Something went wrong";

        return {...state, showAlert: true, alertType: alertType, alertText: text};
    }

    if (action.type === Actions.CLEAR_ALERT) {
        return {...state, showAlert: false, alertType: '', alertText: ''};
    }

    if (action.type === Actions.REGISTER_USER_BEGIN) {
        return {...state, isLoading: true};
    }

    if (action.type === Actions.REGISTER_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            user: action.payload.user,
            showAlert: true,
            alertType: 'success',
            alertText: 'Successfully registered'
        };
    }

    if (action.type === Actions.REGISTER_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.message
        };
    }

    if (action.type === Actions.LOGIN_USER_BEGIN) {
        return {...state, isLoading: true};
    }

    if (action.type === Actions.LOGIN_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            user: action.payload.user,
            showAlert: false,
        };
    }

    if (action.type === Actions.LOGIN_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.message
        };
    }


    if (action.type === Actions.LOGOUT_USER) {
        return { ...initialState };
    }

    if (action.type === Actions.SET_USER) {
        return { ...state, user: action.payload.user };
    }


    throw new Error(`no such action: ${action.type}`);
};

export default reducer;