import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import authRoutes from './routes/authRoutes.js'
import habitRoutes from './routes/habitRoutes.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/habits', habitRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conectado a MongoDB')
    app.listen(process.env.PORT, () => {
      console.log(`Servidor en puerto ${process.env.PORT}`)
    })
  })
  .catch(err => console.log(err))
