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
export const createAddress = async (body) => {
    try {
        const data = await pool.query(
            `insert into addresses(
            user_id, 
            title, 
            address_line_1,
            address_line_2, 
            country,
            city,
            postal_code,
            phone_number,
            landmark)
            values($1, $2, $3, $4, $5, $6, $7, $8,$9)RETURNING *`,
            [
                body.user_id,
                body.title,
                body.address_line_1,
                body.address_line_2,
                body.country,
                body.city,
                body.postal_code,
                body.phone_number,
                body.landmark,
            ],
        )
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
export const deleteAddress = async (id) => {
    try {
        const data = await pool.query(
            `DELETE FROM addresses WHERE id=$1 returning *`,
            [id],
        )

        if (!data.rows[0]) {
            throw new Error(`Addresses not deleted with some reason`)
        }
        return data.rows[0]
    } catch (error) {
        throw new Error(error.message)
    }
}
