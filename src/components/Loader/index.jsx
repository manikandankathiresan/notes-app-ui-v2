/* eslint-disable no-unused-vars */
import React from 'react';

const Loader = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center justify-center">
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                <p className="text-center text-lg font-medium text-gray-700">Loading...</p>
            </div>
        </div>
    );
}

export default Loader;
