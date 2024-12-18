/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { MdClose } from 'react-icons/md';
import Tags from '../Tags';
import { useDispatch, useSelector } from 'react-redux';
import { createNewNoteRequest, editNoteRequest, getUserNotes } from '../../../redux/notes/notesService';

const AddEditNote = ({ noteData, type, onClose, handleShowToastMsg }) => {
    console.log('notes data', noteData)
    const dispatch = useDispatch();
    const [title, setTitle] = useState(noteData?.title || "")
    const [content, setcontent] = useState(noteData?.content || "")
    const [tags, setTags] = useState(noteData?.tags || []);
    console.log('tagsss->', tags)
    const [error, setError] = useState(null)

    const [isTagging, setIsTagging] = useState(false); // Flag to indicate whether tagging is in progress


    const userInfo = useSelector((state) => state.auth.userInfo)
    const addNewNote = async () => {
        if (userInfo?._id) {
            dispatch(createNewNoteRequest({
                title: title,
                content: content,
                tags: tags,
                userId: userInfo?._id,
                callback: () => {
                    onClose();
                    dispatch(getUserNotes({ userId: userInfo?._id }))
                    handleShowToastMsg('Notes Added Success')
                }
            }))
        }
    }

    const editNote = async () => {
        if (noteData?._id && userInfo?._id) {
            dispatch(editNoteRequest({
                noteId: noteData?._id,
                title: title,
                content: content,
                tags: tags,
                userId: userInfo?._id,
                callback: () => {
                    onClose();
                    dispatch(getUserNotes({ userId: userInfo?._id }))
                    handleShowToastMsg('Notes Updated Success')

                }
            }))
        }
    }

    const handleAddNote = async () => {
        if (!title) {
            setError("Please Enter title");
            return;
        }
        if (!content) {
            setError("Please Enter content");
            return;
        }
        setError("");
        type === 'edit' ? editNote() : addNewNote()
    }

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const formData = new FormData(event.target);
    //     const title = formData.get('title');
    //     const content = formData.get('content');
    //     console.log({ title, content });
    //     // Add your validation logic here
    //     // Add your submission logic here
    //     event.target.reset(); // Reset the form
    // };

    return (
        <div className='relative'>
            <button className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50' onClick={() => onClose()}>
                <MdClose className='text-xl text-slate-400' />
            </button>

            <div className='flex flex-col gap-2'>
                <label className='input-label'>TITLE</label>
                <input type='text'
                    name='title'
                    className='text-2xl text-slate-950 outline-none'
                    placeholder='Go To Gym At 5'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label className='input-label'>CONTENT</label>
                <textarea name='content'
                    className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded'
                    placeholder='Content'
                    rows={10}
                    value={content}
                    onChange={(e) => setcontent(e.target.value)}
                />

                <div className='mt-3'>
                    <label className='input-label'>Tags</label>
                    <Tags tags={tags} setTags={setTags} setIsTagging={setIsTagging} />
                </div>


                {error && <p className='text-red-500 text-xs pt-4'>{error}</p>}

                <button type='submit' className='btn-primary font-medium mt-5 p-3' onClick={() => handleAddNote()}>
                    Add
                </button>
            </div>
        </div>
    );
};

export default AddEditNote;
