import { useState } from 'react'

function App() {
  const [notes, setNotes] = useState(
    [
      {
        title: "Trailhead observation", 
        body: "New signage at the kiosk."
      }
    ]
  )
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [query, setQuery] = useState("");   
  const [saving, setSaving] = useState(false)

  const handleSubmit = (e)=>{  e.preventDefault() 
       if (!title.trim() || !body.trim()) return;
    setSaving(true); 
setTimeout(()=>{       
  setNotes([
      { id: Date.now(), title, body },
      ...notes,
    ])

    setTitle("");
    setBody("")
        setSaving(false); 
},800)}
 
 const visible = notes.filter(n => {
  const q = query.trim().toLowerCase();
  return q && (
    n.title.toLowerCase().includes(q) ||
    n.body.toLowerCase().includes(q)
  );
});
  return (
    <>
      <SearchBar onSearch={setQuery} />
      <NotesList notes={visible} />

      <form onSubmit={handleSubmit}>
        <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Note title" />
        <textarea value={body} onChange={e=>setBody(e.target.value)} placeholder="Note body" />
        <button type='submit' disabled={saving}>{saving ? 'Saving…' : 'Add note'}</button>
      </form>

{notes.map((n)=>(
          <NoteCard key={n.id}>
            <h2>{n.title}</h2>
            <p>{n.body}</p>
          </NoteCard>
        ))}   </>
  )
}

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
    <> { notes.map((n) => (
          <NoteCard key={n.id}>
            <strong>{n.title}</strong>
            <div>{n.body}</div>
          </NoteCard>
      ))}
    </>
  );
}
export default App
