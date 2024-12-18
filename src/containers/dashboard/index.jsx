/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useState } from 'react'
import { MdAdd } from 'react-icons/md'
import Modal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../../components/Nav-bar'
import NoteCard from '../../components/Note-card'
import { deleteNoteRequest, getUserNotes, pinNoteRequest, searchNoteRequest } from '../../redux/notes/notesService'
import AddEditNote from './AddEditNote'
import { useNavigate } from 'react-router-dom'
import Login from '../auth/login'
import { ToastContainer } from 'react-toastify'
import EmptyCard from '../../components/not-found/EmptyCard'
import Toast from '../../components/Toast'
import Loader from '../../components/Loader'
import moment from 'moment';


const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuth = useSelector((state) => state.auth.isAuth);
    const isFetching = useSelector((state) => state.note.loading)

    useEffect(() => {
        if (!isAuth) {
            navigate('/')
        }
    }, [isAuth, navigate])


    const [opneAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: 'add',
        data: null
    });

    const [showToastMsg, setShowToastMsg] = useState({
        isShown: false,
        message: "",
        type: ""
    })

    const userInfo = useSelector((state) => state.auth.userInfo);
    const userNotes = useSelector((state) => state.note.userNotes);

    console.log('user notes', userNotes)

    useEffect(() => {
        if (userInfo && userInfo._id) {
            dispatch(getUserNotes({ userId: userInfo._id }))
        }
    }, [userInfo, dispatch])

    const handleEdit = (noteInfo) => {
        setOpenAddEditModal({ isShown: true, type: 'edit', data: noteInfo });
    }

    const handlePinNote = (noteId, isPin) => {
        dispatch(pinNoteRequest({
            noteId: noteId,
            isPinned: !isPin,
            callback: () => dispatch(getUserNotes({ userId: userInfo._id }))
        }))
    }

    const handleSerachNote = async (query) => {
        dispatch(searchNoteRequest({ query: query, userId: userInfo?._id }))
    }

    const handleClearSearch = () => {
        if (userInfo && userInfo._id) {
            dispatch(getUserNotes({ userId: userInfo._id }))
        }
    }

    const handleDelete = (noteId) => {
        dispatch(deleteNoteRequest({
            noteId: noteId,
            callback: () => {
                dispatch(getUserNotes({ userId: userInfo._id }));
                handleShowToastMsg('Notes Deleted', 'delete')

            }
        }))
    }

    const handleShowToastMsg = (message, type) => {
        setShowToastMsg({
            isShown: true,
            message: message,
            type: type
        })
    }


    const handlecloasToast = () => {
        setShowToastMsg({
            isShown: false,
            message: ''
        })
    }

    return (
        <>
            {!isAuth ? <Login /> :
                <>
                    <Navbar handleSerachNote={handleSerachNote} handleClearSearch={handleClearSearch} />

                    <div className='container mx-auto'>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8'>
                            {userNotes && userNotes.length > 0 ? userNotes.map((item, index) => {
                                return (
                                    <Fragment key={`card-${index}`}>
                                        <NoteCard
                                            title={item.title}
                                            date={moment(item.createdAt).format('Do MMM YYYY')}
                                            content={item.content}
                                            isPinned={item.isPinned}
                                            onEdit={() => handleEdit(item)}
                                            onDelete={() => handleDelete(item._id)}
                                            onPinned={() => handlePinNote(item._id, item.isPinned)}
                                            tags={item.tags}
                                        />
                                    </Fragment>
                                )
                            }) : (
                                <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center items-center h-full">
                                    <EmptyCard
                                        imgSrc={"https://www.svgrepo.com/show/379760/add-note.svg"}
                                        message={"No Notes found"}
                                    />
                                </div>
                            )}
                        </div>
                    </div >

                    <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-500 hover:bg-blue-600 fixed bottom-10 md:bottom-4 lg:bottom-4 right-4 md:right-10 lg:right-10 z-10'
                        onClick={() => {
                            setOpenAddEditModal({ isShown: true, type: 'add', data: null })
                        }}>
                        <MdAdd className='text-[32px] text-white' />
                    </button>

                    <Modal
                        isOpen={opneAddEditModal.isShown}
                        onRequestClose={() => null}
                        style={{
                            overlay: {
                                backgroundColor: "rgba(0,0,0, 0.2)"
                            }
                        }}
                        contentLabel=''
                        className='w-[90%] md:w-[50%] lg:w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5'
                    >
                        <AddEditNote
                            noteData={opneAddEditModal.data}
                            type={opneAddEditModal.type}
                            onClose={() => setOpenAddEditModal({ isShown: false, type: 'add', data: null })}
                            handleShowToastMsg={handleShowToastMsg}
                        />
                    </Modal>

                    <Toast
                        isShown={showToastMsg.isShown}
                        message={showToastMsg.message}
                        type={showToastMsg.type}
                        onClose={handlecloasToast}
                    />

                </>
            }
            {isFetching && <Loader />}

        </>
    )
}

export default Dashboard
