import NoteCard from "./NoteCard.jsx";

export default function NotesList({ notes }) {
  if (!notes.length) return <p>No notes match.</p>;

  return (
    <>
      {notes.map((n) => (
        <NoteCard key={n._id}>
          <strong>{n.title}</strong>
          <div>{n.body}</div>
        </NoteCard>
      ))}
    </>
  );
}
