import Habit from '../models/Habit.js'

export const getHabits = async (req, res) => {
  const habits = await Habit.find({ userId: req.userId })
  res.json(habits)
}

export const createHabit = async (req, res) => {
  const habit = new Habit({
    name: req.body.name,
    userId: req.userId
  })
  await habit.save()
  res.status(201).json(habit)
}

export const completeHabit = async (req, res) => {
  const habit = await Habit.findOne({ _id: req.params.id, userId: req.userId })
  if (!habit) return res.status(404).json({ error: 'Hábito no encontrado' })

  const today = new Date().toDateString()
  const last = habit.lastCompleted ? new Date(habit.lastCompleted).toDateString() : null

  if (last === today) {
    return res.status(400).json({ error: 'Ya completado hoy' })
  }

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)

  if (last === yesterday.toDateString()) {
    habit.currentStreak += 1
  } else {
    habit.currentStreak = 1
  }

  habit.lastCompleted = new Date()
  await habit.save()
  res.json(habit)
}
