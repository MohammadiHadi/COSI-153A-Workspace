import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar.jsx";
import NotesList from "./components/NotesList.jsx";
import NoteCard from "./components/NoteCard.jsx";
import { BASE_URL } from "./config.jsx";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [query, setQuery] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const visible = notes.filter((n) => {
    const q = query.trim().toLowerCase();
    return q && (n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q));
  });

  useEffect(() => {
    async function fetchNotes() {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/notes`);
        if (!res.ok) {
          throw new Error(`Failed to load notes: ${res.status}`);
        }
        const data = await res.json();
        setNotes(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchNotes();
  }, []);

  function startEdit(note) {
    setEditingId(note._id);
    setTitle(note.title || "");
    setBody(note.body || "");
  }

  async function handleDelete(id) {
    try {
      const res = await fetch(`${BASE_URL}/notes/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error(`Failed to delete note: ${res.status}`);
      }
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    try {
      setSaving(true);

      let noteFromServer;

      if (editingId) {
        const res = await fetch(`${BASE_URL}/notes/${editingId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, body }),
        });

        if (!res.ok) {
          throw new Error(`Failed to update note: ${res.status}`);
        }

        noteFromServer = await res.json();

        setNotes((prev) =>
          prev.map((n) => (n._id === editingId ? noteFromServer : n))
        );

        setEditingId(null);
      } else {
        const res = await fetch(`${BASE_URL}/notes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, body }),
        });

        if (!res.ok) {
          throw new Error(`Failed to save note: ${res.status}`);
        }

        noteFromServer = await res.json();

        setNotes((prev) => [noteFromServer, ...prev]);
      }

      setTitle("");
      setBody("");
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
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
          {saving ? "Saving…" : editingId ? "Update note" : "Add note"}
        </button>
      </form>

      {notes.map((n) => (
        <NoteCard key={n.id}>
          <h2>{n.title}</h2>
          <p>{n.body}</p>
          <p>{new Date(n.createdAt).toLocaleDateString()}</p>
          <button onClick={() => startEdit(n)}>Edit</button>
          <button onClick={() => handleDelete(n._id)}>Delete</button>
        </NoteCard>
      ))}
    </div>
  );
}