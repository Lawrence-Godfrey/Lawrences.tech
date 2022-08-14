import React, { useEffect } from "react";
import { Logo, Alert, UsernameField, PasswordField } from "../components";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import { LockClosedIcon } from "@heroicons/react/solid";

const Login = () => {
    const navigate = useNavigate();

    // Global variables
    const { user, isLoading, showAlert, displayAlert, clearAlert, loginUser } = useAppContext()

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const userDetails = {
            username: e.currentTarget.username.value,
            password: e.currentTarget.password.value
        }

        // Check that all the values that need to be submitted are present.
        // Only need to check the name if it's not a member, i.e., the
        // user is registering and not logging in.
        const { username, password } = userDetails;
        if (!password || !username) {
            displayAlert()
            clearAlert()
        }

        loginUser(userDetails)
    }

    // Navigate to the home page if the user object is not null.
    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user, navigate])

    return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <Logo />

                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>

                    <p className="mt-2 text-center text-sm text-gray-600">
                        Don't have an account? {' '}
                        <a href="/register" className="font-medium text-orange-600 hover:text-orange-500">
                            Register
                        </a>
                    </p>
                </div>

                <form className='mt-8 space-y-6' onSubmit={onSubmit}>

                    { showAlert && <Alert /> }

                    <div className="rounded-md shadow-sm -space-y-px">
                        <UsernameField roundingType="rounded-t-md" />
                        <PasswordField roundingType="rounded-b-md" />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>
                        <div className="text-sm">
                            <a href="/forgot-password" className="font-medium text-orange-600 hover:text-orange-500">
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                            disabled={isLoading}
                        >
                            { isLoading &&
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                  <LockClosedIcon className="h-5 w-5 text-orange-500 group-hover:text-orange-400" aria-hidden="true" />
                                </span>
                            }
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;