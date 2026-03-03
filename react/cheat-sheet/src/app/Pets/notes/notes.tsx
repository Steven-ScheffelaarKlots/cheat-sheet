'use client'

import React, { useState } from "react";

const NotesComponent: React.FC = () => {
  const [notes, setNotes] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  const addNote = () => {
    setNotes([...notes, input]);
    setInput("");
  };

const deleteNote = (index: number) => {
    setNotes(notes.filter((_, i) => i !== index));
};

const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return (
    <div>
      <div>New Note</div>
      <input value={input} onChange={handleInputChange} />
      <button onClick={() => addNote()}>Add note</button>
      <div>
        <div>Notes</div>
        {notes.map((note, index) => (
          <div key={index}>
            <div>{note}</div>
            <button onClick={() => deleteNote(index)}>DELETE</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesComponent