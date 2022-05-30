import newContext from "./noteContext";
import React, { useState } from 'react'


const NoteState = (props) => {
  const host = "http://localhost:5000"


  let initialNote = []
  
  // Defining the note state with initial value is initialNote
  let [notes, setState] = useState(initialNote)


  let fetchNotes = async() => {
    
    // Hitting our fetchnotes backend api with its arguments
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: 'GET',
      headers: {
        "Content-type":"application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6IjYyODY1MDVhZjEyYTE1NmUzNTA5NTYxMiJ9LCJpYXQiOjE2NTI5Njk1NjJ9.zflkpLezUBIjSv0kYx9odf5Us9HmEv13GD93Cewthmo"

      },
    })
    // console.log("Under the fetchNotes")
    // Converting the response to valid json
    const json = await response.json()

    // Setting the response json as current state
    setState(json)

  }

  let addNote = async(title, description, tag) => {
    
    // Hitting the backend api
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',
      headers: {
        "Content-type":"application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6IjYyODY1MDVhZjEyYTE1NmUzNTA5NTYxMiJ9LCJpYXQiOjE2NTI5Njk1NjJ9.zflkpLezUBIjSv0kYx9odf5Us9HmEv13GD93Cewthmo"

      },
      // Passing the arguments with JSON.stringify
      body:JSON.stringify({title,description,tag})
    })
    // Setting the response json as current state
    const json = await response.json()

    console.log(json)
    fetchNotes()

  }

  let deleteNote =  async(noteId) => {
    // console.log("Deleting the corresponding note with id = ", noteId)

    const response = await fetch(`${host}/api/notes/deletenotes/${noteId}`, {
      method: 'DELETE',
      headers: {
        "Content-type":"application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6IjYyODY1MDVhZjEyYTE1NmUzNTA5NTYxMiJ9LCJpYXQiOjE2NTI5Njk1NjJ9.zflkpLezUBIjSv0kYx9odf5Us9HmEv13GD93Cewthmo"

      },
    })
    // Setting the response json as current state
    const json = await response.json()
    // setState(json)
    console.log(json)

    const newNote = notes.filter((note) => { return note._id !== noteId })
    setState(newNote)


  }

  let editNote = async(id,title,description,tag) => {
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: 'PUT',
      headers: {
        "Content-type":"application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6IjYyODY1MDVhZjEyYTE1NmUzNTA5NTYxMiJ9LCJpYXQiOjE2NTI5Njk1NjJ9.zflkpLezUBIjSv0kYx9odf5Us9HmEv13GD93Cewthmo"

      },
      body:JSON.stringify({title,description,tag})
    })
    const json = response.json()
    // fetchNotes()
    //  for (let index = 0; index < array.length; index++) {
    //    const element = array[index];
       
    //  }
      
    // }); 
  }

  return (
    //  Export the states and functions in value
    <newContext.Provider value={{ notes, addNote, deleteNote, editNote,fetchNotes,editNote}}>
      {props.children}
    </newContext.Provider>
  )

}

export default NoteState 