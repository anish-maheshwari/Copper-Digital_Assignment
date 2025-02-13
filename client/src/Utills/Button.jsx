import React from "react";

const Button = ({ children, onClick, className, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
