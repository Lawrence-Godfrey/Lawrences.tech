import React from "react";

const SubmitButton = (options) => {
    const { isLoading, text } = options;

    return (
        <button type="submit"
                className={isLoading ? "w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 opacity-50 cursor-not-allowed" : "w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"}
                disabled={isLoading}>
            {text}
        </button>
    )
}

export default SubmitButton;