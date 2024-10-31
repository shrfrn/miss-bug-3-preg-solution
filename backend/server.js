
import express from 'express'
import cors from 'cors'
import path from 'path'
import cookieParser from 'cookie-parser'

const app = express()

const corsOptions = {
  origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
  credentials: true
}

// Config the Express App
app.use(cors(corsOptions))
app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())

// Routes
import { bugRoutes } from './api/bug/bug.routes.js'
import { userRoutes } from './api/user/user.routes.js'
import { authRoutes } from './api/auth/auth.routes.js'

app.use('/api/bug', bugRoutes)
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

// fallback route
app.get('/**', (req, res) => {
  res.sendFile(path.resolve('public/index.html'))
})

import { loggerService } from './services/logger.service.js'
const PORT = process.env.PORT || 3030

app.listen(PORT, () => {
  loggerService.info('Up and running on port ' + PORT)
  console.log(`Server is ready at ${PORT}`)
})
