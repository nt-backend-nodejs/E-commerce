import jwt from 'jsonwebtoken'
const { sign, verify } = jwt
import { config } from '../../config/index.js'

export const generateToken = async (prop, payload) => {
    const option = config.jwt[prop]

    const token = await sign(payload, option.secret, {
        expiresIn: option.expiresIn,
    })

    return token
}

// console.log(await generateToken("access", { sub: 1 }))

export const verifyToken = async (prop, token) => {
    try {
        const option = config.jwt[prop]

        const result = await verify(token, option.secret)

        return {
            ...result,
            success: true,
        }
    } catch (error) {
        if (error.message === 'invalid token') {
            return {
                success: false,
            }
        }
    }
}

// console.log(await isvalidToken("access", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCaJ9.eyJzdWIiOjEsImlhdCI6MTczMTY2NzA5MywiZXhwIjoxNzMxNjcwNjkzfQ.JCwkOLsujI9KwTco9px-xW9Pum1jhwwD5QIUHaYW3ac"));
