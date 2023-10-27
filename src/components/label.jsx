const Label = ({ value, className, ...rest }) => {
    // Define the default classes
    const defaultClasses = "block font-medium text-sm text-gray-700";

    return (
        <label
            {...rest}
            className={`${defaultClasses} ${className || ''}`}
        >
            {value || rest.children}
        </label>
    );
};

export default Label;
