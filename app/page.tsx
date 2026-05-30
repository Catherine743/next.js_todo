"use client"

import { useState, useEffect } from 'react';

export default function Home() {
  const [noteData, setNoteData] = useState({
    title: "", description: ""
  });

  const [allNotes, setAllNotes] = useState([]);

  useEffect(() => {
    getNotes()
  }, [])

  const handleAddNote = async () => {
    const { title, description } = noteData

    if (!title || !description) {
      alert("Please fill the fields")
    }
    else {
      // api call
      const response = await fetch("/api/notes", {
        method: "POST",
        body: JSON.stringify(noteData)
      })
      console.log(response)
    }
  }

  const getNotes = async () => {
    const response = await fetch("/api/notes")
    setAllNotes(await response.json())
  }

  const deleteNotes = async (id: string) => {
    const response = await fetch(`/api/notes/${id}`, {
      method: "DELETE"
    })
    if (response.status == 200) {
      alert("Deleted successfully")
      getNotes()
    }
  }
  // console.log(allNotes)


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="bg-gray-300 block max-w-sm m-5 p-6 border border-default rounded-base shadow-xs hover:bg-neutral-secondary-medium">
        <h1 className="text-3xl text-blue-600 text-center mb-3 tracking-tight text-heading">Create a Note</h1>
        <div className="p-5 shadow w-full">
          <input value={noteData.title} onChange={(e) => setNoteData({ ...noteData, title: e.target.value })} type="text" placeholder="Enter your note..." className="p-2 mb-3 border border-gray-200 w-full text-white bg-gray-800 placeholder:text-gray-500" />
          <textarea value={noteData.description} onChange={(e) => setNoteData({ ...noteData, description: e.target.value })} placeholder="Enter your note..." className="p-2 mb-3 border border-gray-200 w-full text-white bg-gray-800 placeholder:text-gray-500"></textarea>
          <div className="grid">
            <button className="bg-green-500 p-2 text-white" onClick={handleAddNote}>Submit</button>
          </div>
        </div>
      </div>

      {/* display area */}
      {allNotes?.length > 0 ? allNotes.map((notes: any, index: number) => (
        <div key={index} className="bg-gray-300 block max-w-sm m-5 p-6 border border-default rounded-base shadow-xs hover:bg-neutral-secondary-medium fixed w-full">
          <h2 className="text-2xl text-blue-600 mb-3 tracking-tight text-heading leading-8">{notes.title}</h2>
          <p className="text-body text-black">{notes.description}</p>
          <div className="flex gap-2">
            <button className="bg-blue-500 p-2 text-white">Edit</button>
            <button className="bg-red-500 p-2 text-white" onClick={() => deleteNotes(notes?._id)}>Delete</button>
          </div>
        </div>
      )) : <p>Nothing to display</p>}
    </div>
  );
}
