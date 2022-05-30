import React, { useContext, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'

export default function Noteitem(props) {

    const { deleteNote } = useContext(noteContext)

    // Destruction the props value
    let { note ,updateNote } = props


    return (
        <>
            <div className="col-md-3 my-3">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex align-items-center">
                            <h5 className="card-title">{note.title}</h5>
                            <i className="far fa-trash-alt mx-3" onClick={() => { deleteNote(note._id) }}></i>
                            <i className="far fa-edit" onClick={() => { updateNote(note) }}></i>
                        </div>
                        <p className="card-text">{note.tag}</p>
                        <p className="card-text">{note.description}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
