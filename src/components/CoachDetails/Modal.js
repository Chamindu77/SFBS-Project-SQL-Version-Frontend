// components/Modal/Modal.js
import React from 'react';

const Modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  return (
    // Modal background, covering the whole screen
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      {/* Modal content container */}
      <div className="bg-slate-100 p-6 rounded-lg shadow-lg w-3/4 max-w-2xl relative">
        {/* Close button in the top-right corner */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold text-2xl"
        >
          &times;
        </button>

        {/* Modal content (children passed from parent component) */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
