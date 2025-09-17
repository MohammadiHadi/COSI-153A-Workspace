import { useRef, useState } from "react";
import SearchBar from "./components/SearchBar.jsx";
import NotesList from "./components/NotesList.jsx";
import NoteCard from "./components/NoteCard.jsx";

export default function App() {
  const nextId = useRef(2)
  const [notes, setNotes] = useState([
    { id: 1, date: Date.now(), title: "Trailhead observation", body: "New signage at the kiosk." },
  ]);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [query, setQuery] = useState("");
  const [saving, setSaving] = useState(false);

  const visible = notes.filter((n) => {
    const q = query.trim().toLowerCase();
    return q && (n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q));
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    setSaving(true);
    setTimeout(() => {
      setNotes([{ id: nextId.current++, date: Date.now(), title, body }, ...notes]);
      setTitle("");
      setBody("");
      setSaving(false);
    }, 800);
  }

  return (
    <div className="container">
      <header>
        <h1>FieldNote</h1>
        <p className="tagline">
          A simple place to log outdoor observations: plants, weather, trails, anything you notice.
        </p>
      </header>

    {saving && (
    <div className="saving-banner">
      Saving your note…
    </div>
    )}
    
      <SearchBar onSearch={setQuery} />
      <NotesList notes={visible} />


      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Note body"
        />
        <button type="submit" disabled={saving}>
          {saving ? "Saving…" : "Add note"}
        </button>
      </form>

      {notes.map((n) => (
        <NoteCard key={n.id}>
          <h2>{n.title}</h2>
          <p>{n.body}</p>
         <p>{new Date(n.date).toLocaleDateString()}</p>
        </NoteCard>
      ))}
    </div>
  );
}