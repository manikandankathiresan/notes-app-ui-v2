/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import ProfileInfo from '../Profile-info'
import SearchBox from './Search-box'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/auth/authSlice'

const Navbar = ({ handleSerachNote, handleClearSearch }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = () => {
        if (searchQuery) {
            handleSerachNote(searchQuery);
        }
    };
    const onClearSearch = () => {
        setSearchQuery("")
        handleClearSearch();
    };

    const onLogout = () => {
        dispatch(logout({
            callback: () => {
                localStorage.clear('token');
                navigate('/');
            }
        }))
    }

    return (
        <div>
            <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow h-16'>
                <h2 className='text-xl font-medium text-black py-2 flex items-center gap-3'>
                    <img className="object-scale-down h-[3.5rem] w-auto ml-2 cursor-pointer" src="https://cdn-icons-png.flaticon.com/512/564/564445.png" alt="logo" />
                    <span>Notes</span>

                </h2>

                {/* Search Bar */}
                <SearchBox
                    value={searchQuery}
                    onChange={({ target }) => {
                        setSearchQuery(target.value)
                    }}
                    handleSearch={() => handleSearch()}
                    onClearSearch={onClearSearch}
                />

                {/* Profile Info */}
                <ProfileInfo onLogout={onLogout} />
            </div>
        </div>
    )
}

export default Navbar
