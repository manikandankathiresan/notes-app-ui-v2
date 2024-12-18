/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { MdAdd, MdClose } from 'react-icons/md';

const Tags = ({ tags, setTags, setIsTagging }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            setTags([...tags, inputValue.trim()]);
            setInputValue('');
        }
    };

    const handleRemoveTag = (index) => {
        const updatedTags = [...tags];
        updatedTags.splice(index, 1);
        setTags(updatedTags);
    };

    return (
        <div>
            {tags?.length > 0 && (
                <div className='flex items-center gap-2 flex-wrap mt-2'>
                    {tags.map((tag, index) => (
                        <span key={index} className='flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded'>
                            #{tag}
                            <MdClose className='cursor-pointer' onClick={() => handleRemoveTag(index)} />
                        </span>
                    ))}
                </div>
            )}

            <div className='flex items-center gap-4 mt-3'>
                <input
                    type='text'
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className='text-sm bg-transparent border px-3 py-2 rounded outline-none'
                    placeholder='Add tags'
                />

                <button
                    onClick={(e) => {
                        e.preventDefault();
                        if (inputValue.trim() !== '') {
                            setTags([...tags, inputValue.trim()]);
                            setInputValue('');
                        }
                    }}
                    className='w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700'
                >
                    <MdAdd className='text-2xl text-blue-700 hover:text-white' />
                </button>
            </div>
        </div>
    );
};

export default Tags;
