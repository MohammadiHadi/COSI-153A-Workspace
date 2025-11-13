export default function SearchBar({ onSearch }) {
  return (
    <input
      className="note-card"
      placeholder="Search notes…"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}