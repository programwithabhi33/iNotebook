import newContext from "./noteContext";
import React, { useState } from 'react'


const NoteState = (props) => {
  const host = "http://localhost:5000"


  let initialNote = []

  // Defining the note state with initial value is initialNote
  let [notes, setState] = useState(initialNote)


  let fetchNotes = async () => {
    console.log("fetchnotes has been called")

    // Hitting our fetchnotes backend api with its arguments
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: 'GET',
      headers: {
        "Content-type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6IjYyODY1MDVhZjEyYTE1NmUzNTA5NTYxMiJ9LCJpYXQiOjE2NTI5Njk1NjJ9.zflkpLezUBIjSv0kYx9odf5Us9HmEv13GD93Cewthmo"

      },
    })
    // console.log("Under the fetchNotes")
    // Converting the response to valid json
    const notes = await response.json()
    // console.log(notes)

    // Setting the response json as current state
    setState(notes)

  }


  let addNote = async (title, description, tag) => {

    // Hitting the backend api
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6IjYyODY1MDVhZjEyYTE1NmUzNTA5NTYxMiJ9LCJpYXQiOjE2NTI5Njk1NjJ9.zflkpLezUBIjSv0kYx9odf5Us9HmEv13GD93Cewthmo"

      },
      // Passing the arguments with JSON.stringify
      body: JSON.stringify({ title, description, tag })
    })
    // Setting the response json as current state
    const note = await response.json()

    setState(notes.concat(note))

  }

  let deleteNote = async (noteId) => {
    // console.log("Deleting the corresponding note with id = ", noteId)

    const response = await fetch(`${host}/api/notes/deletenotes/${noteId}`, {
      method: 'DELETE',
      headers: {
        "Content-type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6IjYyODY1MDVhZjEyYTE1NmUzNTA5NTYxMiJ9LCJpYXQiOjE2NTI5Njk1NjJ9.zflkpLezUBIjSv0kYx9odf5Us9HmEv13GD93Cewthmo"

      },
    })
    // Setting the response json as current state
    const json = await response.json()
    // setState(json)
    console.log(json)

    const newNote = notes.filter((note) => { return note._id !== noteId })
    setState(newNote)


  }

  let editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: 'PUT',
      headers: {
        "Content-type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6IjYyODY1MDVhZjEyYTE1NmUzNTA5NTYxMiJ9LCJpYXQiOjE2NTI5Njk1NjJ9.zflkpLezUBIjSv0kYx9odf5Us9HmEv13GD93Cewthmo"

      },
      body: JSON.stringify({ title, description, tag })
    })
    const json = response.json()
    console.log(json)

    // Updatin the note in the frontend 
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title
        newNotes[index].description = description
        newNotes[index].tag = tag
        break;
      }
    }
    setState(newNotes)
  }

  return (
    //  Export the states and functions in value
    <newContext.Provider value={{ notes, addNote, deleteNote, editNote, fetchNotes }}>
      {props.children}
    </newContext.Provider>
  )

}

export default NoteState 