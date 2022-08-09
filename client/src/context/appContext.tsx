import React, { useReducer, useContext } from "react";
import reducer from "./reducer";
import {
    CLEAR_ALERT,
    DISPLAY_ALERT, LOGIN_USER_BEGIN,
    LOGIN_USER_ERROR, LOGIN_USER_SUCCESS,
    REGISTER_USER_BEGIN,
    REGISTER_USER_ERROR,
    REGISTER_USER_SUCCESS
} from "./actions";

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const location = localStorage.getItem('location')


const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: user ? JSON.parse(user) : null,
    token: token,
    userLocation: location ? location : '',
    displayAlert: null,
    clearAlert: null,
    registerUser: null,
    loginUser: null,
}

const AppContext = React.createContext(initialState)

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT })
    }

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT })
        }, 3000)
    }

    const addUserToLocalStorage = ({ user, token }) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
    }

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }

    const registerUser = async (currentUser) => {
        dispatch({ type: REGISTER_USER_BEGIN })

        // try {
        //     const response = await axios.post('/api/auth/register', currentUser)
        //     const { user, token } = response.data;
        //     dispatch({ type: REGISTER_USER_SUCCESS, payload: { user, token } })
        //     addUserToLocalStorage({ user, token })
        // } catch (error) {
        //     console.log(error)
        //     dispatch({
        //         type: REGISTER_USER_ERROR,
        //         payload: {
        //             message: error.response.data.message,
        //             status: error.response.data.status,
        //             errors: error.response.data.errors
        //         }
        //     })
        // }

        clearAlert()
    }

    const loginUser = async (currentUser) => {
        dispatch({ type: LOGIN_USER_BEGIN })

        // try {
        //     const response = await axios.post('/api/auth/login', currentUser)
        //     const { user, token } = response.data;
        //     dispatch({ type: LOGIN_USER_SUCCESS, payload: { user, token } })
        //     addUserToLocalStorage({ user, token })
        // } catch (error) {
        //     console.log(error)
        //     dispatch({
        //         type: LOGIN_USER_ERROR,
        //         payload: {
        //             message: error.response.data.message,
        //             status: error.response.data.status,
        //             errors: error.response.data.errors
        //         }
        //     })
        // }

        clearAlert()
    }

    return (
        <AppContext.Provider value={{ ...state, displayAlert, clearAlert, registerUser, loginUser }}>
    { children }
    </AppContext.Provider>
)
}

const useAppContext = () => {
    return useContext(AppContext)
};

export { AppProvider, initialState, useAppContext }