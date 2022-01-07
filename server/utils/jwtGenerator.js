const jwt = require("jsonwebtoken");
require('dotenv').config();

function jwtGenerator(user_id) {
    const payload = {
        user: {
            id: user_id
        }
    };
    return jwt.sign(payload, "tejas123", { expiresIn: "1hr" });
}

module.exports = jwtGenerator;