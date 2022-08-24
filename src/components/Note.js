import { React, useContext, useEffect, useRef, useState } from 'react'
import { useHref } from 'react-router-dom';
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem'

export default function Note() {
    // Destructing the context provider values
    let { notes, fetchNotes, editNote } = useContext(noteContext)
    useEffect(() => {
        fetchNotes()
    }, []);


    const [sNote, setNote] = useState({ eid: "", etitle: "", edescription: "", etag: "" })

    const ref_function = useRef("")
    const updateNote = (note) => { 
        ref_function.current.click()
        setNote({ eid: note._id, etitle: note.title, edescription: note.description, etag: note.tag })
        console.log(sNote.eid, sNote.etitle, sNote.edescription, sNote.etag)

    }

    let onClick = (e) => {
        if (sNote.etitle === "" || sNote.edescription === "") {
            console.log("Note title is empty or note description is empty")
        }
        else {
            editNote(sNote.eid, sNote.etitle, sNote.edescription, sNote.etag)
        }

    }

    // When the title and the description and the tag field change this function will fire and it will set the current state as it is and update targated name as key and its value in the state
    let onChange = (e) => {
        setNote({ ...sNote, [e.target.name]: e.target.value })
    }


    return (
        <>
            <button ref={ref_function} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form action='' method=''>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Note Title</label>
                                    <input value={sNote.etitle} onChange={onChange} type="text" className="form-control" id="title" name="etitle" aria-describedby="emailHelp" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Note Tag</label>
                                    <input value={sNote.etag} name="etag" onChange={onChange} type="text" className="form-control" id="tag" aria-describedby="emailHelp" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Note Description</label>
                                    <textarea value={sNote.edescription} name="edescription" onChange={onChange} type="text" rows="10" className="form-control" id="description" required />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={onClick} data-bs-dismiss="modal">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>Your Notes </h2>
                <div className="container mx-2 my-2">
                    <h5>{notes.length === 0 && "No notes to display"}</h5>
                </div>
                {/* Looping over the notes  */}
                {notes.map((note) => {
                    return <Noteitem key={note._id} note={note} updateNote={updateNote} />
                })}
            </div>
        </>
    )
}
