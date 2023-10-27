import Label from "./label.jsx";

function Select({ label, className, children, ...rest }) {
    // Define the default classes
    const defaultClasses = "border border-gray-300 bg-white text-gray-600 text-base font-medium focus:shadow-md focus:ring-4 focus:ring-gray-500/20 focus:border-gray-600 block w-full px-2.5 py-[12.5px] outline-none";

    return (
        <>
            {label && <Label>{label}</Label>}
            <select
                className={`mt-1 ${defaultClasses} ${className || ''}`}
                {...rest}
            >
                {children}
            </select>
        </>
    );
}

export default Select;
