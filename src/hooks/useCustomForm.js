import React from "react";

export function useCustomForm(
    initialValues,
    submitHandler
) {
    const [state, setState] = React.useState(initialValues);
    const [errors, setErrors] = React.useState({});
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [isDisabled, setIsDisabled] = React.useState(true);

    const handleChange = (e) => {
        if (e.target.value.length > 0) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        setErrors({});

        const setError = (error) => {
            setErrors([error]);
        };

        try {
            await submitHandler(state, setError);
            // resetForm();
        } catch (e) {
            if (e.response && e.response.data && e.response.data.errors) {
                setErrors(e.response.data.errors);
            } else {
                console.error(e);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setState(initialValues);
        setIsDisabled(true);
        setIsSubmitting(false);
        setErrors([]);
    };

    return {
        state,
        setState,
        errors,
        isSubmitting,
        setIsSubmitting,
        isDisabled,
        setIsDisabled,
        handleChange,
        handleSubmit,
        resetForm,
    };
}