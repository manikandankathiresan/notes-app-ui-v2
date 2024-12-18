/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../../../components/PasswordInput';
import { validateEmail } from '../../../utils/helper';
import { useDispatch, useSelector } from 'react-redux';
import { createUserRequest } from '../../../redux/auth/authService';
import Loader from '../../../components/Loader';

const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const isFetching = useSelector((state) => state.auth.loading);

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!firstName.trim()) {
            setError('Please Enter Your First Name');
            return;
        }
        if (!lastName.trim()) {
            setError('Please Enter Your Last Name');
            return;
        }
        if (!validateEmail(email)) {
            setError('Please Enter a Valid Email Address');
            return;
        }
        if (!password) {
            setError('Please Enter a Password');
            return;
        }
        setError("");
        dispatch(createUserRequest({
            firstName,
            lastName,
            email,
            password,
            callback: () => navigate('/')
        }));
        // Perform registration logic here
    };

    return (
        <div className='flex items-center justify-center mt-28'>
            <div className="absolute inset-0 z-1">
                <img src='https://images.unsplash.com/photo-1544377208-215a63786183?q=80&w=3152&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt="Background" className="w-full h-full object-cover" />
            </div>
            <div className='w-96 border rounded bg-white px-7 py-10 relative z-10'>
                <form onSubmit={handleRegister}>
                    <h4 className='text-2xl mb-7'>Register</h4>
                    <input
                        type='text'
                        placeholder='First Name'
                        className='input-box'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                        type='text'
                        placeholder='Last Name'
                        className='input-box mt-4'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <input
                        type='text'
                        placeholder='Email'
                        className='input-box mt-4'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <PasswordInput
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='mt-4'
                    />
                    {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
                    <button type='submit' className='btn-primary mt-4'>
                        Register
                    </button>
                    <p className='text-sm text-center mt-4'>
                        Already Registered?{" "}
                        <Link to="/" className="font-medium text-primary underline">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
            {isFetching && <Loader />}
        </div>
    );
};

export default Register;
