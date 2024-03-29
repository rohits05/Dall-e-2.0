import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './mongodb/connect'
import postRoutes from './routes/postRoutes'

import dalleRoutes from './routes/dalleRoutes'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }))

app.use('/api/v1/post', postRoutes)
app.use('/api/v1/dalle', dalleRoutes)

app.get('/', async (req, res) => {
  res.send("DALL-E has been AcTivATeD!")
})

const startServer = async () => {
  try {
    connectDB(process.env.MONGO_URL)
    app.listen(8080, () => console.log('Server has started on link - https://dall-e-ncr8.onrender.com/ '))
  } catch (error) {
    console.log(error)
  }
}
startServer()