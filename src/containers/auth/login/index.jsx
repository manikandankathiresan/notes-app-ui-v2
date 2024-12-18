/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../../../components/PasswordInput';
import { validateEmail } from '../../../utils/helper';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../../../redux/auth/authService';
import Loader from '../../../components/Loader';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState();

    const isAuthenticated = !!localStorage.getItem('accessToken');

    const isFetching = useSelector((state) => state.auth.loading)

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError('Please Enter a Valid Email Address');
            return;
        }
        console.log(password)
        if (!password) {
            setError('Please Enter a password..!')
            return;
        }
        setError("")
        dispatch(loginRequest({
            email: email,
            password: password,
            callback: () => navigate('/dashboard')
        }))
    }


    return (
        <div className='flex items-center justify-center mt-28'>
            <div className="absolute inset-0 z-1">
                <img src='https://images.unsplash.com/photo-1585435465945-bef5a93f8849?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt="Background" className="w-full h-full object-cover" />
            </div>
            <div className='w-96 border rounded bg-white px-7 py-10 relative z-10'>
                <form onSubmit={handleLogin}>
                    <h4 className='text-2xl mb-7'>Login</h4>
                    <input
                        type='text'
                        placeholder='Email'
                        className='input-box'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}

                    />

                    <PasswordInput
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

                    <button type='submit' className='btn-primary'>
                        Login
                    </button>

                    <p className='text-sm text-center mt-4'>
                        Not Registered Yet?{" "}
                        <Link to="/create-account" className="font-medium text-primary underline">
                            Create an Account
                        </Link>
                    </p>

                </form>
                {isFetching && <Loader />}
            </div>

        </div >

    );
};

export default Login;
