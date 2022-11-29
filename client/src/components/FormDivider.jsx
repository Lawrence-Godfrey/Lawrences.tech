import React from "react";

const FormDivider = (options) => {
    const { text } = options;

    return (
        <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-2/5 lg:w-2/5"></span>
                <p className="text-xs text-center text-gray-500 uppercase">{text}</p>
            <span className="border-b w-2/5 lg:w-2/5"></span>
        </div>
    )
}

export default FormDivider;