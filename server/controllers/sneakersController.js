import pool from "../config/database";

async function getSneakers(request, response) {
    try {
        const results = await pool.query('SELECT * FROM sneakers ORDER BY id ASC')
        response.status(200).json(results.rows);
    } catch (err) {
        response.status(409).json({ error : err.message })
    }
}

async function createSneaker(request, response) {
    try {
        const { name, size, price, color_primary, color_secondary, sole_color, material, lace_color, submittedBy, submittedOn } = request.body
        const results = await pool.query(`
        INSERT INTO sneakers (name, size, price, color_primary, color_secondary, sole_color, material, lace_color, submittedBy, submittedOn)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *
        `, [name, size, price, color_primary, color_secondary, sole_color ])

        response.status(201).json(results.rows[0])
    } catch (err) {
        res.status(409).json({ error : err.message })
    }
}

export default {
    getSneakers,
    createSneaker
}