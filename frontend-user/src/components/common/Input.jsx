function Input({ type = "text", placeholder, value, onChange, name, required = false, className = "" }) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className={`w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
    />
  );
}

export default Input;
