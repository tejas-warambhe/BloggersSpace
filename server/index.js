require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const authentication = require('./routes/authentication')
const home = require('./routes/home')
const PORT = process.env.PORT || 5000;
//middlewares
app.use(express.json());
app.use(cors());

//specifying routes

app.use("/auth", authentication);
app.use("/home", home);





//listening on port
app.listen(PORT, () => {

    console.log("Server is running on port 5000");

});