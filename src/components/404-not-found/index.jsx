// src/components/NotFound.js
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-6">
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <p className="text-xl mt-4 text-gray-700">Oops! The page you are looking for does not exist.</p>
        <button
          onClick={() => navigate('/')} 
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
