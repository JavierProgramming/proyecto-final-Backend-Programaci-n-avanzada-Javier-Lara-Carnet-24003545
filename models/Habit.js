import mongoose from 'mongoose'

const habitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  currentStreak: { type: Number, default: 0 },
  lastCompleted: { type: Date, default: null }
})

export default mongoose.model('Habit', habitSchema)
