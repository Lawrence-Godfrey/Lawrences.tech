import React, { useEffect } from 'react';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';

import { Alert, PasswordField, EmailField } from '../components';
import SubmitButton from '../components/SubmitButton';
import FormDivider from '../components/FormDivider';
import GoogleOAuthButton from '../components/GoogleOAuthButton';
import GitHubOAuthButton from '../components/GitHubOAuthButton';

const Login = () => {
    const navigate = useNavigate();

    // Global variables
    const { user, isLoading, showAlert, displayAlert, clearAlert, loginUser } = useAppContext();

    const onSubmit = (e) => {
        e.preventDefault();

        const userDetails = {
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value,
            rememberMe: e.currentTarget.rememberMe.checked,
        };

        // Check that all the values that need to be submitted are present.
        // Only need to check the name if it's not a member, i.e., the
        // user is registering and not logging in.
        const { email, password } = userDetails;
        if (!password || !email) {
            displayAlert();
            clearAlert();
        }

        loginUser(userDetails);
    };

    // onClick function which directs the user to the backend oauth route
    const OAuthGoogle = () => {
        window.location.href = 'http://localhost:5050/api/auth/oauth/login/google';
    };

    const OAuthGitHub = () => {
        window.location.href = 'http://localhost:5050/api/auth/oauth/login/github';
    };

    // Navigate to the home page if the user object is not null.
    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    return (
        <div className="bg-gray-50 dark:bg-gray-900 max-h-screen overflow-y-auto h-screen pt-16 pb-16">
            <a href="#" className="flex items-center justify-center mb-6 text-2xl
             font-semibold text-gray-900 dark:text-white mr-6">
                <img className="w-8 h-8 mr-2"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                    alt="logo"/>
                Flowbite
            </a>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen
             lg:py-0 max-h-screen">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md
                 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900
                         md:text-2xl dark:text-white">
                            Sign In
                        </h1>

                        { showAlert && <Alert /> }

                        <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
                            <EmailField />
                            <PasswordField label="Password" htmlFor="password" id="password" name="password"/>

                            <SubmitButton text="Sign In" isLoading={isLoading} />

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input id="rememberMe" name="rememberMe" type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300
                                         text-primary-600 focus:ring-primary-500"/>
                                    <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                                            Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a href="/forgotPassword"
                                        className="font-medium text-primary-600 hover:underline">Forgot
                                        your password?</a>
                                </div>
                            </div>
                        </form>

                        <FormDivider text="OR" />

                        <GoogleOAuthButton text="Sign In with Google" onClick={ OAuthGoogle } />
                        <GitHubOAuthButton text="Sign In with GitHub" onClick={ OAuthGitHub } />


                        <br></br>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don&apos;t have an Account?&nbsp;
                            <a href="/register" className="font-medium text-primary-600
                             hover:underline dark:text-primary-500">
                                Sign Up Here
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
