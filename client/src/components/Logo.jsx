import logo from '../assets/images/logo.svg';
import React from 'react';

const Logo = () => {
    return (
        <a href="/" className="flex items-center justify-center mb-6 text-2xl
             font-semibold text-gray-900 dark:text-white mr-6">
            <img className="w-8 h-8 mr-2"
                src={logo}
                alt="logo"/>
            Lawrences.tech
        </a>
    );
};

export default Logo;
