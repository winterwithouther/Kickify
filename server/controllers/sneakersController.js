import pool from "../config/database.js";

async function getSneakers(request, response) {
    try {
        const results = await pool.query('SELECT * FROM sneakers ORDER BY id ASC')
        response.status(200).json(results.rows);
    } catch (err) {
        response.status(409).json({ error : err.message })
    }
}

async function getSneaker(request, response) {
    const id = parseInt(request.params.id)
    try {
        const query = `SELECT * FROM sneakers where id = $1`
        const results = await pool.query(query, [id])
        response.status(200).json(results.rows[0])
    } catch (err) {
        console.log(err)
    }
}

async function createSneaker(request, response) {
    try {
        const { name, size, price, color_primary, color_secondary, sole_color, material, lace_color, submittedBy, submittedOn } = request.body

        const values = [
            name,
            size,
            price,
            color_primary,
            color_secondary,
            sole_color,
            material,
            lace_color,
            submittedBy,
            submittedOn
        ];

        const results = await pool.query(`
        INSERT INTO sneakers (name, size, price, color_primary, color_secondary, sole_color, material, lace_color, submittedBy, submittedOn)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *
        `, values)

        console.log('created sneaker')
        response.status(201).json(results.rows[0])
    } catch (err) {
        response.status(409).json({ error : err.message })
    }
}

// DELETE
async function deleteSneaker(request, response) {
    try {
        const id = request.params.id
        const query = 'DELETE FROM sneakers WHERE id = $1'
        const results = await pool.query(query, [id])
        response.status(204).json(results.rows[0])
    } catch (err) {
        console.log(`error deleting sneaker: ${err}`)
    }
}

export default {
    getSneakers,
    createSneaker,
    getSneaker,
    deleteSneaker
}