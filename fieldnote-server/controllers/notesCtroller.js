export const getNotes = (req, res) => {
  res.json([
    { title: 'Hello', body: 'This is my first note', createdAt: Date.now()}
  ]);
}