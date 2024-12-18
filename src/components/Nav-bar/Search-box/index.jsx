/* eslint-disable react/prop-types */
import { FaSearch } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";


const SearchBox = ({ value, onChange, handleSearch, onClearSearch }) => {
    return (
        <div className='w-[26rem] flex items-center px-4 bg-slate-100 rounded-md'>
            <input
                type='text'
                placeholder='Search Notes'
                className='w-full text-xs bg-transparent py-[12px] outline-none'
                value={value}
                onChange={onChange}
            />

            {value &&
                <FaDeleteLeft className='text-xl text-slate-500 cursor-pointer hover:text-black mr-3' onClick={onClearSearch} />
            }

            <FaSearch className='text-slate-400 cursor-pointer hover:text-black' onClick={handleSearch} />

        </div>
    )
}

export default SearchBox
