import React, { useEffect, useState } from 'react';
import {
    Alert,
    UsernameField,
    PasswordField,
    EmailField,
    Logo,
    SubmitButton,
    GitHubOAuthButton,
    GoogleOAuthButton,
    FormDivider,
} from '../components';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const navigate = useNavigate();

    // Global variables
    const { user, isLoading, showAlert, displayAlert, clearAlert, registerUser } = useAppContext();

    const onSubmit = (e) => {
        e.preventDefault();

        const userDetails = {
            username: e.currentTarget.username.value,
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value,
        };

        // Check that all the values that need to be submitted are present.
        // Only need to check the name if it's not a member, i.e., the
        // user is registering and not logging in.
        const { username, email, password } = userDetails;
        if (!email || !password || !username) {
            displayAlert();
            clearAlert();
        }

        registerUser(userDetails);
    };

    // Navigate to the home page if the user object is not null.
    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const [formInput, setFormInput] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [formError, setFormError] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    useEffect(() => {
        if (formInput.password && formInput.confirmPassword && (formInput.password !== formInput.confirmPassword)) {
            setFormError(
                (formError) => ({
                    ...formError,
                    confirmPassword: 'Passwords do not match',
                }),
            );
        } else {
            setFormError(
                (formError) => ({
                    ...formError,
                    confirmPassword: '',
                }),
            );
        }
    }, [formInput]);

    const handleUserInput = (name, value) => {
        setFormInput({
            ...formInput,
            [name]: value,
        });
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 max-h-screen overflow-y-auto h-screen pt-16 pb-16">
            <Logo/>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen
             lg:py-0 max-h-screen">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0
                 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl
                         dark:text-white">
                            Create an Account
                        </h1>

                        {showAlert && <Alert/>}

                        <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
                            <UsernameField/>
                            <EmailField/>
                            <PasswordField label="Password" htmlFor="password" id="password" name="password"
                                onChange={({ target }) => {
                                    handleUserInput(target.name, target.value);
                                }}/>
                            <PasswordField
                                label="Confirm Password" htmlFor="confirm_password" id="confirm_password"
                                name="confirmPassword"
                                onChange={({ target }) => {
                                    handleUserInput(target.name, target.value);
                                }}
                                error={formError.confirmPassword}/>

                            <SubmitButton text="Create an Account" isLoading={isLoading}/>

                        </form>

                        <FormDivider text="OR"/>

                        <GoogleOAuthButton text="Sign Up with Google"/>
                        <GitHubOAuthButton text="Sign Up with GitHub"/>


                        <br></br>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account?&nbsp;
                            <a href="/login" className="font-medium text-primary-600 hover:underline
                             dark:text-primary-500">
                                Login here
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
