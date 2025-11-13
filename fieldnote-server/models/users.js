import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  },
    { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.virtual('notes', {
  ref: 'Note',
  localField: '_id',
  foreignField: 'author',
});


export const User = mongoose.model('User', userSchema);
