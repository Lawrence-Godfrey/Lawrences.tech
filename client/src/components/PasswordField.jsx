import React from "react";


const PasswordField = (options) => {
    console.log(options.roundingType)
    const className = `appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-${options.roundingType}-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm`
    return (
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
                className={className}
                placeholder="Password"
            />
        </div>
    )
}


export default PasswordField;