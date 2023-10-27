import Label from "./label.jsx";

function DateTimePicker({className, ...rest }) {
    // Define the default classes
    const defaultClasses =
        'border border-gray-300 bg-white text-gray-600 text-base font-medium focus:shadow-md focus:ring-4 focus:ring-gray-500/20 focus:border-gray-600 block w-full p-2.5 outline-none';

    return (
        <>
            <div className={`mt-1 ${className || ''}`} style={{ display: 'flex' }}>
                <input
                    type="datetime-local"
                    className={defaultClasses}
                    {...rest}
                />
            </div>
        </>
    );
}

export default DateTimePicker;
