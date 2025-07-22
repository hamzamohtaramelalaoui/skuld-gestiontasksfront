const Input = ({ label, ...props }) => {
    return (
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">{label}</label>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
          {...props}
        />
      </div>
    );
  };
  
  export default Input;
  