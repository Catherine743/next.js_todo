"use client"

import { useState } from 'react';

export default function Home() {
  const [noteData, setNoteData] = useState({
    title: "", description: ""
  });

  const handleAddNote = () => {
    const { title, description } = noteData

    if (!title || !description) {
      alert("Please fill the fields")
    }
    else {
      // api call
      const response = fetch("/api/notes", {
        method: "POST",
        body: JSON.stringify(noteData)
      })
      console.log(response)
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="bg-gray-300 block max-w-sm m-5 p-6 border border-default rounded-base shadow-xs hover:bg-neutral-secondary-medium">
        <h1 className="text-3xl text-blue-600 text-center mb-3 tracking-tight text-heading">Create a Note</h1>
        <form action="">
          <input value={noteData.title} onChange={(e) => setNoteData({ ...noteData, title: e.target.value })} type="text" placeholder="Enter your note..." className="p-2 mb-3 border border-gray-200 w-full text-white bg-gray-800 placeholder:text-gray-500" />
          <textarea value={noteData.description} onChange={(e) => setNoteData({ ...noteData, description: e.target.value })} placeholder="Enter your note..." className="p-2 mb-3 border border-gray-200 w-full text-white bg-gray-800 placeholder:text-gray-500"></textarea>
          <div className="grid">
            <button className="bg-green-500 p-2 text-white" onClick={handleAddNote}>Submit</button>
          </div>
        </form>
      </div>

      {/* display area */}
      <div className="bg-gray-300 block max-w-sm m-5 p-6 border border-default rounded-base shadow-xs hover:bg-neutral-secondary-medium">
        <h2 className="text-2xl text-blue-600 mb-3 tracking-tight text-heading leading-8">Your Notes:</h2>
        <p className="text-body text-black">Here are the biggest technology acquisitions of 2025 so far, in reverse chronological order.</p>
      </div>
      <div className="flex gap-2">
        <button className="bg-blue-500 p-2 text-white">Edit</button>
        <button className="bg-red-500 p-2 text-white">Delete</button>
      </div>
    </div>
  );
}
