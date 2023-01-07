import React from 'react';
import FormField from './FormField';


const PasswordField = (options) => {
    const { label, name, id, htmlFor, error, onChange } = options;

    return (
        <FormField label={label} name={name} id={id} htmlFor={htmlFor} error={error} onChange={onChange}
            placeholder="••••••••••••" autoComplete="current-password" type="password" />
    );
};


export default PasswordField;
