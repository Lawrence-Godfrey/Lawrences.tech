import React from "react";


const UsernameField = () => {
    return (
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
    );
}


export default UsernameField;