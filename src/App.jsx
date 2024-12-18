/* eslint-disable react/prop-types */
import './App.css'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Login from './containers/auth/login'
import Register from './containers/auth/register'
import Dashboard from './containers/dashboard'

import { Navigate } from 'react-router-dom'
import PageNotFound from './components/404-not-found'

export const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('accessToken');
  return isAuthenticated ? children : <Navigate to="/" />;
};

PrivateRoute;


const AppRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/create-account' exact element={<Register />} />
          <Route
            path='/dashboard'
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<PageNotFound />} />

        </Routes>
      </Router>
    </>
  )
}


function App() {

  return (
    <>
      {/* Same as */}
      <ToastContainer />
      <AppRoutes />
    </>
  )
}

export default App
