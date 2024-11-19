import express from 'express'
import morgan from 'morgan'
import { createUserTable } from './schema/index.js'
import { authRoutes, ordersRouter, socialFilesRouter } from './routes/index.js'
import {
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
app.use('/api/v1/product', authGuard(), productsRouter)
app.use('/api/v1/cart', authGuard(), cardRouter)

app.get('/api/v1/setup', async (req, res) => {
    await createUserTable()
    await creatCartTable()
    await createProducrsTable()
    res.send('Table created!.')
})

app.use((err, req, res, next) => {
    if (err) {
        logger.error(err)
        return res.send(err.message)
    }
    return res.send('not found')
})

export default app
