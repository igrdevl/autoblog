import express from 'express';
import { aiClientService } from '../services/aiClient.js';
import { loadArticles, loadArticleById, loadDayArticle, saveArticle } from '../services/articleJob.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const articles = await loadArticles();
        return res.json(articles);
    }
    catch (error) {
        return res.status(500).json({ error: 'Failed to load articles' });
    }
});

router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const article = await loadArticleById(id);
        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }
        return res.json(article);
    }
    catch (error) {
        return res.status(500).json({ error: 'Failed to load article' });
    }
});

router.get('/today', async (req, res) => {
    try {
        const article = await loadDayArticle();
        return res.json(article);
    }
    catch (error) {
        return res.status(500).json({ error: 'Failed to load article' });
    }
});

export default router;