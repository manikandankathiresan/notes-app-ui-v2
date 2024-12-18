/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';

const ProfileInfo = ({ onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='relative flex items-center gap-3'>
            <div className='w-12 h-12 mr-[2rem] flex items-center justify-center rounded-full text-slate-950 bg-slate-100 cursor-pointer' onClick={toggleDropdown}>
                MK
            </div>
            {isOpen && (
                <div ref={dropdownRef} className="absolute top-full right-0 mt-2 w-32 bg-white border border-gray-200 shadow-md rounded-md">
                    {/* <button className='block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100' onClick={onLogout}>Profile</button> */}
                    <hr className="h-px py-0 bg-gray-200 border-1 dark:bg-gray-700" />
                    <button className='block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100' onClick={onLogout}>Logout</button>

                </div>
            )}
        </div>
    );
};

export default ProfileInfo;
