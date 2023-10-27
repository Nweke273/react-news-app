import React from 'react';

const Input = ({ disabled = false, className, ...rest }) => {
    // Define the default classes
    const defaultClasses = "border border-gray-300 bg-white text-gray-600 text-base focus:shadow-md focus:ring-4 focus:ring-gray-500/20 focus:border-gray-600 block w-full p-2.5 outline-none";

    return (
        <input
            disabled={disabled}
            {...rest}
            className={`${defaultClasses} ${className || ''}`}
        />
    );
};

export default Input;
