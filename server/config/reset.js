import pool from './database.js';

async function createSneakersTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS sneakers (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      size INTEGER NOT NULL,
      price DECIMAL(10,2),

      color_primary VARCHAR(50),
      color_secondary VARCHAR(50),
      material VARCHAR(50),

      submittedBy VARCHAR(255) NOT NULL,
      submittedOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log('🎉 sneakers table created successfully');
  } catch (err) {
    console.error('⚠️ error creating sneakers table', err);
  } finally {
    await pool.end();
  }
}

createSneakersTable();