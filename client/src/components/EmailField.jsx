import React from 'react';
import FormField from './FormField';


const EmailField = (options) => {
    return (
        <FormField {...options} type="email" autoComplete="email" id="email-address" name="email" label="Email Address"
            placeholder="name@company.com" htmlFor="email-address"/>
    );
};

export default EmailField;
