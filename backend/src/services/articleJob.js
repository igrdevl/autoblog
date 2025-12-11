import { pool } from '../../index.js';

async function initDatabase() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS articles (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            content TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);
}

async function loadArticles() {
    const res = await pool.query(
        'SELECT * FROM articles ORDER BY created_at ASC'
    );
    return res.rows;
}

async function loadDayArticle() {
    const res = await pool.query(`
        SELECT * FROM articles 
        WHERE created_at::date = CURRENT_DATE
    `);
    return res.rows;
}

async function loadArticleById(id) {
    const res = await pool.query(
        'SELECT * FROM articles WHERE id = $1',
        [id]
    );
    return res.rows[0];
}

async function saveArticle(title, content) {
    const res = await pool.query(
        'INSERT INTO articles (title, content) VALUES ($1, $2) RETURNING *',
        [title, content]
    );
    return res.rows[0];
}

export {
    loadArticles,
    loadDayArticle,
    saveArticle,
    loadArticleById,
    initDatabase
};