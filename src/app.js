import express from 'express'
import morgan from 'morgan'
import { createUserTable } from './schema/index.js'
import { authRoutes, ordersRouter, socialFilesRouter } from './routes/index.js'
import { createCardItemsTable, createCategoryTable, createUserTable } from './schema/index.js'
import { authRoutes, cardItemRouter, categoryRouter } from './routes/index.js'
import {
    createAddressTable,
    createReviewsTable,
    createUserTable,
} from './schema/index.js'
import { addressRouter, authRoutes, reviewRouter } from './routes/index.js'
    createUserTable,
    creatCartTable,
    createProducrsTable,
} from './schema/index.js'
import { authRoutes, cardRouter, productsRouter } from './routes/index.js'
import { logger } from './utils/logger.js'
import { authGuard } from './middlewares/index.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// ERROR HANDLE
// app.use()

// set up

// auth
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/orders', ordersRouter)
app.use('/api/v1/socialProfiles', socialFilesRouter)

app.use('/api/v1/category', categoryRouter)
app.use('/api/v1/cardItem', cardItemRouter )

app.get('/api/v1/setup', async (req, res) => {
    await createUserTable()
    await createCategoryTable()
    await createCardItemsTable()
app.use('/api/v1/adress', addressRouter)
app.use('/api/v1/review', reviewRouter)
app.get('/api/v1/setup', async (req, res) => {
    await createReviewsTable()
    await createUserTable(), await createAddressTable()

app.use('/api/v1/product', authGuard(), productsRouter)
app.use('/api/v1/cart', authGuard(), cardRouter)

app.get('/api/v1/setup', async (req, res) => {
    await createUserTable()
    await creatCartTable()
    await createProducrsTable()
    res.send('Table created!.')
})

app.use((err, req, res, next) => {
    logger.error('Error:', err)

    if (err) {
        return res.status(err.statusCode || 400).json({
            success: false,
            message: err.message,
        })
        logger.error(err)
        return res.send(err.message)
    }

    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
    })
})

export default app
