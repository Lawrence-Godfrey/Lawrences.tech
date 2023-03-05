import React from 'react';
import logo from '../assets/images/logo-large.png';

const Logo = ({ className = 'mx-auto w-96 mb-20' }) => {
    return (
        <a href="/" >
            <img className={ className } src={logo}
                alt="logo" crossOrigin="anonymous" />
        </a>
    );
};

export default Logo;
