/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { LiaEdit } from 'react-icons/lia'
import { MdDeleteOutline, MdPushPin } from 'react-icons/md'

const NoteCard = ({ title, date, content, tags, isPinned, onEdit, onDelete, onPinned }) => {
    return (
        <div className='border rounded p-8 h-[14rem] bg-white hover:shadow-xl transition-all ease-in-out'>
            <div className='flex items-center justify-between'>
                <div>
                    <h6 className='text-md font-medium'>{title}</h6>
                    <span className='text-sm text-slate-500'>{date}</span>
                </div>

                <MdPushPin className={`icon-btn ${isPinned ? 'text-primary' : 'text-slate-300'}`} onClick={onPinned} />
            </div>

            <p className='text-xs text-slate-600 mt-[1.75rem]'>{content.slice(0, 100)}</p>

            <div className='flex items-center justify-between mt-[1.75rem]'>
                <div className='text-xs text-slate-500'>
                    {/* Map over the tags array and display them separately */}
                    {tags && tags.length > 0 && tags.map((tag, index) => (
                        <span key={index} className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 mr-2">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className='flex items-center gap-2'>
                    <LiaEdit className='icon-btn hover:text-green-600' onClick={onEdit} />
                    <MdDeleteOutline className='icon-btn hover:text-red-600' onClick={onDelete} />
                </div>

            </div>

        </div>
    )
}

export default NoteCard