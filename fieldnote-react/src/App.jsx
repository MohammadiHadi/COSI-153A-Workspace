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
      <form onSubmit={handleClick}>
        <input  value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Note title" />
        <textarea value={body} onChange={e=>setBody(e.target.value)} placeholder="Note body" />
        <button type='submit' >Add note</button>
      </form>
        {notes.map((n)=>(<div className='note-card'><NoteCard {...n} /></div>
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
function NoteCard({title, body}) {
  return (
    <>    
        <h1>{title}</h1>
        <p>{body}</p>
    </>
  );
}

export default App
