import express from 'express'
import morgan from 'morgan'
import { createCardItemsTable, createCategoryTable, createUserTable } from './schema/index.js'
import { authRoutes, cardItemRouter, categoryRouter } from './routes/index.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// ERROR HANDLE
// app.use()

// set up

// auth
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/category', categoryRouter)
app.use('/api/v1/cardItem', cardItemRouter )

app.get('/api/v1/setup', async (req, res) => {
    await createUserTable()
    await createCategoryTable()
    await createCardItemsTable()
    res.send('Table created!.')
})

app.use((err, req, res, next) => {
    logger.error('Error:', err)

    if (err) {
        return res.status(err.statusCode || 400).json({
            success: false,
            message: err.message,
        })
    }

    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
    })
})

export default app
