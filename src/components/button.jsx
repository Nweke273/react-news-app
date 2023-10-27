import {Spinner} from "@nextui-org/react";

export default function Button({type = 'submit', isLoading = false, children, className, ...rest}){
    // Define the default classes
    const defaultClasses = "inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150";

    return (
        <button
            type={type}
            className={`${defaultClasses} ${className || ''}`}
            disabled={isLoading}
            {...rest}
        >
            {isLoading ?? <Spinner size={"sm"} className={"mr-2 border-b-white"} color={"default"}/>}
            {children}
        </button>
    );
}
