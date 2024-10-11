import express from 'express'
import dotenv from 'dotenv'

import noteRoute from './routes/noteRoute.js'
import authRoute from './routes/authRoute.js'

import connectDb from './config/connectDb.js'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'

dotenv.config()

connectDb()

const corsOption = {origin: 'http://localhost:3000', credentials: true}

const app = express()
const PORT = 3500

app.use(express.json())
app.use(cors(corsOption))
app.use(cookieParser())
// app.use(express.urlencoded({extended: true}))

app.use('/notes', noteRoute)
app.use('/auth', authRoute)

app.listen(PORT, () => {
    console.log('--> Server running ' + PORT)
    mongoose.connection.once('open', () => {
        console.log('--> Connected to the database []')
    })
})

app.use((err, req, res, next) => {
    res.status(500).json({ message: 'haha error caught: ' + err?.message })
})
