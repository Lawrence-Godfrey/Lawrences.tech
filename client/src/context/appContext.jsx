import React, { useReducer, useContext } from "react";
import reducer from "./reducer.js";
import Actions from "./actions";
import axios from "axios";

const user = localStorage.getItem('user')
const location = localStorage.getItem('location')


const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: user ? JSON.parse(user) : null,
    userLocation: location ? location : '',
    displayAlert: null,
    clearAlert: null,
    registerUser: null,
    loginUser: null,
}

const AppContext = React.createContext(initialState)

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const displayAlert = (text: string, alertType: string) => {
        if (!alertType) {
            alertType = 'danger'
        }

        dispatch({ type: Actions.DISPLAY_ALERT, payload: {text, alertType} })
    }

    const clearAlert = () => {
        dispatch({ type: Actions.CLEAR_ALERT })
    }

    const addUserToLocalStorage = ({ user }) => {
        localStorage.setItem('user', JSON.stringify(user))
    }

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('user')
    }

    const registerUser = async (userDetails) => {
        dispatch({ type: Actions.REGISTER_USER_BEGIN })

        try {
            const response = await axios.post('/api/auth/register', userDetails)
            const { user } = response.data;
            dispatch({ type: Actions.REGISTER_USER_SUCCESS, payload: { user } })
            addUserToLocalStorage({ user })
        } catch (error) {
            console.log(error)
            dispatch({
                type: Actions.REGISTER_USER_ERROR,
                payload: {
                    message: error.response.data.message,
                    status: error.response.data.status,
                    errors: error.response.data.errors
                }
            })
        }
    }

    const loginUser = async (userDetails) => {
        dispatch({ type: Actions.LOGIN_USER_BEGIN })

        try {
            const response = await axios.post('/api/auth/login', userDetails)
            const { user } = response.data;
            dispatch({ type: Actions.LOGIN_USER_SUCCESS, payload: { user } })
            addUserToLocalStorage({ user })
            // navigate to dashboard
            window.location.href = '/'

        } catch (error) {
            console.log(error)
            dispatch({
                type: Actions.LOGIN_USER_ERROR,
                payload: {
                    message: error.response.data.message,
                    status: error.response.data.status,
                    errors: error.response.data.errors
                }
            })
        }
    }

    const logoutUser = async () => {
        removeUserFromLocalStorage()
        // Delete the `connect.sid` cookie
        document.cookie = 'connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
        const response = await axios.get('/api/auth/logout')
        if (response.status === 200) {
            dispatch({ type: Actions.LOGOUT_USER })
            window.location.reload();
        }
    }

    return (
        <AppContext.Provider value={{ ...state, displayAlert, clearAlert, registerUser, loginUser, logoutUser }}>
        { children }
        </AppContext.Provider>
    )
}

const useAppContext = () => {
    return useContext(AppContext)
};

export { AppProvider, initialState, useAppContext }