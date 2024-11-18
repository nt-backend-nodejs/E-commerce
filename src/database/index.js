import pg from 'pg'
import { config } from '../config/index.js'

const { Pool } = pg

const pool = new Pool({
    user: config.db.user,
    password: config.db.password,
    host: config.db.host,
    port: config.db.port,
    database: config.db.database,
})

export default pool
