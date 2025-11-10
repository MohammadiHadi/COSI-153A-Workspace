import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { NoteItem } from "../components/types";
import { BASE_URL } from "../config";

type NotesCtx = {
  notes: NoteItem[];
  getNotes: () => Promise<void>;
  addNote: (note: Omit<NoteItem, "_id">) => Promise<void>;
};

const NotesContext = createContext<NotesCtx | undefined>(undefined);

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<NoteItem[]>([]);

  // const addNote = (title: string, body: string) => {
  //   const id = String(Date.now());
  //   setNotes((prev) => [{ id, title, body, createdAt: Date.now() }, ...prev]);
  // };
   const addNote = async (note: Omit<NoteItem, "_id">) => {
    try {
      const res = await fetch(`${BASE_URL}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
      });
      if (!res.ok) throw new Error("Failed to add note");
      const created = (await res.json()) as NoteItem;
      setNotes((prev) => [created, ...prev]);
    } catch (err) {
      console.error("Add note error:", err);
    }
  };


  const removeNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n._id !== id));
  };

  // const getNote = (id: string) => notes.find((n) => n.id === id);
  const getNotes = async () => {
    try {
      const res = await fetch(`${BASE_URL}/notes`);
      if (!res.ok) throw new Error("Failed to fetch notes");
      const data = (await res.json()) as NoteItem[];
      setNotes(data);
    } catch (err) {
      console.error("Fetch notes error:", err);
    } };

  useEffect(() => {
    getNotes();
  }, []);


  const value = { notes, addNote, removeNote, getNotes };
  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
}

export function useNotes() {
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error("useNotes must be used within NotesProvider");
  return ctx;
}