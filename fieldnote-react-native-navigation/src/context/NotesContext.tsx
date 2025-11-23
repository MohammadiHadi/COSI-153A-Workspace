import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { NoteItem } from "../components/types";
import { BASE_URL } from "../config";

type NotesCtx = {
  notes: NoteItem[];
  getNotes: () => Promise<void>;
  addNote: (note: Omit<NoteItem, "_id">, photoUri?: string | null) => Promise<void>;
  removeNote: (id: string) => Promise<void>;
  updateNote: (note: Omit<NoteItem, "_id" | "createdAt">, id: string) => Promise<void>;
};

const NotesContext = createContext<NotesCtx | undefined>(undefined);

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<NoteItem[]>([]);

  const addNote = async (note: Omit<NoteItem, "_id">, photoUri?: string | null) => {
    try {
      const formData = new FormData();

      formData.append("title", note.title);
      formData.append("body", note.body ?? "");
      formData.append("createdAt", String(note.createdAt));
      formData.append("photoUrl", note.photoUrl ?? "");  

      if (photoUri) {
        formData.append(
          "photo",
          {
            uri: photoUri,
            name: "photo.jpg",
            type: "image/jpeg",
          } as any
        );
      }

      const res = await fetch(`${BASE_URL}/notes`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to add note");

      const created = (await res.json()) as NoteItem;
      setNotes((prev) => [created, ...prev]);
    } catch (err) {
      console.error("Add note error:", err);
    }
  };


 const removeNote = async (id: string) => {
    try {
      const res = await fetch(`${BASE_URL}/notes/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete note");
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Delete note error:", err);
    }
  };

 const updateNote = async (note: Omit<NoteItem, "_id" | "createdAt">, id: string) => {
    if (!note || !id) return;
    try {
      const res = await fetch(`${BASE_URL}/notes/${id}`, {
        method: "PATCH", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
      });
      if (!res.ok) throw new Error(`Failed to update: ${res.status}`);
      const updatedNote = (await res.json()) as NoteItem;
      setNotes((prev) => prev.map((n) => (n._id === id ? updatedNote : n)));
    } catch (e) {
      console.error("Update note error:", e);
    }
  };


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


  const value = { notes, addNote, removeNote, getNotes, updateNote };
  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
}

export function useNotes() {
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error("useNotes must be used within NotesProvider");
  return ctx;
}