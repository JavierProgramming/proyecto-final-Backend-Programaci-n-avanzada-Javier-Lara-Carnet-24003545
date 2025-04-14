import User from '../models/User.js'
import { createToken } from '../utils/token.js'

export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = new User({ email, password })
    await user.save()
    const token = createToken(user._id)
    res.json({ token })
  } catch (err) {
    res.status(400).json({ error: 'Email ya registrado' })
  }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) return res.status(400).json({ error: 'Credenciales inválidas' })

  const match = await user.comparePassword(password)
  if (!match) return res.status(400).json({ error: 'Credenciales inválidas' })

  const token = createToken(user._id)
  res.json({ token })
}
