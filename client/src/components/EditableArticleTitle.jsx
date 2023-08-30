import React from 'react';


const EditableArticleTitle = ({ defaultText, onChange }) => {
    const handleTitleChange = (e) => {
        onChange(e.target.value); // notify the parent component
    };

    return (
        <div className="text-center">
            <input
                type="text"
                id="floating_title"
                className="text-center mx-auto w-1/2 border-0 p-2 text-3xl bg-transparent appearance-none
                            text-gray-700 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                defaultValue={defaultText}
                onChange={handleTitleChange}
                required
            />
        </div>
    );
};

export default EditableArticleTitle;
