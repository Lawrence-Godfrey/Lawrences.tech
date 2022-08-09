import React, { useEffect } from "react";
import { Logo, Alert } from "../components";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import { LockClosedIcon } from '@heroicons/react/solid'


const Register = () => {
    const navigate = useNavigate();

    // Global variables
    const { user, isLoading, showAlert, displayAlert, clearAlert, registerUser } = useAppContext()

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log(e.currentTarget.elements)
        // Check that all the values that need to be submitted are present.
        // Only need to check the name if it's not a member, i.e., the
        // user is registering and not logging in.
        // const { name, email, password } = e.currentTarget.elements
        // if (!email || !password || !name) {
        //     displayAlert()
        //     clearAlert()
        // }
        //
        // const currentUser = { name, email, password }
        //
        // registerUser(currentUser)

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

                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register an Account</h2>

                    <p className="mt-2 text-center text-sm text-gray-600">
                        Already have an account? {'  '}
                        <a href="/login" className="font-medium text-orange-600 hover:text-orange-500">
                            Sign In
                        </a>
                    </p>
                </div>

                { showAlert && <Alert /> }

                <form className='mt-8 space-y-6' onSubmit={onSubmit}>

                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="username"
                                autoComplete="username"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                                placeholder="Username"
                            />
                        </div>
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-m-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
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
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                            disabled={isLoading}
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                              <LockClosedIcon className="h-5 w-5 text-orange-500 group-hover:text-orange-400" aria-hidden="true" />
                            </span>
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;