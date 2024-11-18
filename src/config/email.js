import { config } from 'dotenv'

config()

export default {
    email: {
        user: process.env.USER_MAIL,
        pass: process.env.USER_MAIL_PASSWORD,
    },
}
