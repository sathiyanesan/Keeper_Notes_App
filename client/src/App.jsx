import React, { Fragment, useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  const getAllNotes = async () => {
    try {
      const response = await fetch("http://localhost:5000/notes");
      const allNotes = await response.json();
      setNotes(allNotes);

    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getAllNotes()
  }, [])

  async function addNote(newNote) {
    const body = newNote;
    const addNewNote = await fetch("http://localhost:5000/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
    window.location = "/";
  }

  async function deleteNote(id) {
    const deleteNote = await fetch(`http://localhost:5000/notes/${id}`, {
      method: "DELETE"
    })
    setNotes(notes.filter((noteItem) => {
      return noteItem.id !== id;
    }));

  }


  return (
    <Fragment>
      <div>
        <Header />
        <CreateArea onAdd={addNote} />
        {notes.map((noteItem, index) => {

          return (
            <Note
              key={noteItem.id}
              id={noteItem.id}
              title={noteItem.title}
              content={noteItem.description}
              onDelete={deleteNote}
            />
          );
        })}

        <Footer />
      </div>
    </Fragment>

  );
}

export default App;









// function App() {
//   const [notes, setNotes] = useState([]);

//   function addNote(newNote) {
//     setNotes(prevNotes => {
//       return [...prevNotes, newNote];
//     });
//   }

//   function deleteNote(id) {
//     setNotes(prevNotes => {
//       return prevNotes.filter((noteItem, index) => {
//         return index !== id;
//       });
//     });
//   }

//   return (
//     <div>
//       <Header />
//       <CreateArea onAdd={addNote} />
//       {notes.map((noteItem, index) => {
//         return (
//           <Note
//             key={index}
//             id={index}
//             title={noteItem.title}
//             content={noteItem.content}
//             onDelete={deleteNote}
//           />
//         );
//       })}
//       <Footer />
//     </div>
//   );
// }

// export default App;