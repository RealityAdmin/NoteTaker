import './App.css';
import { useState } from 'react';
import Draggable from 'react-draggable';
import uuid from 'react-uuid';

function Note({id, content, onWrite, onDelete}){
  return (
    <Draggable bounds="parent" axis='both' handle='.note-header'>
      <div className='note'>
        <div className='note-header'>
          <button onClick={() => onDelete(id)}>X</button>
        </div>
        <textarea className='note-write'
          value={content}
          placeholder='Type something'
          onChange={(e) => onWrite(e.target.value)}
        />
      </div>
    </Draggable>
  )
}

function App() {
  const [notes, setNotes] = useState([]);
  function handleOnChange(key, content){
    console.log("A note was changed to ", content);
    setNotes(notes.map((note) => (note.id === key ? { ...note, content } : note)));
  }
  function handleOnDelete(key){

    setNotes(notes.filter(note => note.id !== key));
  }
    return (
      <div className="App">
        <h1>THIS IS A TEST</h1>
        <button onClick={() => {
          setNotes(
            [
              ...notes,
              {id: uuid(), content: ''}
            ]
          );
          console.log(notes);
        }}>+</button>
        <pre>{JSON.stringify(notes)}</pre>
        <div className="whiteboard">
          {notes.map((note) => {
            return(
              <Note 
                key={note.id} 
                id={note.id} 
                content={note.content} 
                onWrite={(value) => handleOnChange(note.id, value)}
                onDelete={handleOnDelete}
              />
            );
          })}
        </div>
      </div>
    );
  }

export default App;
