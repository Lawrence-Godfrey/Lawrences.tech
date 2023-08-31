import React, { useReducer, useContext } from 'react';
import reducer from './reducer.js';
import Actions from './actions';
import axios from 'axios';


const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: null,
    userLocation: '',
    displayAlert: null,
    clearAlert: null,
    registerUser: null,
    loginUser: null,
};

const AppContext = React.createContext(initialState);

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const displayAlert = (text, alertType) => {
        if (!alertType) {
            alertType = 'danger';
        }

        dispatch({ type: Actions.DISPLAY_ALERT, payload: { text, alertType } });
    };

    const clearAlert = () => {
        dispatch({ type: Actions.CLEAR_ALERT });
    };

    const registerUser = async (userDetails) => {
        dispatch({ type: Actions.REGISTER_USER_BEGIN });

        try {
            const response = await axios.post('/api/auth/register', userDetails);
            const { user } = response.data;
            dispatch({ type: Actions.REGISTER_USER_SUCCESS, payload: { user } });
        } catch (error) {
            console.log(error);
            dispatch({
                type: Actions.REGISTER_USER_ERROR,
                payload: {
                    message: error.response.data.message,
                    status: error.response.data.status,
                    errors: error.response.data.errors,
                },
            });
        }
    };

    const loginUser = async (userDetails) => {
        dispatch({ type: Actions.LOGIN_USER_BEGIN });

        try {
            const response = await axios.post('/api/auth/login', userDetails);
            const { user } = response.data;
            dispatch({ type: Actions.LOGIN_USER_SUCCESS, payload: { user } });
            // navigate to dashboard
            window.location.href = '/';
        } catch (error) {
            console.log(error);
            dispatch({
                type: Actions.LOGIN_USER_ERROR,
                payload: {
                    message: error.response.data.message,
                    status: error.response.data.status,
                    errors: error.response.data.errors,
                },
            });
        }
    };

    const logoutUser = async () => {
        // Delete the `connect.sid` cookie
        document.cookie = 'connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        const response = await axios.get('/api/auth/logout');
        if (response.status === 200) {
            dispatch({ type: Actions.LOGOUT_USER });
            window.location.reload();
        }
    };

    const getMe = async () => {
        // Makes a request to the backend to get the authenticated user
        // If the user is authenticated, a promise is returned with the user object
        // If the user is not authenticated reject is returned
        return new Promise((resolve, reject) => {
            axios
                .get('/api/auth/me')
                .then((response) => {
                    const { user } = response.data;
                    dispatch({ type: Actions.SET_USER, payload: { user } });
                    resolve(user);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    return (
        <AppContext.Provider value={{ ...state, displayAlert, clearAlert, registerUser, loginUser, logoutUser, getMe }}>
            { children }
        </AppContext.Provider>
    );
};

const useAppContext = () => {
    return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
