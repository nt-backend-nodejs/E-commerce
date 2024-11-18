import db from './db.js'
import application from './app.js'
import jwt from './jwt.js'
import email from './email.js'

export const config = {
    ...db,
    ...application,
    ...jwt,
    ...email,
}
