const { Router } = require('express');
const pool = require('../db');
const router = Router();
const authorisation = require('../middlewares/authorisation');

router.get('/posts', authorisation, async(req, res) => {
    try {
        const response = await pool.query('SELECT * FROM articles');

        res.json(response.rows);
    } catch (err) {
        console.log(err.message);
    }
});

router.get('/myposts', authorisation, async(req, res) => {
    try {
        const response = await pool.query('SELECT * FROM articles WHERE user_id=$1', [req.user.id]);
        res.json(response.rows);
    } catch (err) {
        console.log(err.message)
    }
});

router.get('/', authorisation, async(req, res) => {

    try {
        const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [req.user.id]);
        res.json(user.rows[0]);
    } catch {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

router.post('/create', authorisation, async(req, res) => {
    const { article_title, article_content, user_name } = req.body;

    try {
        const response = await pool.query('INSERT INTO articles(user_id, article_title, article_content, user_name) VALUES($1, $2, $3, $4) RETURNING *', [req.user.id, article_title, article_content, user_name]);

        res.json(response.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});

router.put('/edit', authorisation, async(req, res) => {

    const { article_content, article_title, article_id } = req.body;

    try {
        const user = await pool.query('UPDATE articles SET article_title=$1 , article_content=$2 WHERE article_id=$3 AND user_id=$4 RETURNING *', [article_title, article_content, article_id, req.user.id]);
        res.json(user.rows[0]);
    } catch (err) {
        console.log(err.message);

    }
});

router.delete('/removepost', authorisation, async(req, res) => {

    const { article_id } = req.body;

    try {
        const user = await pool.query('DELETE FROM articles WHERE article_id = $1 AND user_id = $2 RETURNING *', [article_id, req.user.id]);

        res.json(user.rows);
    } catch (err) {
        console.log(err.message);
    }
});






module.exports = router;