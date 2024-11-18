import express from 'express'
import morgan from 'morgan'
import {
    createAddressTable,
    createReviewsTable,
    createUserTable,
} from './schema/index.js'
import { addressRouter, authRoutes, reviewRouter } from './routes/index.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// ERROR HANDLE
// app.use()

// set up

// auth
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/adress', addressRouter)
app.use('/ap1/v1/review', reviewRouter)
app.get('/api/v1/setup', async (req, res) => {
    await createReviewsTable()
    await createUserTable(), await createAddressTable()
    res.send('Table created!.')
})

app.use((err, req, res, next) => {
    if (err) {
        return res.send(err.message)
    }
    return res.send('not found')
})

export default app
