import pool from '../databases/index.js'
import {
    comparePassword,
    generateOtp,
    generateToken,
    hashPassword,
    logger,
    sendMail,
    UserInputError,
} from '../utils/index.js'

export const register = async (user) => {
    try {
        const currentUser = await findUser('email', user.email)

        if (currentUser) {
            throw new UserInputError('user email already exists!')
        }
        const otp = generateOtp()

        sendMail(
            user.email,
            'OTP',
            `<h1>Bu sizning OTP :${otp}iz buni begona qo'llarga bermang!</h1>`,
        )

        const result = await createUser(user)

        return result
    } catch (error) {
        logger.error(error)
        throw new Error(error)
    }
}

export const login = async (user) => {
    try {
        const currentUser = await findUser('email', user.email)

        if (!currentUser) {
            throw new Error('user not found!')
        }

        const isEqual = await comparePassword(
            user.password,
            currentUser.password,
        )

        if (!isEqual) {
            throw new Error('User defailt is wrong!')
        }

        const accessToken = await generateToken('access', {
            sub: currentUser.id,
            email: currentUser.email,
            role: currentUser.role,
            username: currentUser.username,
        })

        const refreshToken = await generateToken('refresh', {
            sub: currentUser.id,
            email: currentUser.email,
            role: currentUser.role,
        })

        return {
            accessToken,
            refreshToken,
        }
    } catch (error) {
        logger.error(error)
        throw new Error(error)
    }
}

export const createUser = async (user) => {
    try {
        const queryString = `
      INSERT INTO users (
        username,
        email,
        password,
        phone_number
      )
        VALUES
        (
        $1,
        $2,
        $3,
        $4
        )
      RETURNING *
    `

        const hashedPassword = await hashPassword(user.password)
        const result = await pool.query(queryString, [
            user.username,
            user.email,
            hashedPassword,
            user.phone_number,
        ])

        return result.rows[0]
    } catch (error) {
        logger.error(error)
        throw new Error(error)
    }
}

export const findById = (id) => {
    try {
    } catch (e) {
        throw new Error(e)
    }
}

export const findByEmail = (email) => {
    try {
    } catch (e) {
        throw new Error(e)
    }
}

export const findByUsername = (username) => {
    try {
    } catch (e) {
        throw new Error(e)
    }
}

export const findUser = async (type, data) => {
    let queryString = ''

    switch (type) {
        case 'id':
            queryString = `
      SELECT * FROM users 
        WHERE id = $1;
      `
            break

        case 'email':
            queryString = `
        SELECT * FROM users 
          WHERE email = $1;
        `
            break
        case 'username':
            queryString = `
        SELECT * FROM users 
          WHERE username = $1;
        `
            break

        default:
            queryString = `SELECT * FROM users;`
            break
    }

    const result = await pool.query(queryString, [data])

    return result.rows[0]
}
