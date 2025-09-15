import { useState } from 'react'

function App() {
  const [notes, setNotes] = useState(
    [
      {
        title: "Trailhead observation", 
        body: "New signage at the kiosk."
      },
    ]
  )
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [query, setQuery] = useState("");   

   const visible = notes.filter(n => {
      const q = query.trim().toLowerCase();
      return q && (
        n.title.toLowerCase().includes(q) ||
        n.body.toLowerCase().includes(q)
      );
    });

  const handleClick = (e)=>{
    e.preventDefault()
    if (!title.trim() || !body.trim()) return;
    
    setNotes([
      { title, body },
      ...notes,
    ]);
    setTitle("");
    setBody("");

  }

  return (
    <>
    <div className="container">
    <header>
    <h1>FieldNote</h1>
    <p className="tagline">A simple place to log outdoor observations: plants, weather, trails, anything you notice.
    </p>
    </header>
      <SearchBar onSearch={setQuery} />
      <NotesList notes={visible} />

      <form onSubmit={handleClick}>
        <input  value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Note title" />
        <textarea value={body} onChange={e=>setBody(e.target.value)} placeholder="Note body" />
        <button type='submit' >Add note</button>
      </form>
        {notes.map((n)=>(
          <NoteCard >
            <h2>{n.title}</h2>
            <p>{n.body}</p>
          </NoteCard>
))}
    </div>
    </>
  )
}

// function NoteCard(props) {
//   return (
//     <>    
//         <h1>{props.title}</h1>
//         <p>{props.body}</p>

//     </>
//   );
// }
function NoteCard({children}) {
  return (
    <>    
    <div className="note-card">{children}</div>

    </>
  );
}

function SearchBar({ onSearch }) {
  return (
    <input
      placeholder="Search notes…"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}

function NotesList({ notes }) {
  if (!notes.length) return <p>No notes match.</p>;
  return (
    // <ul>
    //   {notes.map(n => <li><strong>{n.title}</strong>: {n.body}</li>)}
    // </ul>
    <> { notes.map((n) => (
          <NoteCard>
            <strong>{n.title}</strong>
            <div>{n.body}</div>
          </NoteCard>
      ))}
    </>
  );
}

export default App
