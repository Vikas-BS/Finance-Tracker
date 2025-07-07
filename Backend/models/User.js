import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    phone:{type: String, match: [/^\d{10}$/, 'Phone number must be exactly 10 digits']},
    googleId: { type: String }, 
    profilePic: { type: String }, 
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
