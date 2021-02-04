import routes from './routes'
import express from 'express'
import cors from 'cors'

import configMongoDB from '../database/config'

configMongoDB()

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

export default app
