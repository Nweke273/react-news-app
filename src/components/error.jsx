const Error = ({ errors, field, className, ...rest }) => {
    return (
        errors[field] && (
            <div className={`text-rose-500 text-sm ${className}`} {...rest}>
                {errors[field]}
            </div>
        )
    );
};

export default Error;
