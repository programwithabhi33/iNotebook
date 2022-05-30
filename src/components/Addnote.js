import { React, useContext,useState } from 'react'
import noteContext from '../context/notes/noteContext'

export default function Addnote() {
     
    //  Destructuring the addNote function that context provide
     let {addNote}= useContext(noteContext)
     
    //  Defining the note state here
     let [note,setNote] = useState({title:"",description:"",tag:""})
    
     
     let onClick = (e)=>{
         e.preventDefault()
         if(note.title==="" || note.description===""){
           console.log("Note title is empty or note description is empty")
         }
         else{
             addNote(note.title,note.description,note.tag)
         }

     }

     let onChange = (e)=>{
          setNote({...note,[e.target.name]:e.target.value})
     }

    return (
        <>
            <div className="container my-3">
                <h2>Add Notes</h2>
                <form action='' method=''>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Note Title</label>
                        <input onChange={onChange} type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" required />
                        <div id="emailHelp" className="form-text">We'll never share your notes with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Note Tag</label>
                        <input name="tag" onChange={onChange} type="text" className="form-control" id="tag" aria-describedby="emailHelp" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Note Description</label>
                        <textarea name="description" onChange={onChange} type="text" rows="10" className="form-control" id="description" required/>
                    </div>
                    <button  type="submit" onClick={onClick} className="btn btn-primary">Add Note</button>
                </form>
            </div>
        </>
    )
}
