import { createTransport } from 'nodemailer'
import { config } from '../../config/index.js'
import { logger } from '../logger.js'

const transporter = createTransport({
    service: 'gmail',
    auth: {
        user: config.email.user,
        pass: config.email.pass,
    },
})

export const sendMail = async (to, subject, html) => {
    const info = await transporter.sendMail({
        from: config.email.user,
        to,
        subject,
        html,
    })

    logger.info('Message sent: %s', info.messageId)
}

// sendMail("mmvatx@gmail.com", "test OTP", `<b>Hello Bro!</b>`)
