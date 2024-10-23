import React from 'react';

const Button = ({ label, icon: Icon, onClick, className }) => {
    return (
        <button 
            className={`flex items-center px-4 py-2 rounded text-white ${className}`} 
            onClick={onClick}
        >
            {Icon && <Icon className="mr-1" />}
            {label}
        </button>
    );
};

export default Button;