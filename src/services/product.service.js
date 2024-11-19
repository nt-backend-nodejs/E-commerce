import pool from '../databases/index.js'

export const getAllProductService = async () => {
    try {
        const allData = await pool.query(`SELECT * FROM products`)
        return allData.rows
    } catch (error) {
        throw error
    }
}

export const getByIdProductService = async (id) => {
    try {
        const user = await pool.query(`SELECT * FROM products WHERE id = $1`, [
            id,
        ])
        if (user.rowCount === 0) {
            return { status: 'NOTFOUND' }
        }
        return { status: 'OK', data: user.rows[0] }
    } catch (error) {
        throw error
    }
}

export const createProductService = async (data) => {
    try {
        await pool.query(
            `
        INSERT INTO products (category_id ,title,picture ,summary,description ,price ,discount_type ,discount_values ,tags ) 
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8, $9)
        `,
            [
                data.category_id,
                data.title,
                data.picture,
                data.summary,
                data.description,
                data.price,
                data.discount_type,
                data.discount_values,
                data.tags,
            ],
        )
        return { status: 'Created' }
    } catch (error) {
        throw error
    }
}
export const updateProductService = async (id, data) => {
    try {
        const Products = await pool.query(
            `SELECT * FROM products WHERE id = $1`,
            [id],
        )
        if (Products.rowCount === 0) {
            return { status: 'NOTFOUND' }
        }
        const {
            category_id,
            title,
            picture,
            summary,
            description,
            price,
            discount_type,
            discount_value,
            tags,
        } = data
        await pool.query(
            `UPDATE products SET category_id = $1 ,title = $2 ,picture = $3,summary = $4 ,description = $5,price = $6,discount_type = $7 ,discount_values = $8 ,tags = $9 WHERE id = $10`,
            [
                category_id || Products.rows[0].category_id,
                title || Products.rows[0].title,
                picture || Products.rows[0].picture,
                summary || Products.rows[0].summary,
                description || Products.rows[0].description,
                price || Products.rows[0].price,
                discount_type || Products.rows[0].discount_type,
                discount_value || Products.rows[0].discount_value,
                tags || Products.rows[0].tags,
                id,
            ],
        )
        return { status: 'OK', id: id }
    } catch (error) {
        throw error
    }
}

export const deleteProductService = async (id) => {
    try {
        const Products = await pool.query(
            `SELECT * FROM products WHERE id = $1`,
            [id],
        )
        if (Products.rowCount === 0) {
            return { status: 'NOTFOUND' }
        }
        await pool.query(`DELETE FROM products WHERE id = $1`, [id])
        return { status: 'OK' }
    } catch (error) {
        throw error
    }
}
