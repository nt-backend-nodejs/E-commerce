import { config } from 'dotenv'

config()

export default {
    jwt: {
        access: {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
        },
        refresh: {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
        },
        forget: {
            secret: process.env.JWT_FORGET_PASSWORD_SECRET,
            expiresIn: process.env.JWT_FORGET_PASSWORD_EXPIRES_IN,
        },
    },
}
