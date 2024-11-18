import pool from '../databases/index.js'
export const getAddresses = async () => {
    try {
        const data = await pool.query(`SELECT * FROM addresses;`)
        if (!data.rows) {
            throw new Error(`Addresses not found`)
        }
        return data.rows
    } catch (error) {
        throw new Error(error.message)
    }
}
export const getAddressById = async (id) => {
    try {
        const data = await pool.query(`SELECT * FROM addresses WHERE id=$1;`, [
            id,
        ])
        if (!data.rows[0]) {
            throw new Error(`Addresses not found`)
        }
        return data.rows[0]
    } catch (error) {
        throw new Error(error.message)
    }
}
export const createAddress = async () => {
    try {
        const data = await pool.query()
        // INSERT INTODAN KEYIN RETURNING * ISHLATING
        if (!data.rows[0]) {
            throw new Error(`Addresses not created with some reason`)
        }
        return data.rows[0]
    } catch (error) {
        throw new Error(error.message)
    }
}
export const updateAddress = async (id, body) => {
    try {
        const oldAddress = await getAddressById(id)
        const data = await pool.query(
            `UPDATE addresses SET
                title = $1,
                address_line_1 = $2,
                address_line_2 = $3,
                country = $4,
                city = $5,
                postal_code = $6,
                phone_number = $7,
                landmark = $8
            WHERE id = $9 RETURNING *
            `,
            [
                body.title || oldAddress.title,
                body.address_line_1 || oldAddress.address_line_1,
                body.address_line_2 || oldAddress.address_line_2,
                body.country || oldAddress.country,
                body.city || oldAddress.city,
                body.postal_code || oldAddress.postal_code,
                body.phone_number || oldAddress.phone_number,
                body.landmark || oldAddress.landmark,
                id,
            ],
        )
        if (!data.rows[0]) {
            throw new Error(`Addresses not updated with some reason`)
        }
        return data.rows[0]
    } catch (error) {
        throw new Error(error.message)
    }
}
export const deleteAddress = async () => {
    try {
        const data = await pool.query()
        // DELETE FROMDAN KEYIN RETURNING * ISHLATING
        if (!data.rows[0]) {
            throw new Error(`Addresses not deleted with some reason`)
        }
        return data.rows[0]
    } catch (error) {
        throw new Error(error.message)
    }
}
