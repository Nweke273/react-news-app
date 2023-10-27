function Radio({ id, name, checked, label, onChange }) {
    return (
        <div className="flex items-center">
            <input
                id={id}
                name={name}
                type="radio"
                checked={checked}
                onChange={onChange}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label htmlFor={id} className="ml-3 block text-sm font-medium text-gray-700">
                {label}
            </label>
        </div>
    );
}

export default Radio;
