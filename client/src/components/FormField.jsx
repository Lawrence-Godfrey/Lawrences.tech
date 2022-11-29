import React from "react";


const FormField = (options) => {
    let { label, name, id, htmlFor, error, onChange, placeholder, autoComplete, type } = options;

    return (
        <div>
            <label htmlFor={htmlFor}
                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <input type={type} name={name} id={id} placeholder={placeholder} autoComplete={autoComplete}
                   className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${error ? "border-red-500" : ""}`}
                   required
                   onChange={onChange}
            />
            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                {error}
		    </span>
        </div>
    );
};


export default FormField;