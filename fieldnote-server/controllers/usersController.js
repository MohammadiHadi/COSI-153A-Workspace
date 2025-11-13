import {User} from '../models/users.js';

export const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'Not found' });
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

export const getUserWithNotes = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('notes');
    if (!user) return res.status(404).json({ error: 'Not found' });
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};