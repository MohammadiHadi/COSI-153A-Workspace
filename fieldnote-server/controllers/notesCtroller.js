const notes = [
    { title: 'Hello', body: 'This is my first note', createdAt: Date.now()}
  ]

export const getNotes = (req, res) => {
  res.json(notes);
}

export const addNote = (req, res) => {
  const { title, body } = req.body;
  const newNote = { title, body, createdAt: Date.now() };
  notes.push(newNote);
  res.json(notes);
}