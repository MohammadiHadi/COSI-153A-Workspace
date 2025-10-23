import React, { createContext, useContext, useMemo, useState } from "react";
import { NoteItem } from "../components/types";

type NotesCtx = {
  notes: NoteItem[];
  addNote: (title: string, body: string) => void;
  removeNote: (id: string) => void;
  getNote: (id: string) => NoteItem | undefined;
};

const NotesContext = createContext<NotesCtx | undefined>(undefined);

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<NoteItem[]>([
    { id: "1", title: "Welcome", body: "Your first note!", createdAt: Date.now() }
  ]);

  const addNote = (title: string, body: string) => {
    const id = String(Date.now());
    setNotes((prev) => [{ id, title, body, createdAt: Date.now() }, ...prev]);
  };

  const removeNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const getNote = (id: string) => notes.find((n) => n.id === id);

  const value = { notes, addNote, removeNote, getNote };
  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
}

export function useNotes() {
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error("useNotes must be used within NotesProvider");
  return ctx;
}