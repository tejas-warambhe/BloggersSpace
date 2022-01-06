const express = require('express');
const app = express();
const cors = require('cors');
const authentication = require('./routes/authentication')
const home = require('./routes/home')
    //middlewares
app.use(express.json());
app.use(cors());

//specifying routes

app.use("/auth", authentication);
app.use("/home", home);





//listening on port
app.listen(5000, () => {

    console.log("Server is running on port 5000");

});