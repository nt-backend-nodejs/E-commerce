import pool from '../database/index.js'

export const getAllCategoryService = async () => {
    try {
        const allData = await pool.query('SELECT * FROM category')
        return allData.rows
    } catch (error) {
        throw new Error(error)
    }
}

export const getByIdCategoryService = async (id) => {
    try {
        const allData = await pool.query(
            'SELECT * FROM category where id = $1',
            [id]
        )
        if (allData.rowCount === 0) {
            return { status: 'NOTFOUND' }
        }
        return { data: allData.rows }
    } catch (error) {
        throw new Error(error)
    }
}

export const createCategoryService = async (data) => {
    try {
        const { name, description, tag } = data
        const allData = await pool.query(
            `
            INSERT INTO category(name , description , tag )VALUES($1,$2,$3) RETURNING *
            `,
            [name, description, tag]
        )

        return allData.rows
    } catch (error) {
        throw new Error(error)
    }
}

export const updateCategoryService = async (id, data) => {
    try {
        const { name, description, tag } = data
        const category = await pool.query(
            'SELECT * FROM category where id = $1',
            [id]
        )
        if (category.rowCount === 0) {
            return { status: 'NOTFUND' }
        }
        const updateCategor = await pool.query(
            `UPDATE category SET name = $1 , description = $2 , tag = $3 WHERE id = $4`,
            [
                name || category.rows[0].name,
                description || category.rows[0].description,
                tag || category.rows[0].tag,
                id
            ]
        )
        return { status: 'Success' }
    } catch (error) {
        throw new Error(error)
    }
}

export const deleteCategoryService = async (id) => {
    try {
        const category = await pool.query(
            'SELECT * FROM category where id = $1',
            [id]
        )
        if (category.rowCount === 0) {
            return { status: 'NOTFUND' }
        }
        await pool.query(`DELETE FROM category WHERE id = $1`, [id])
        return { status: 'Success' }
    } catch (error) {
        throw new Error(error)
    }
}
