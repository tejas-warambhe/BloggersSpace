const { Router } = require('express');
const pool = require('../db');
const router = Router();
const bycrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const authorisation = require('../middlewares/authorisation');

router.get("/users", (request, response) => {
    pool.query('SELECT * FROM users', (err, res) => {
        if (err) {
            return console.log(err);
        }
        response.json(res.rows);

    });


});

router.post("/register", async(request, response) => {
    console.log(request.body);
    try {

        const { name, email, password } = request.body;

        const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [email]);

        // response.json(user.rows);

        if (user.rows.length !== 0) {
            response.status(401).send("User Already Exists");
        }
        // response.json("Got a new User");

        // bycrpyting (hiding password)
        const saltRound = 10;
        const generateSalt = await bycrypt.genSalt(saltRound);

        const bycryptPassword = await bycrypt.hash(password, generateSalt);

        const newUser = await pool.query("INSERT INTO users(user_name, user_email, user_password) VALUES($1, $2, $3) RETURNING *", [name, email, bycryptPassword]);


        const token = jwtGenerator(newUser.rows[0].user_id);
        console.log(newUser.rows[0]);
        return response.json({ token });

    } catch (err) {
        console.log(err.message);
        response.status(500).send("server error");
    }
});

router.post('/login', async(request, response) => {
    // console.log(request.body, "here");
    try {
        const { email, password } = request.body;

        const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [email]);

        //check if user exists
        if (user.rows.length === 0) {
            return response.status(401).send("Email or Password Incorrect");
        }
        //check if password is same
        const validPassword = await bycrypt.compare(password, user.rows[0].user_password);

        if (!validPassword) {
            return response.status(401).send("Email or Password Incorrect");
        }
        //grant the token

        const token = jwtGenerator(user.rows[0].user_id);
        // console.log(token);

        return response.json({ token });




    } catch (err) {
        response.set(401).send(err.message);
    }
});

router.get("/verify", authorisation, async(request, response) => {
    try {
        response.json(true);
    } catch (err) {
        console.log(err);
        response.set(500).send(err);
    }
});


module.exports = router;