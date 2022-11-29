import React from "react";
import FormField from "./FormField";


const UsernameField = (options) => {
    return (
        <FormField {...options} type="text" autoComplete="username" id="username" name="username" label="Username"
                   placeholder="name.surname" htmlFor="username"/>
    );
}


export default UsernameField;